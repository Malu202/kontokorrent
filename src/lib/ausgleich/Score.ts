
export class Score {
    constructor(public personA: string, public personB: string, public value: number) {
    }
    public Is(a: string, b: string): boolean {
        return (this.personA == a && this.personB == b) || (this.personA == b && this.personB == a);
    }
}
