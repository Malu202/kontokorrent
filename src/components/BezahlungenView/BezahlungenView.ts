import template from "./BezahlungenView.html";
import "./BezahlungenView.scss";
import "../BezahlungCard/BezahlungCard";
import { Bezahlung, Person } from "../../state/State";
import { addDays, startOfToday, startOfDay, startOfWeek, endOfWeek } from "date-fns";
import { groupBy } from "../../utils/groupBy";
import "./BezahlungenGroup";
import { BezahlungViewModel } from "./BezahlungViewModel";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BezahlungenGroup } from "./BezahlungenGroup";

export class BezahlungenView extends HTMLElement {
    private minEintraege: number;
    private minTage: number;
    private all: boolean;
    private bezahlungen: Bezahlung[] = [];
    private personen: Person[] = [];
    private bezahlungenContainer: HTMLDivElement;
    private showMoreButton: HTMLButtonElement;
    private groupRenderer: ArrayToElementRenderer<[number, BezahlungViewModel[]], BezahlungenGroup, string>;
    private templateApplied = false;
    private scrollToElement: Element;

    constructor() {
        super();
        this.minTage = 3;
        this.minEintraege = 20;
        this.all = false;
    }

    connectedCallback() {
        if (!this.templateApplied) {
            this.templateApplied = true;
            this.innerHTML = template;
            this.bezahlungenContainer = this.querySelector("#bezahlungen-container");
            this.showMoreButton = this.querySelector("#show-more");
            this.showMoreClick = this.showMoreClick.bind(this);
            this.groupRenderer = new ArrayToElementRenderer(this.bezahlungenContainer,
                (s: [number, BezahlungViewModel[]]) => "" + s[0], () => new BezahlungenGroup());
            this.render();
        }
        this.showMoreButton.addEventListener("click", this.showMoreClick);
    }

    disconnectedCallback() {

    }

    private setShowMoreButtonDisplay() {
        if (this.bezahlungen) {
            this.showMoreButton.style.display = this.bezahlungen.length > this.anzahlEintraege ? "inline" : "none";
        }
    }

    private showMoreClick() {
        let cards = this.bezahlungenContainer.lastElementChild.querySelectorAll("bezahlung-card");
        this.scrollToElement = cards[cards.length - 1];
        this.anzahlEintraege += 20;

        this.setShowMoreButtonDisplay();
    }

    private formatEmpfaenger(z: Bezahlung, personen: Person[]) {
        if (z.empfaengerIds.length == personen.length) {
            return "alle";
        }
        return z.empfaengerIds.map(id => personen.find(p => p.id == id).name).join(", ");
    }

    setBezahlungen(bezahlungen: Bezahlung[], personen: Person[]) {
        this.bezahlungen = bezahlungen;
        this.personen = personen;
        this.setShowMoreButtonDisplay();
        this.render();
    }

    private render() {
        if (this.templateApplied) {
            let sorted = this.bezahlungen.sort((a, b) => +b.zeitpunkt - +a.zeitpunkt);

            let filtered = sorted;
            if (!this.all) {
                filtered = sorted.filter(z => z.zeitpunkt > addDays(startOfToday(), -this.minTage));
                if (filtered.length < this.minEintraege) {
                    filtered = sorted.slice(0, this.minEintraege)
                }
            }

            let mapped = filtered.map(z => {
                let x: BezahlungViewModel = {
                    bezahlendePersonName: this.personen.find(p => p.id == z.bezahlendePersonId).name,
                    wert: z.wert,
                    beschreibung: z.beschreibung,
                    empfaenger: this.formatEmpfaenger(z, this.personen),
                    tag: +startOfDay(z.zeitpunkt),
                    id: z.id,
                    woche: +startOfWeek(z.zeitpunkt),
                    status: z.status
                };
                return x;
            });

            let isWeek = false;
            let grouped = Array.of(...groupBy(mapped, "tag").entries());
            let avgGroupSize = grouped.reduce((p, c) => p + c[1].length, 0) / grouped.length;
            if (avgGroupSize < 3) {
                grouped = Array.of(...groupBy(mapped, "woche").entries());
                isWeek = true;
            }
            let sortedGroups = grouped.sort((a, b) => b[0] - a[0]);
            this.groupRenderer.update(sortedGroups,
                (e, d) => {
                    e.setBezahlungen(d[1]);
                    if (isWeek) {
                        e.title = this.formatWeek(new Date(d[0]));
                    }
                    else {

                        e.title = this.formatDay(new Date(d[0]));
                    }
                });
            if (this.scrollToElement) {
                this.scrollToElement.scrollIntoView({ behavior: "smooth" });
                this.scrollToElement = null;
            }
        }
    }

    get anzahlEintraege() {
        return this.minEintraege;
    }

    set anzahlEintraege(val: number) {
        this.minEintraege = val;
        this.render();
    }


    private formatWeek(date: Date) {
        let endWeek = endOfWeek(date);
        let weekformat: string;
        const dayAndMonth = (d: Date) => new Intl.DateTimeFormat(["de-AT"], { day: "numeric", month: "long" }).format(d);
        if (endWeek.getMonth() == date.getMonth()) {
            weekformat = `${new Intl.DateTimeFormat(["de-AT"], { day: "numeric" }).format(date)}. - ${dayAndMonth(endWeek)}`;
        }
        else {
            weekformat = `${dayAndMonth(date)} - ${dayAndMonth(endWeek)}`;
        }
        return weekformat;
    }

    private formatDay(date: Date) {
        return new Intl.DateTimeFormat(["de-AT"], { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
    }
}
export const BezahlungenViewTagName = "bezahlungen-view";
customElements.define(BezahlungenViewTagName, BezahlungenView);
