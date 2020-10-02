import { Reducer } from "../lib/Reducer";
import { State, AccountState } from "../State";
import { AccountActions } from "../actions/AccountActionCreator";
import { KontokorrentListenActions } from "../actions/KontokorrentListenActionCreator";
import { ActionNames } from "../actions/ActionNames";

export class AccountReducer implements Reducer<AccountState, AccountActions | KontokorrentListenActions> {
    onDispatch(action: AccountActions | KontokorrentListenActions, updateStore: (a: (s: AccountState) => AccountState) => void): void {
        switch (action.type) {
            case ActionNames.AccountCreating: {
                updateStore(s => {
                    return {
                        ...s,
                        accountCreating: true,
                        accountCreationFailed: false
                    };
                })
            }
                break;
            case ActionNames.AccountCreated: {
                updateStore(s => {
                    return {
                        ...s, accountCreating: false,
                        accountCreated: true,
                        accountInfo: action.info
                    };
                })
            }
                break;
            case ActionNames.AccountCreationFailed: {
                updateStore(s => {
                    return {
                        ...s, accountCreationFailed: true,
                        accountCreating: false,
                        accountCreated: false
                    };
                })
            }
                break;
            case ActionNames.AccountInitialized: {
                updateStore(s => {
                    return {
                        ...s,
                        accountCreated: true,
                        accountInfo: action.info
                    };
                })
            }
                break;
            case ActionNames.LoggedOut: {
                updateStore(s => {
                    return {
                        ...s,
                        accountCreated: false
                    };
                })
            }
                break;
            case ActionNames.LoginExpired:
                {
                    updateStore(s => {
                        return {
                            ...s,
                            loginExpired: true
                        };
                    })
                }
                break;
            case ActionNames.KontokorrentListeLadenFailed: {
                if (action.interactionRequired) {
                    updateStore(s => {
                        return {
                            ...s,
                            loginExpired: true
                        };
                    })
                }
            }
                break;
        }
    }
}