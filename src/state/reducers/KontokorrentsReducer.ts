import { Reducer } from "../lib/Reducer";
import { KontokorrentsState, KontokorrentState, Bezahlung } from "../State";
import { KontokorrentsActions } from "../actions/KontokorrentsActionCreator";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";
import {  AccountActions } from "../actions/AccountActionCreator";
import {  BezahlungActions } from "../actions/BezahlungActionCreator";
import { ActionNames } from "../actions/ActionNames";

type Actions = KontokorrentsActions | AccountActions | BezahlungActions;

export class KontokorrentsReducer implements Reducer<KontokorrentsState, KontokorrentsActions | AccountActions> {
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
                                bezahlungen: []
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
                updateStore(s => {
                    return {
                        ...s,
                        kontokorrents: {
                            ...s.kontokorrents, [action.kontokorrentId]: {
                                ...s.kontokorrents[action.kontokorrentId],
                                personen: s.kontokorrents[action.kontokorrentId].personen.map(p => {
                                    return {
                                        ...p,
                                        balance: action.balance[p.id]
                                    };
                                })
                            }
                        }
                    };
                });
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
            case ActionNames.BezahlungKontokorrentGeandert: {
                updateStore(s => {
                    return {
                        ...s,
                        activeKontokorrentId: action.kontokorrentId
                    };
                });
                break;
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