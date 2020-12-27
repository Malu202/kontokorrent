import { AccountInfo } from "./AccountInfo";

export class AccountInfoStore {
    async set(accountInfo: AccountInfo): Promise<void> {
        localStorage.setItem("account_info", JSON.stringify(accountInfo));
    }
    async get(): Promise<AccountInfo> {
        let info = localStorage.getItem("account_info");
        if (null == info)
            return null;
        return <AccountInfo>JSON.parse(info);
    }
    async clear(): Promise<void> {
        localStorage.removeItem("account_info");
        localStorage.removeItem("access_token_anonymous");
        localStorage.removeItem("access_token_google");
    }
}

