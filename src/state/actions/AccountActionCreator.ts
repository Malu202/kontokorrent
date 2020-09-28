import { Store } from "../Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { AccountInfoStore } from "../../lib/AccountInfoStore";
import { v4 as uuid } from "uuid";
import { AccountType } from "../../lib/AccountType";
import { RoutingActionCreator } from "./RoutingActionCreator";
import { TokenRenewFailedException } from "../../api/TokenRenewFailedException";
import { InteractionRequiredException } from "../../api/InteractionRequiredException";
import { AccountInfo } from "../../lib/AccountInfo";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { ServiceLocator } from "../../ServiceLocator";

export enum AccountActionNames {
    AccountCreating = "AccountCreating",
    AccountCreationFailed = "AccountCreationFailed",
    AccountCreated = "AccountCreated",
    AccountInitialized = "AccountInitialized",
    LoggedOut = "LoggedOut",
    LoginExpired = "LoginExpired"
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
    constructor(public info: AccountInfo) {

    }
}

export class AccountInitialized implements Action {
    readonly type = AccountActionNames.AccountInitialized;
    constructor(public info: AccountInfo) {

    }
}

export class LoggedOut implements Action {
    readonly type = AccountActionNames.LoggedOut;
    constructor() {

    }
}

export class LoginExpired implements Action {
    readonly type = AccountActionNames.LoginExpired;
    constructor() {

    }
}

export type AccountActions = AccountInitialized
    | AccountCreating
    | AccountCreated
    | AccountCreationFailed
    | LoggedOut
    | LoginExpired;

export class AccountActionCreator {

    constructor(private store: Store,
        private apiClient: ApiClient,
        private accountInfoStore: AccountInfoStore,
        private routingActionCreator: RoutingActionCreator,
        private db: KontokorrentDatabase) {
    }

    static locate(serviceLocator : ServiceLocator) : AccountActionCreator {
        return new AccountActionCreator(serviceLocator.store,
            serviceLocator.apiClient,
            serviceLocator.accountInfoStore,
            RoutingActionCreator.locate(serviceLocator),
            serviceLocator.db
        );
    }

    initializeAccount() {
        let info = this.accountInfoStore.get();
        if (!this.accountInfoStore.get()) {
            return false;
        }
        this.store.dispatch(new AccountInitialized(info));
        this.getUserInfo();
        return true;
    }

    async getUserInfo() {
        try {
            let userInfo = await this.apiClient.getUserInfo();
        }
        catch (e) {
            if (e instanceof TokenRenewFailedException) {
                let accountInfo = this.accountInfoStore.get();
                if (!e.networkError && accountInfo.type == AccountType.anonym) {
                    // anonymer token renew failed - wir haben ein ernstes problem
                    // reset and duck out
                    this.accountInfoStore.clear();
                    window.location.reload();
                }
            }
            else if (e instanceof InteractionRequiredException) {
                this.store.dispatch(new LoginExpired());
            }
        }
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
                this.store.dispatch(new AccountCreated(accountInfo));
                this.accountInfoStore.set(accountInfo);
            }
            return res.success;
        }
        return true;
    }

    async logout() {
        this.accountInfoStore.clear();
        await this.db.clear();
        this.store.dispatch(new LoggedOut());
        this.routingActionCreator.navigateLogin();
    }
}
