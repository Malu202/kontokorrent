


var overview = document.getElementById("overview");
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

for (var i = 0; i < 6; i++) { 
    createOverviewPerson("Person " + i, i * 100);
}