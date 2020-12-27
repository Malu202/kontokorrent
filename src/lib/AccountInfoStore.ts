import { AccountInfo } from "./AccountInfo";
import { KontokorrentDatabase } from "./KontokorrentDatabase";

export class AccountInfoStore {
    constructor(private db: KontokorrentDatabase) {

    }

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

    async getAccessToken(tokenType: "google" | "anonymous"): Promise<{ timestamp: number, value: string }> {
        return await this.db.getAccessToken(tokenType);
    }

    async updateAccessTokenIfNewer(tokenType: "anonymous" | "google", value: string, lastTimeStamp: number) {
        return await this.db.updateAccessTokenIfNewer(tokenType, value, lastTimeStamp);
    }
}

