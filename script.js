
var personenliste = [];

for (var i = 0; i < 6; i++) {
    personenliste.push({
        name: "Person " + i,
        betrag: 100 * i
    })
}


var overview = document.getElementById("overviewList");
function createOverviewPerson(name, betrag) {
    var name = name;
    var betrag = betrag;
    var li = document.createElement("li");
    li.className = "mdc-list-item";
    var outerSpan = document.createElement("span");
    outerSpan.className = "mdc-list-item__text";
    outerSpan.innerHTML = name;
    var innerSpan = document.createElement("span");
    innerSpan.className = "mdc-list-item__secondary-text";
    innerSpan.innerHTML = betrag + '€';

    overview.appendChild(li);
    li.appendChild(outerSpan);
    outerSpan.appendChild(innerSpan);
}

var payingPersons = document.getElementById("payingPersons");
var payedPersons = document.getElementById("payedPersons");
function populatePayingPersons() {
    for (var i = 0; i < personenliste.length; i++) {
        var payingCheckbox = createCheckbox(personenliste[i].name);
        personenliste[i].payingcheckbox = payingCheckbox;
        payingPersons.appendChild(payingCheckbox);

        var payedCheckbox = createCheckbox(personenliste[i].name);
        personenliste[i].payedCheckbox = payedCheckbox;
        payedPersons.appendChild(payedCheckbox);
    }
}

function createCheckbox(labelString) {
    var formField = document.createElement("div");
    formField.className = "mdc-form-field";
    var checkbox = document.createElement("div");
    checkbox.className = "mdc-checkbox";
    var input = document.createElement("input");
    input.className = "mdc-checkbox__native-control";
    input.type = "checkbox";
    var background = document.createElement("div");
    background.className = "mdc-checkbox__background";
    var svg = document.createElement("svg");
    svg.className = "mdc-checkbox__checkmark";
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElement("path");
    path.className = "mdc-checkbox__checkmark-path";
    path.setAttribute("fill","none");
    path.setAttribute("stroke","white");
    path.setAttribute('d',"M1.73,12.91 8.1,19.28 22.79,4.59");
    var mixedmark = document.createElement("div");
    mixedmark.className = "mdc-checkbox__mixedmark";
    var label = document.createElement("label");
    label.innerHTML = labelString;

    formField.appendChild(checkbox);
    checkbox.appendChild(input);
    checkbox.appendChild(background);
    background.appendChild(svg);
    background.appendChild(mixedmark);
    svg.appendChild(path);
    formField.appendChild(label);
    return formField;
}


for (var j = 0; j < personenliste.length; j++) {
    createOverviewPerson(personenliste[j].name, personenliste[j].betrag);
}
populatePayingPersons();