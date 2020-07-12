import { Store } from "../Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { AccountInfoStore } from "../../lib/AccountInfoStore";
import { v4 as uuid } from "uuid";
import { AccountType } from "../../lib/AccountType";
import { RoutingActionCreator } from "./RoutingActionCreator";

export enum AccountActionNames {
    AccountCreating = "AccountCreating",
    AccountCreationFailed = "AccountCreationFailed",
    AccountCreated = "AccountCreated",
    AccountInitialized = "AccountInitialized",
    LoggedOut = "LoggedOut"
}

export class AccountCreating implements Action {
    readonly type = AccountActionNames.AccountCreating;
    constructor() {

    }
}

export class AccountCreationFailed implements Action {
    readonly type = AccountActionNames.AccountCreationFailed;
    constructor() {

    }
}

export class AccountCreated implements Action {
    readonly type = AccountActionNames.AccountCreated;
    constructor() {

    }
}

export class AccountInitialized implements Action {
    readonly type = AccountActionNames.AccountInitialized;
    constructor() {

    }
}

export class LoggedOut implements Action {
    readonly type = AccountActionNames.LoggedOut;
    constructor() {

    }
}

export type AccountActions = AccountInitialized
    | AccountCreating
    | AccountCreated
    | AccountCreationFailed
    | LoggedOut;

export class AccountActionCreator {
    constructor(private store: Store,
        private apiClient: ApiClient,
        private accountInfoStore: AccountInfoStore,
        private routingActionCreator: RoutingActionCreator) {

    }

    async initializeAccount() {
        if (!this.accountInfoStore.get()) {
            return false;
        }
        this.store.dispatch(new AccountInitialized());
        return true;
    }

    async ensureAccount() {
        if (!this.store.state.account.accountCreated) {
            let accountInfo = {
                id: uuid(),
                secret: uuid(),
                type: AccountType.anonym
            };
            this.store.dispatch(new AccountCreating());
            let res = await this.apiClient.neuerBenutzer(accountInfo.id, accountInfo.secret);
            if (!res.success) {
                this.store.dispatch(new AccountCreationFailed());
            }
            else {
                this.store.dispatch(new AccountCreated());
                this.accountInfoStore.set(accountInfo);
            }
            return res.success;
        }
        return true;
    }

    async logout() {
        this.accountInfoStore.clear();
        this.store.dispatch(new LoggedOut());
        this.routingActionCreator.navigateLogin();
    }
}
