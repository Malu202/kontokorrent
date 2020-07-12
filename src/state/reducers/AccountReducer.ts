import { Reducer } from "../lib/Reducer";
import { State, AccountState } from "../State";
import { AccountActions, AccountActionNames } from "../actions/AccountActionCreator";

export class AccountReducer implements Reducer<AccountState, AccountActions> {
    onDispatch(action: AccountActions, updateStore: (a: (s: AccountState) => AccountState) => void): void {
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
                        accountCreated: true
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
            case AccountActionNames.AccountInitialized: {
                updateStore(s => {
                    return {
                        ...s,
                        accountCreated: true
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
        }
    }
}