import { Reducer } from "../lib/Reducer";
import { BeschreibungVorschlagState } from "../State";
import { ActionNames } from "../actions/ActionNames";
import { BeschreibungVorschlagActions } from "../actions/BeschreibungVorschlagActionCreator";

export class BeschreibungVorschlagReducer implements Reducer<BeschreibungVorschlagState, BeschreibungVorschlagActions> {
    onDispatch(action: BeschreibungVorschlagActions, updateStore: (a: (s: BeschreibungVorschlagState) => BeschreibungVorschlagState) => void): void {
        switch (action.type) {
            case ActionNames.BeschreibungsVorschlaege: {
                updateStore(s => {
                    return {
                        ...s,
                        kontokorrentId: action.kontokorrentId,
                        vorschlaege: action.vorschlaege
                    };
                })
            }
                break;
        }
    }
}