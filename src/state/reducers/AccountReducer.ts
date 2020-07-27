import { Reducer } from "../lib/Reducer";
import { State, AccountState } from "../State";
import { AccountActions, AccountActionNames } from "../actions/AccountActionCreator";
import { KontokorrentsActions, KontokorrentsActionNames } from "../actions/KontokorrentsActionCreator";

export class AccountReducer implements Reducer<AccountState, AccountActions | KontokorrentsActions> {
    onDispatch(action: AccountActions | KontokorrentsActions, updateStore: (a: (s: AccountState) => AccountState) => void): void {
        switch (action.type) {
            case AccountActionNames.AccountCreating: {
                updateStore(s => {
                    return {
                        ...s,
                        accountCreating: true,
                        accountCreationFailed: false
                    };
                })
            }
                break;
            case AccountActionNames.AccountCreated: {
                updateStore(s => {
                    return {
                        ...s, accountCreating: false,
                        accountCreated: true,
                        accountInfo: action.info
                    };
                })
            }
                break;
            case AccountActionNames.AccountCreationFailed: {
                updateStore(s => {
                    return {
                        ...s, accountCreationFailed: true,
                        accountCreating: false,
                        accountCreated: false
                    };
                })
            }
                break;
            case AccountActionNames.AccountInitialized: {
                updateStore(s => {
                    return {
                        ...s,
                        accountCreated: true,
                        accountInfo: action.info
                    };
                })
            }
                break;
            case AccountActionNames.LoggedOut: {
                updateStore(s => {
                    return {
                        ...s,
                        accountCreated: false
                    };
                })
            }
                break;
            case AccountActionNames.LoginExpired:
                {
                    updateStore(s => {
                        return {
                            ...s,
                            loginExpired: true
                        };
                    })
                }
                break;
            case KontokorrentsActionNames.KontokorrentListeLadenFailed: {
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