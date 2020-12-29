import { Action } from "./Action";


export interface Store {
    dispatch(action: Action): void;
}
