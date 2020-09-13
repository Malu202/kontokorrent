import { AccountInfo } from "./AccountInfo";

export class AccountInfoStore {
    set(accountInfo: AccountInfo) {
        localStorage.setItem("account_info", JSON.stringify(accountInfo));
    }
    get() {
        let info = localStorage.getItem("account_info");
        if (null == info)
            return null;
        return <AccountInfo>JSON.parse(info);
    }
    clear() {
        localStorage.removeItem("account_info");
        localStorage.removeItem("access_token_anonymous");
        localStorage.removeItem("access_token_google");
    }
}

