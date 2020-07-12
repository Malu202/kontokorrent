import { Reducer } from "../lib/Reducer";
import { KontokorrentsState, KontokorrentState } from "../State";
import { KontokorrentsActions, KontokorrentsActionNames } from "../actions/KontokorrentsActionCreator";

export class KontokorrentsReducer implements Reducer<KontokorrentsState, KontokorrentsActions> {
    onDispatch(action: KontokorrentsActions, updateStore: (a: (s: KontokorrentsState) => KontokorrentsState) => void): void {
        switch (action.type) {
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
                        ...s, hinzufuegen: false,
                        hinzufuegenFailed: { kontokorrentNotFound: action.notFound },
                    };
                })
            }
                break;
            case KontokorrentsActionNames.KontokorrentHinzufuegenSuccess: {
                updateStore(s => {
                    let kontokorrents: { [id: string]: KontokorrentState } = {};
                    for (let k of action.kontokorrents) {
                        let kontokorrent = { ...k };
                        if (s.kontokorrents[k.id]) {
                            kontokorrent = { ...k, ...s.kontokorrents[k.id] }
                        }
                        kontokorrents[k.id] = kontokorrent;
                    }
                    return {
                        ...s,
                        kontokorrents: kontokorrents
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
                break;
        }
    }
}