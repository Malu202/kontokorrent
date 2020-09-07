import { Reducer } from "../lib/Reducer";
import { KontokorrentsState, KontokorrentState } from "../State";
import { KontokorrentsActions, KontokorrentsActionNames } from "../actions/KontokorrentsActionCreator";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";

export class KontokorrentsReducer implements Reducer<KontokorrentsState, KontokorrentsActions> {
    onDispatch(action: KontokorrentsActions, updateStore: (a: (s: KontokorrentsState) => KontokorrentsState) => void): void {
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
                            ...s.kontokorrents, [action.id]: {
                                id: action.id,
                                name: action.name
                            }
                        }
                    };
                })
            }
            case KontokorrentsActionNames.KontokorrentGeoeffnet: {
                updateStore(s => {
                    return {
                        ...s,
                        activeKontokorrentId: action.id
                    };
                })
            }
                break;
        }
    }

    private extendMap(map: { [id: string]: KontokorrentState }, kk: KontokorrentInfo[]) {
        let kontokorrents: { [id: string]: KontokorrentState } = {};
        for (let k of kk) {
            let kontokorrent = { ...k };
            if (map[k.id]) {
                kontokorrent = { ...k, ...map[k.id] }
            }
            kontokorrents[k.id] = kontokorrent;
        }
        return kontokorrents;
    }
}