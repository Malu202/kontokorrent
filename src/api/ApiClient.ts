import { postJson } from "./postJson";
import { AccountType } from "../lib/AccountType";
import { AccountInfoStore } from "../lib/AccountInfoStore";
import { KontokorrentInfo } from "./KontokorrentInfo";
import { NeuerKontokorrentRequest } from "./NeuerKontokorrentRequest";
import { TokenRenewFailedException } from "./TokenRenewFailedException";
import { InteractionRequiredException } from "./InteractionRequiredException";
import { ApiException } from "./ApiException";
import { Aktion } from "./Aktion";
import { environment } from "../environment";

const baseUrl = environment.API_URL;

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
        let res = await fetch(`${baseUrl}/api/v2/userinfo`, { headers: await this.getAuthHeader() });
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
        return <KontokorrentInfo[]>await res.json();
    }

    async kontokorrentsAuflisten() {
        let res = await fetch(`${baseUrl}/api/v2/kontokorrents`, { headers: await this.getAuthHeader() });
        if (!res.ok) {
            throw new ApiException();
        }
        return <KontokorrentInfo[]>await res.json();
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

    async getAktionen(kontokorrentId: string, ab?: number) {
        let query = ab ? `?ab=${ab}` : "";
        let res = await fetch(`${baseUrl}/api/v2/kontokorrents/${kontokorrentId}/aktionen${query}`, { headers: await this.getAuthHeader() });
        if (res.status == 404) {
            return {
                success: false,
                notfound: true
            };
        }
        else if (res.ok) {
            let aktionen: Aktion[] = await res.json();
            for (let a of aktionen) {
                if (a.bezahlung) {
                    a.bezahlung.zeitpunkt = new Date(a.bezahlung.zeitpunkt);
                }
            }
            return {
                success: true,
                aktionen
            }
        }
    }

    private async getAccessToken() {
        let info = await this.accountInfoStore.get();
        if (null == info) {
            throw new Error("Keine Account Information gespeichert.");
        }
        let tokenInfo = localStorage.getItem("access_token_anonymous");
        if (null != tokenInfo) {
            let { token, expires } = JSON.parse(tokenInfo);
            if (token && expires && expires >= +new Date()) {
                return token;
            }
        }
        if (info.type == AccountType.anonym) {

            try {
                let res = await postJson(`${baseUrl}/api/v2/token`, { id: info.id, secret: info.secret });
                if (!res.ok) {
                    throw new TokenRenewFailedException(false);
                }
                let tokenResponse = await res.json();
                localStorage.setItem("access_token_anonymous", JSON.stringify(tokenResponse));
                return tokenResponse.token;
            }
            catch {
                throw new TokenRenewFailedException(true);
            }
        }
        else if (info.type == AccountType.google) {
            throw new InteractionRequiredException();
            // let flow = new OAuth2PopupFlow({
            //     authorizationUri: "https://accounts.google.com/o/oauth2/v2/auth/.well-known/openid-configuration",
            //     clientId: "82890837151-n0e81vsn3ns2qn1ksh7bdohmnlau468k.apps.googleusercontent.com",
            //     redirectUri: "http://localhost:4200",
            //     scope: "openid",
            //     responseType: "id_token",
            //     additionalAuthorizationParameters: { "login_hint": info.id },
            //     accessTokenStorageKey: "access_token_google"
            // });
            // return await flow.token();
        }
        else {
            throw new Error(`Account Typ ${info.type} unbekannt`);
        }
    }
}