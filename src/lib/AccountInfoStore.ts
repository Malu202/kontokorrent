import { AccountInfo } from "./AccountInfo";
import { KontokorrentDatabase } from "./KontokorrentDatabase";

export class AccountInfoStore {
    constructor(private db: KontokorrentDatabase) {

    }

    async set(accountInfo: AccountInfo): Promise<void> {
        await this.db.setAccountInfo(accountInfo);
    }
    async get(): Promise<AccountInfo> {
        return await this.db.getAccountInfo();
    }
    async clear(): Promise<void> {
        await this.db.clearAccountInfo();
    }

    async getAccessToken(tokenType: "google" | "anonymous"): Promise<{ timestamp: number, value: string }> {
        return await this.db.getAccessToken(tokenType);
    }

    async updateAccessTokenIfNewer(tokenType: "anonymous" | "google", value: string, lastTimeStamp: number) {
        return await this.db.updateAccessTokenIfNewer(tokenType, value, lastTimeStamp);
    }
}

