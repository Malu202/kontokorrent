import { Reducer } from "../lib/Reducer";
import { KontokorrentsState, KontokorrentState, Bezahlung } from "../State";
import { KontokorrentsActions, KontokorrentsActionNames } from "../actions/KontokorrentsActionCreator";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";
import { AccountActionNames, AccountActions } from "../actions/AccountActionCreator";

export class KontokorrentsReducer implements Reducer<KontokorrentsState, KontokorrentsActions | AccountActions> {
    onDispatch(action: KontokorrentsActions | AccountActions, updateStore: (a: (s: KontokorrentsState) => KontokorrentsState) => void): void {
        switch (action.type) {
            case KontokorrentsActionNames.KontokorrentListeLaden: {
                updateStore(s => {
                    return {
                        ...s,
                        listeLaden: true
                    };
                })
            }
                break;
            case KontokorrentsActionNames.KontokorrentListeLadenFailed: {
                updateStore(s => {
                    return {
                        ...s,
                        listeLaden: false
                    };
                })
            }
                break;
            case KontokorrentsActionNames.KontokorrentListe: {
                updateStore(s => {
                    return {
                        ...s,
                        kontokorrents: this.extendMap(s.kontokorrents, action.kontokorrents)
                    };
                })
            }
                break;
            case KontokorrentsActionNames.KontokorrentHinzufuegen: {
                updateStore(s => {
                    return {
                        ...s,
                        hinzufuegen: true
                    };
                })
            }
                break;
            case KontokorrentsActionNames.KontokorrentHinzufuegenFailed: {
                updateStore(s => {
                    return {
                        ...s,
                        hinzufuegen: false,
                        hinzufuegenFailed: { kontokorrentNotFound: action.notFound },
                    };
                })
            }
                break;
            case KontokorrentsActionNames.KontokorrentHinzufuegenSuccess: {
                updateStore(s => {

                    return {
                        ...s,
                        hinzufuegen: false,
                        kontokorrents: this.extendMap(s.kontokorrents, action.kontokorrents)
                    };
                })
            }
            case KontokorrentsActionNames.KontokorrentCreating: {
                updateStore(s => {
                    return {
                        ...s,
                        creating: true,
                        creationFailed: null
                    };
                })
            }
                break;
            case KontokorrentsActionNames.KontokorrentCreationFailed: {
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
            case KontokorrentsActionNames.KontokorrentCreated: {
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
            case KontokorrentsActionNames.KontokorrentGeoeffnet: {
                updateStore(s => {
                    return {
                        ...s,
                        activeKontokorrentId: action.id
                    };
                });
                break;
            }
            case KontokorrentsActionNames.KontokorrentBezahlungen: {
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
            case KontokorrentsActionNames.KontokorrentSynchronisieren: {
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
            case KontokorrentsActionNames.KontokorrentSynchronisiert: {
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
            case KontokorrentsActionNames.KontokorrentBalanceAktualisiert: {
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
            case KontokorrentsActionNames.LoginPageGeoeffnet: {
                updateStore(s => {
                    return {
                        ...s,
                        hinzufuegen: false,
                        hinzufuegenFailed: null
                    };
                });
                break;
            }
            case AccountActionNames.LoggedOut: {
                updateStore(s => {
                    return {
                        ...s,
                        activeKontokorrentId: null,
                        kontokorrents: {}
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