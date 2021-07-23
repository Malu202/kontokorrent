import { Reducer } from "../lib/Reducer";
import { KontokorrentsState, KontokorrentState, Bezahlung, Person, BezahlungAnlegenStatus, BezahlungStatus } from "../State";
import { KontokorrentListenActions } from "../actions/KontokorrentListenActionCreator";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";
import { AccountActions } from "../actions/AccountActionCreator";
import { BezahlungActions } from "../actions/BezahlungActionCreator";
import { ActionNames } from "../actions/ActionNames";
import { KontokorrentHinzufuegenActions } from "../actions/KontokorrentHinzufuegenActionCreator";
import { KontokorrentActions, KontokorrentBalanceAktualisiert } from "../actions/KontokorrentActionCreator";
import { ServiceWorkerActions } from "../actions/ServiceWorkerActions";

type Actions = KontokorrentListenActions
    | AccountActions
    | BezahlungActions
    | KontokorrentHinzufuegenActions
    | KontokorrentActions
    | ServiceWorkerActions;
type PersonOptional = Partial<Omit<Person, "id">> & { id: string };
type BezhalungOptional = Partial<Omit<Bezahlung, "id">> & { id: string };

export class KontokorrentsReducer implements Reducer<KontokorrentsState, Actions> {
    onDispatch(action: Actions, updateStore: (a: (s: KontokorrentsState) => KontokorrentsState) => void): void {
        switch (action.type) {
            case ActionNames.KontokorrentListeLaden: {
                updateStore(s => {
                    return {
                        ...s,
                        listeLaden: true
                    };
                })
            }
                break;
            case ActionNames.KontokorrentListeLadenFailed: {
                updateStore(s => {
                    return {
                        ...s,
                        listeLaden: false
                    };
                })
            }
                break;
            case ActionNames.KontokorrentListe: {
                updateStore(s => {
                    return {
                        ...s,
                        kontokorrents: this.extendMap(s.kontokorrents, action.kontokorrents)
                    };
                })
            }
                break;
            case ActionNames.KontokorrentHinzufuegen: {
                updateStore(s => {
                    return {
                        ...s,
                        hinzufuegen: true
                    };
                })
            }
                break;
            case ActionNames.KontokorrentHinzufuegenFailed: {
                updateStore(s => {
                    return {
                        ...s,
                        hinzufuegen: false,
                        hinzufuegenFailed: { kontokorrentNotFound: action.notFound },
                    };
                })
            }
                break;
            case ActionNames.KontokorrentHinzufuegenSuccess: {
                updateStore(s => {

                    return {
                        ...s,
                        hinzufuegen: false,
                        kontokorrents: this.extendMap(s.kontokorrents, action.kontokorrents)
                    };
                })
            }
            case ActionNames.KontokorrentCreating: {
                updateStore(s => {
                    return {
                        ...s,
                        creating: true,
                        creationFailed: null
                    };
                })
            }
                break;
            case ActionNames.KontokorrentCreationFailed: {
                updateStore(s => {
                    return {
                        ...s,
                        creating: false,
                        creationFailed: {
                            exists: action.exists
                        }
                    };
                })
            }
                break;
            case ActionNames.KontokorrentCreated: {
                updateStore(s => {
                    return {
                        ...s,
                        creating: false,
                        kontokorrents: {
                            ...s.kontokorrents, [action.kontokorrent.id]: {
                                id: action.kontokorrent.id,
                                name: action.kontokorrent.name,
                                synchronisieren: false,
                                personen: action.kontokorrent.personen.map(p => {
                                    return {
                                        balance: 0,
                                        ...p
                                    }
                                }),
                                bezahlungen: [],
                                bezahlungAnlegen: null,
                                angezeigteBezahlung: {}
                            }
                        }
                    };
                });
                break;
            }
            case ActionNames.KontokorrentGeoeffnet: {
                updateStore(s => {
                    return {
                        ...s,
                        activeKontokorrentId: action.id
                    };
                });
                break;
            }
            case ActionNames.KontokorrentBezahlungen: {
                updateStore(s => {
                    return {
                        ...s,
                        kontokorrents: {
                            ...s.kontokorrents, [action.kontokorrentId]: {
                                ...s.kontokorrents[action.kontokorrentId],
                                bezahlungen: action.bezahlungen
                            }
                        }
                    };
                });
                break;
            }
            case ActionNames.KontokorrentSynchronisieren: {
                updateStore(s => {
                    return {
                        ...s,
                        kontokorrents: {
                            ...s.kontokorrents, [action.kontokorrentId]: {
                                ...s.kontokorrents[action.kontokorrentId],
                                synchronisieren: true
                            }
                        }
                    };
                });
                break;
            }
            case ActionNames.KontokorrentSynchronisiert: {
                updateStore(s => {
                    return {
                        ...s,
                        kontokorrents: {
                            ...s.kontokorrents, [action.kontokorrentId]: {
                                ...s.kontokorrents[action.kontokorrentId],
                                synchronisieren: false
                            }
                        }
                    };
                });
                break;
            }
            case ActionNames.KontokorrentBalanceAktualisiert: {
                updateStore(s => this.extendPersonenInfo(s, action.kontokorrentId, Object.entries(action.balance).map(e => {
                    return { id: e[0], balance: e[1] };
                })));
                break;
            }
            case ActionNames.LoginPageGeoeffnet: {
                updateStore(s => {
                    return {
                        ...s,
                        hinzufuegen: false,
                        hinzufuegenFailed: null
                    };
                });
                break;
            }
            case ActionNames.LoggedOut: {
                updateStore(s => {
                    return {
                        ...s,
                        activeKontokorrentId: null,
                        kontokorrents: {}
                    };
                });
                break;
            }
            case ActionNames.BezahlungEintragenKontokorrentGeandert: {
                updateStore(s => this.updateKontokorrentStatus({
                    ...s,
                    activeKontokorrentId: action.kontokorrentId
                }, action.kontokorrentId, { bezahlungAnlegen: null }));
                break;
            }
            case ActionNames.BezahlungGeoeffnet: {
                updateStore(s => {
                    s = {
                        ...s,
                        activeKontokorrentId: action.kontokorrentId,
                    };
                    s = this.updateKontokorrentStatusFn(s, action.kontokorrentId, ks => {
                        return {
                            ...ks,
                            angezeigteBezahlung: {
                                ...ks.angezeigteBezahlung,
                                [action.bezahlungId]: {
                                    bearbeitungsStatus: action.bearbeitungsStatus
                                }
                            }
                        }
                    })
                    if (action.bezahlung) {
                        s = this.upsertBezahlung(s, action.kontokorrentId, action.bezahlung);
                    }
                    return s;
                });
                break;
            }
            case ActionNames.NeueBezahlungAnlegen: {
                updateStore(s => this.updateKontokorrentStatus(s, action.kontokorrentId, { bezahlungAnlegen: BezahlungAnlegenStatus.Anlegen }));
                break;
            }
            case ActionNames.NeueBezahlungAnlegenFailed: {
                updateStore(s => this.updateKontokorrentStatus(s, action.kontokorrentId, { bezahlungAnlegen: BezahlungAnlegenStatus.Failed }));
                break;
            }
            case ActionNames.NeueBezahlungAngelegt: {
                updateStore(s => {
                    s = this.updateKontokorrentStatus(s, action.kontokorrentId, { bezahlungAnlegen: BezahlungAnlegenStatus.Angelegt });
                    return this.upsertBezahlung(s, action.kontokorrentId, action.bezahlung);
                });
                break;
            }
            case ActionNames.ServiceWorkerBezahlungAnlegen: {
                updateStore(s => this.upsertBezahlung(s, action.kontokorrentId, { status: BezahlungStatus.Speichern, id: action.bezahlungId }));
                break;
            }
            case ActionNames.ServiceWorkerBezahlungAngelegt: {
                updateStore(s => this.upsertBezahlung(s, action.kontokorrentId, { status: BezahlungStatus.Gespeichert, id: action.bezahlungId }));
                break;
            }
        }
    }

    private updateKontokorrentStatus(s: KontokorrentsState, kontokorrentId: string, state: Partial<KontokorrentState>) {
        return this.updateKontokorrentStatusFn(s, kontokorrentId, ks => { return { ...ks, ...state } });
    }

    private updateKontokorrentStatusFn(s: KontokorrentsState, kontokorrentId: string, update: (ks: KontokorrentState) => KontokorrentState) {
        return {
            ...s,
            kontokorrents: {
                ...s.kontokorrents, [kontokorrentId]: update(s.kontokorrents[kontokorrentId])
            }
        };
    }

    private upsertBezahlung(s: KontokorrentsState, kontokorrentId: string, b: BezhalungOptional):
        KontokorrentsState {
        let bezahlungen = s.kontokorrents[kontokorrentId]?.bezahlungen || [];
        let existing = bezahlungen.find(d => b.id == d.id);
        if (existing) {
            bezahlungen.splice(bezahlungen.indexOf(existing), 1);
        }
        bezahlungen.push({ ...existing, ...b });
        return {
            ...s,
            kontokorrents: {
                ...s.kontokorrents, [kontokorrentId]: {
                    ...s.kontokorrents[kontokorrentId],
                    bezahlungen: bezahlungen
                }
            }
        }
    }

    private extendPersonenInfo(s: KontokorrentsState, kontokorrentId: string, personenInfo: PersonOptional[]):
        KontokorrentsState {
        let personenMap = new Map((s.kontokorrents[kontokorrentId]?.personen || []).map(p => [p.id, p]));
        for (let info of personenInfo) {
            personenMap.set(info.id, { ...personenMap.get(info.id), ...info });
        }
        return {
            ...s,
            kontokorrents: {
                ...s.kontokorrents, [kontokorrentId]: {
                    ...s.kontokorrents[kontokorrentId],
                    personen: Array.from(personenMap.values())
                }
            }
        }
    }

    private extendMap(map: { [id: string]: KontokorrentState }, kk: KontokorrentInfo[]) {
        let kontokorrents: { [id: string]: KontokorrentState } = {};
        for (let k of kk) {
            let kontokorrent = {
                ...k,
                synchronisieren: false,
                bezahlungen: <Bezahlung[]>[],
                ...map[k.id],
                personen: k.personen.map(v => {
                    let p = map[k.id]?.personen?.find(p => p.id == v.id);
                    return {
                        ...v,
                        balance: 0,
                        ...p
                    }
                })
            };
            kontokorrents[k.id] = kontokorrent;
        }
        return kontokorrents;
    }
}