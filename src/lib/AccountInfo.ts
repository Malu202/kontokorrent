import { AccountType as AccountType } from "./AccountType";

export interface AccountInfo {
    type: AccountType;
    id: string;
    secret: string | null;
}