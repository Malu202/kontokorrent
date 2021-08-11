
export class AusgleichsZahlung {
    constructor(public bezahlendePersonId: string,
        public empfaengerPersonId: string,
        public wert: number) {
    }
}
