export function round(value: number, decimals: number) {

    //Removing scientific notation if used:
    var valueString = value.toString();
    var indexOfE = valueString.indexOf("E");
    var indexOfe = valueString.indexOf("e");
    var power = 0;
    if (indexOfe > -1) {
        power = parseFloat(valueString.substring(indexOfe + 1));
        valueString = valueString.substring(0, indexOfe)
    } else if (indexOfE > -1) {
        power = parseFloat(valueString.substring(indexOfE + 1));
        valueString = valueString.substring(0, indexOfE)
    }
    //round
    return Number(Math.round(Number(valueString + 'e' + (power + decimals))) + 'e-' + (decimals));
}