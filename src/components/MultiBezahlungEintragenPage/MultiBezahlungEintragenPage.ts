import template from "./MultiBezahlungEintragenPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "./MultiBezahlungEintragenPage.scss";
import { BezahlungActionCreator, bezahlungActionCreatorFactory } from "../../state/actions/BezahlungActionCreator";
import { Person, State } from "../../state/State";
import "../BezahlungEintragenForm/BezahlungEintragenForm";
import { parse } from "date-fns";
import { de } from "date-fns/locale";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { convertLinks } from "../convertLinks";
import { MultiBezahlungZeile } from "../MultiBezahlungZeile/MultiBezahlungZeile";
import { BezahlendePersonRadioButton } from "../BezahlendePersonRadioButton/BezahlendePersonRadioButton";

const schema: {
    name: string,
    seperator: RegExp,
    mappings: ({ typ: "betreff", column: number, parse: (s: string) => string }
        | { typ: "datum", column: number, parse: (s: string) => Date }
        | { typ: "betrag", column: number, parse: (s: string) => number })[]
}[] = [{
    name: "BAWAG",
    seperator: /\t/g,
    mappings: [
        {
            typ: "betreff", column: 1, parse: (s: string) => {
                return s.replace(/\d{2,}/g, "").replace(/\s+/g, " ");
            }
        },
        { typ: "datum", column: 2, parse: (s: string) => parse(s, "P", new Date(), { locale: de }) },
        { typ: "betrag", column: 4, parse: (s: string) => -parseFloat(s.replace(".", "").replace(",", ".").replace(/ /g, "")) }
    ]
}];

export class MultiBezahlungEintragenPage extends HTMLElement {
    private store: Store;
    private kontokorrentsSubscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private appBar: AppBar;
    private bezahlungActionCreator: BezahlungActionCreator;
    private kontokorrentId: string;
    private onPasteHandler: (ev: ClipboardEvent) => void;
    private bezahlungenTable: HTMLTableElement;
    private bezahlungen: { id: number, betreff?: string; betrag?: number; datum?: Date; done: boolean; error: boolean; }[];
    private bezahlungenRenderer: ArrayToElementRenderer<{ id: number, betreff?: string; betrag?: number; datum?: Date; done: boolean; error: boolean; }, MultiBezahlungZeile, number>;
    zahlendePersonRenderer: ArrayToElementRenderer<any, any, string>;
    private saveHandler: () => void;
    private saveBtn: HTMLButtonElement;
    private form: HTMLFormElement;
    private personen: Person[];
    private rendered = false;
    private serviceLocator: ServiceLocator;

    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.bezahlungActionCreator = bezahlungActionCreatorFactory(serviceLocator);
        this.serviceLocator = serviceLocator;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.appBar = this.querySelector(AppBarTagName);
            this.appBar.addServices(this.serviceLocator);
        }
        this.bezahlungenTable = this.querySelector("#bezahlungen-table");
        this.bezahlungenRenderer = new ArrayToElementRenderer(this.bezahlungenTable,
            b => b.id,
            b => {
                let e = new MultiBezahlungZeile();
                e.addEventListener("removebezahlung", () => {
                    this.bezahlungen.splice(this.bezahlungen.indexOf(b), 1);
                    this.renderBezahlungen();
                });
                e.addEventListener("change", () => {
                    b.betreff = e.getData().betreff;
                });
                return e;
            });
        this.zahlendePersonRenderer = new ArrayToElementRenderer<Person, BezahlendePersonRadioButton, string>(
            this.querySelector("#zahlende-person-auswahl"),
            p => p.id,
            p => new BezahlendePersonRadioButton());
        this.kontokorrentsSubscription = this.store.subscribe("kontokorrents", s => this.applyStoreState(s));
        this.appBar.addEventListener("gotokontokorrent", (e: CustomEvent) => {
            this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail);
        });
        this.bezahlungActionCreator.bezahlungEintragenGeoeffnet();
        this.applyStoreState(this.store.state);
        this.onPasteHandler = (ev: ClipboardEvent) => this.onPaste(ev);
        this.saveHandler = () => this.save();
        this.saveBtn = this.querySelector("#save");
        this.form = this.querySelector("#multi-bezahlung-form");
        this.saveBtn.addEventListener("click", this.saveHandler);
        document.addEventListener("paste", this.onPasteHandler);
        convertLinks([this.querySelector("#zurueck-zum-kontokorrent")], this.routingActionCreator);
    }
    private async save() {
        for (let b of this.bezahlungen) {
            try {
                await this.bezahlungActionCreator.bezahlungDirektHinzufuegen(this.kontokorrentId, {
                    betrag: b.betrag,
                    betreff: b.betreff,
                    bezahlendePerson: this.form["bezahlende-person"].value,
                    datum: b.datum,
                    empfaenger: this.personen.map(p => p.id)
                });
                b.done = true;
            } catch (error) {
                b.error = true;
                console.error(error);
            }
            this.renderBezahlungen();
        }
    }

    private onPaste(ev: ClipboardEvent) {
        let text = ev.clipboardData.getData("text/plain");
        if (text) {
            let lines = text.split(/\r\n|\n|\r/g);
            var mappedBySchema = schema.map(s => {
                let id = 0;
                return lines.map(l => {
                    let columns = l.split(s.seperator);
                    if (columns.length < s.mappings.map(s => s.column).sort((a, b) => b - a)[0]) {
                        return null;
                    }
                    let res: any = {};
                    for (let m of s.mappings) {
                        let val = m.parse(columns[m.column]);
                        switch (typeof val) {
                            case "number":
                                if (isNaN(val)) {
                                    return null;
                                }
                                break;
                            case "object":
                                if (isNaN(val.getTime())) {
                                    return null;
                                }
                                break;
                            default: break;
                        }
                        res[m.typ] = val;
                    }
                    let ret: { id: number, betreff?: string; betrag?: number; datum?: Date; done: boolean, error: boolean } = { ...res, id: ++id, done: false, error: false };
                    return ret;
                }).filter(v => null != v);
            }).filter(v => v.length > 0);
            if (mappedBySchema.length > 0) {
                this.bezahlungen = mappedBySchema.sort((a, b) => b.length - a.length)[0];
                this.renderBezahlungen();
            }
        }
    }

    private renderBezahlungen() {
        this.bezahlungenRenderer.update(this.bezahlungen, (e, b) => {
            e.setData(b);
        });
    }

    private applyStoreState(s: State) {
        if (s.kontokorrents.activeKontokorrentId) {

        }
        this.kontokorrentId = s.kontokorrents.activeKontokorrentId;
        this.personen = this.kontokorrentId ? s.kontokorrents.kontokorrents[this.kontokorrentId]?.personen : [];
        if (this.personen) {
            this.zahlendePersonRenderer.update(this.personen, (element, person) => {
                element.person = person;
                element.radioName = "bezahlende-person";
            });
        }
    }

    disconnectedCallback() {
        this.kontokorrentsSubscription();
        document.removeEventListener("paste", this.onPasteHandler);
        this.saveBtn.removeEventListener("click", this.saveHandler);
    }
}

customElements.define('multi-bezahlung-eintragen-page', MultiBezahlungEintragenPage);
