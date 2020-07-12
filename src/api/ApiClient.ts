import { postJson } from "./postJson";
import { AccountType } from "../lib/AccountType";
import { OAuth2PopupFlow } from 'oauth2-popup-flow';
import { AccountInfoStore } from "../lib/AccountInfoStore";
import { KontokorrentListenEintrag } from "./KontokorrentListenEintrag";
import { NeuerKontokorrentRequest } from "./NeuerKontokorrentRequest";

const baseUrl = "http://localhost:54538";

export class ApiClient {

    constructor(private accountInfoStore: AccountInfoStore) {

    }

    async neuerBenutzer(id: string, secret: string) {
        try {
            let res = await postJson(`${baseUrl}/api/v2/accounts`, { id, secret });
            if (!res.ok) {
                return { success: false };
            }
            return { success: true };
        }
        catch {
            return { success: false };
        }
    }

    async getUserInfo() {
        let res = await fetch(`${baseUrl}/api/v2/userinfo`);
        if (!res.ok) {
            return null;
        }
        return await res.json();
    }

    private async getAuthHeader() {
        return { "Authorization": `Bearer ${await this.getAccessToken()}` };
    }

    async kontokorrentHinzufuegen(oeffentlicherName: string, einladungsCode: string) {
        let params = "";
        if (oeffentlicherName) {
            params = `oeffentlicherName=${encodeURIComponent(oeffentlicherName)}`;
        }
        else {
            params = `einladungsCode=${encodeURIComponent(einladungsCode)}`;
        }
        let headers = await this.getAuthHeader();
        let res = await fetch(`${baseUrl}/api/v2/kontokorrents?${params}`, { method: "PUT", headers: headers });
        if (res.status == 404) {
            return null;
        }
        return <KontokorrentListenEintrag[]>await res.json();
    }


    async neuerKontokorrent(request: NeuerKontokorrentRequest) {
        let res = await postJson(`${baseUrl}/api/v2/kontokorrents`, request, await this.getAccessToken());
        if (res.status == 422) {
            return { success: false, exists: true };
        }
        else if (res.ok) {
            return { success: true };
        }
        return { success: false };
    }

    private async getAccessToken() {
        let info = this.accountInfoStore.get();
        if (null == info) {
            throw new Error("Keine Account Information gespeichert.");
        }
        if (info.type == AccountType.anonym) {
            let tokenInfo = localStorage.getItem("access_token_anonymous");
            if (null != tokenInfo) {
                let { token, expires } = JSON.parse(tokenInfo);
                if (token && expires && expires >= +new Date()) {
                    return token;
                }
            }
            let res = await postJson(`${baseUrl}/api/v2/token`, { id: info.id, secret: info.secret });
            if (!res.ok) {
                throw new Error("Anonymer Account: Token-Request failed");
            }
            let tokenResponse = await res.json();
            localStorage.setItem("access_token_anonymous", JSON.stringify(tokenResponse));
            return tokenResponse.token;
        }
        else if (info.type == AccountType.google) {
            let flow = new OAuth2PopupFlow({
                authorizationUri: "https://accounts.google.com/o/oauth2/v2/auth/.well-known/openid-configuration",
                clientId: "82890837151-n0e81vsn3ns2qn1ksh7bdohmnlau468k.apps.googleusercontent.com",
                redirectUri: "http://localhost:4200",
                scope: "openid",
                responseType: "id_token",
                additionalAuthorizationParameters: { "login_hint": info.id },
                accessTokenStorageKey: "access_token_google"
            });
            return await flow.token();
        }
        else {
            throw new Error(`Account Typ ${info.type} unbekannt`);
        }
    }
}