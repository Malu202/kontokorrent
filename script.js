
var personenliste = [];

for (var i = 0; i < 6; i++) { 
    personenliste.push({
        name: "Person " + i,
        betrag: 100*i
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




for (var j = 0; j < personenliste.length; j++) { 
    createOverviewPerson(personenliste[j].name, personenliste[j].betrag);
}