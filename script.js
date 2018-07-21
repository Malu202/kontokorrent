var API_URL = "https://kontokorrent.azurewebsites.net/api";
var KONTOKORRENT_URL = API_URL + "/kontokorrent";
var TOKEN_URL = API_URL + "/token";
var PERSONS_URL = API_URL + "/persons";
var PAYMENTS_URL = API_URL + "/payments";

const ENTER_KEYCODE = 13;

var postRequest = function (url, includeToken, jsondata, callback) {
    var http = new XMLHttpRequest();
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/json");
    if (includeToken) http.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            var responseJSON
            try { responseJSON = JSON.parse(http.responseText); }
            catch (error) { responseJSON = http.responseText; }
            callback(responseJSON, http.status);
        }
    }
    http.send(JSON.stringify(jsondata));
}
var getRequest = function (url, includeToken, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    if (includeToken) xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    xhr.addEventListener('load', function (event) {
        var json;
        try { json = JSON.parse(xhr.responseText); }
        catch (error) { json = xhr.responseText; }
        callback(json, xhr.status);
    });
    xhr.send();
}


function getToken(eventname, callback) {
    postRequest(TOKEN_URL, false, { "secret": eventname }, function (response, code) {
        console.log(code);
        console.log(response);
        if (code == 200) {
            localStorage.setItem('token', response.token);
        }
        callback(response, code)
    });
}
function setToken(token) {
    localStorage.setItem('token', token);
}

var pageSwitcher = new PageSwitcher;

var personenliste = [];

var splashScreen = document.getElementById("splashScreen")
var loginBox = document.getElementById("loginBox");
var loginButton = document.getElementById("loginButton");
var eventInput = document.getElementById("eventInput");
var createEventButton = document.getElementById("createEventButton");

eventInput.addEventListener("keyup", function (event) {
    var keyCode = event.which || event.keyCode || event.charCode;
    if (keyCode == ENTER_KEYCODE) {
        login();
    }
});

loginButton.onclick = function () {
    login();
}

function login() {
    var eventname = eventInput.value;
    if (eventname) {
        hideSplashError();
        showLoadScreen("Kontokorrent wird geladen");
        getToken(eventname, function (response, code) {
            if (code == 200) {
                getRequest(KONTOKORRENT_URL, true, function (res, c) {
                    if (c = 200) {
                        showHomeScreen(res);
                    }
                    else {
                        showSplashScreenError(res);
                    }
                });
            }
            else {
                showSplashScreenError(response);
            }
        });
    }
    else {
        showSplashScreenError("Event eingeben!");
    }
}

var logOutButton = document.getElementById("logOutButton");
logOutButton.onclick = function () {
    localStorage.removeItem("token");
    showSplashScreen();
}

var createEventBox = document.getElementById("createEventBox");
var backToLoginButton = document.getElementById("backToLoginButton");
var addNewPersonButton = document.getElementById("addNewPersonButton");
var createPersonsList = document.getElementById("createPersonsList");
var createNewEventButton = document.getElementById("createNewEventButton");
var newEventInput = document.getElementById("newEventInput");

createEventButton.onclick = function () {
    loginBox.style.display = "none";
    createEventBox.style.display = "flex";
    if (newPersonList.length == 0) createNewPersonCreator();
    if (newPersonList.length == 1) createNewPersonCreator();

    hideSplashError();
}
backToLoginButton.onclick = function () {
    loginBox.style.display = "flex";
    createEventBox.style.display = "none";
    hideSplashError();
}
addNewPersonButton.onclick = function () {
    createNewPersonCreator();
}
createNewEventButton.onclick = function () {
    hideSplashError();
    var filteredNewPersonList = [];
    for (var i = 0; i < newPersonList.length; i++) {
        if (newPersonList[i].value) filteredNewPersonList.push(newPersonList[i].value);
    }
    if (newEventInput.value) {
        if (filteredNewPersonList.length > 1) {
            showLoadScreen("Event wird erstellt");
            var event = { "secret": newEventInput.value };
            event.Personen = [];
            for (var i = 0; i < filteredNewPersonList.length; i++) {
                event.Personen.push({ "name": filteredNewPersonList[i] });
            }
            postRequest(KONTOKORRENT_URL, false, event, function (response, code) {
                if (code == 200) {
                    setToken(response.token);
                    showHomeScreen(response);
                }
                else {
                    showSplashScreen();
                    showSplashScreenError(response);
                }
            });
        } else {
            showSplashScreenError("Mindestens 2 Personen eingeben");
        }
    } else {
        showSplashScreenError("Eventnamen eingeben");
    }
}

var newPersonList = []
function createNewPersonCreator() {
    var li = document.createElement("li");
    li.className = "mdc-list-item";
    var div = document.createElement("div");
    div.className = "mdc-text-field";
    var input = document.createElement("input");
    input.className = "mdc-text-field__input"
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Name eingeben");
    var button = document.createElement("button");
    button.className = "mdc-button";
    var a = document.createElement("a");
    a.className = "mdc-list-item__meta material-icons";
    a.innerHTML = "&#xE872;";

    createPersonsList.appendChild(li);
    li.appendChild(div);
    div.appendChild(input);
    li.appendChild(button);
    button.appendChild(a);

    button.onclick = function () {
        createPersonsList.removeChild(li);

        var index = newPersonList.indexOf(input);
        if (index > -1) {
            newPersonList.splice(index, 1);
        }

    }
    newPersonList.push(input);
}
var errorText = document.getElementById("errorText");
function showSplashScreenError(error) {
    errorText.innerHTML = error;
    errorText.style.display = "block";
}
function hideSplashError() {
    errorText.style.display = "none";
}
function showHomeScreen(status) {
    updateEventScreen(status);
    pageSwitcher.switchToPage("homeScreen");
}
function showSplashScreen() {
    pageSwitcher.switchToPage("splashScreen");
}
var loadInfoText = document.getElementById("loadingInformation");
function showLoadScreen(loadInfo) {
    loadInfoText.innerHTML = loadInfo + "...";
    pageSwitcher.switchToPage("loadScreen");
}
var toolbarTitle = document.getElementById("toolbarTitle");
function updateEventScreen(response) {
    var status = response.personenStatus;
    if (status.length) {
        personenliste = [];
        for (var i = 0; i < status.length; i++) {
            personenliste.push({
                name: status[i].person.name,
                id: status[i].person.id,
                betrag: status[i].wert,
            })
        }
        while (overviewList.firstChild) {
            overviewList.removeChild(overviewList.firstChild);
        }
        for (var j = 0; j < personenliste.length; j++) {
            createOverviewPerson(personenliste[j].name, personenliste[j].betrag);
        }
        populateTransactionPersons();
        if(response.letzteBezahlungen) populateTransactionList(response.letzteBezahlungen);
    }
}



var payingPerson = document.getElementById("payingPerson");
var newTransaction = document.getElementById("newTransaction");
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
    betrag = Math.round((betrag + 0.00001) * 100) / 100;
    innerSpan.innerHTML = betrag + '€';

    overview.appendChild(li);
    li.appendChild(outerSpan);
    outerSpan.appendChild(innerSpan);

    li.onclick = function () {
        payingPerson.innerHTML = name;
        if (newTransaction.getBoundingClientRect().bottom > (window.innerHeight || document.documentElement.clientHeight)) newTransaction.scrollIntoView({ block: "start", behavior: "smooth" });
    }
}
//payingPerson.onclick = function(){refresh();}
//var payingPersons = document.getElementById("payingPersons");
var payedPersons = document.getElementById("payedPersons");
function populateTransactionPersons() {
    while (payedPersons.firstChild) {
        payedPersons.removeChild(payedPersons.firstChild);
    }
    for (var i = 0; i < personenliste.length; i++) {
        var payedCheckbox = createCheckbox(personenliste[i].name);
        personenliste[i].payedCheckbox = payedCheckbox;
        payedPersons.appendChild(payedCheckbox);
    }
}

function createCheckbox(labelString) {
    var id = "autoCreatedCheckbox" + labelString;

    var formField = document.createElement("div");
    formField.className = "mdc-form-field";
    var checkbox = document.createElement("div");
    checkbox.className = "mdc-checkbox";
    var input = document.createElement("input");
    input.className = "mdc-checkbox__native-control";
    input.type = "checkbox";
    input.id = id;
    var background = document.createElement("div");
    background.className = "mdc-checkbox__background";

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "class", "mdc-checkbox__checkmark");
    svg.setAttributeNS(null, "viewBox", "0 0 24 24");

    //svg.innerHTML = '<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M 1.73 12.91 L 8.1 19.28 L 22.79 4.59"></path>';
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttributeNS(null, "class", "mdc-checkbox__checkmark-path");
    path.setAttributeNS(null, "fill", "none");
    path.setAttributeNS(null, "stroke", "white");
    path.setAttributeNS(null, "d", "M 1.73 12.91 L 8.1 19.28 L 22.79 4.59");

    var mixedmark = document.createElement("div");
    mixedmark.className = "mdc-checkbox__mixedmark";
    var label = document.createElement("label");
    label.innerHTML = labelString;
    label.setAttribute("for", id);
    formField.appendChild(checkbox);
    checkbox.appendChild(input);
    checkbox.appendChild(background);
    background.appendChild(svg);
    svg.appendChild(path);
    background.appendChild(mixedmark);
    formField.appendChild(label);
    return formField;
}
payedForAllCheckboxInput = document.getElementById("payedForAllCheckboxInput");
payedForAllCheckboxInput.onclick = function () {
    if (payedForAllCheckboxInput.checked) {
        for (var i = 0; i < personenliste.length; i++) {
            personenliste[i].payedCheckbox.firstChild.firstChild.checked = true;
        }
    } else {
        for (var i = 0; i < personenliste.length; i++) {
            personenliste[i].payedCheckbox.firstChild.firstChild.checked = false;
        }
    }
}

var confirmTransactionButton = document.getElementById("confirmTransactionButton");
var betreffInput = document.getElementById("betreffInput");
var amountInput = document.getElementById("amountInput");
var transactionError = document.getElementById("transactionError");
var page = document.getElementById("page");
confirmTransactionButton.onclick = function () {
    var betreff = betreffInput.value;
    var payer = payingPerson.innerHTML;
    var payerId;
    var payees = [];
    for (var i = 0; i < personenliste.length; i++) {
        if (personenliste[i].payedCheckbox.firstChild.firstChild.checked) {
            payees.push(personenliste[i].id);
        }
        if (payer == personenliste[i].name) {
            payerId = personenliste[i].id;
        }
    }
    var amount = amountInput.value;
    amount = amount.replace(",", ".");
    amount = amount.replace(/ /g, '')
    if (amount == "") amount = undefined;

    if ((betreff != "") && (payer != "Bitte Person in der Übersicht auswählen") && (payees.length != 0) && !isNaN(amount)) {
        var request = {
            "bezahlendePerson": payerId,
            "empfaenger": payees,
            "wert": amount,
            "beschreibung": betreff
        };
        showLoadScreen("Transaktion wird hinzugefügt");
        postRequest(PAYMENTS_URL, true, request, function (response, code) {
            refresh();
        });
    }
    else {
        transactionError.innerHTML = "Ungültige Eingabe";
        transactionError.style.display = "block";
        newTransaction.scrollIntoView({ block: "start", behavior: "smooth" });
    }

}
function refresh() {
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
}

//Date erweitern so dass es Wochentagsnamen unterstützt:
(function () {
    var days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };
})();

var loadMoreTransactionButton = document.getElementById("loadMoreTransactionsButton");
var transactionDownloadProgress = document.getElementById("loadMoreBar");
loadMoreTransactionButton.onclick = function () {
    transactionDownloadProgress.style.display = "block";
    loadMoreTransactionButton.parentElement.parentElement.style.display = "none";
    getRequest(PAYMENTS_URL, true, function (response, code) {
        if (code == 200) {
            populateTransactionList(response);
        }
        transactionDownloadProgress.style.display = "none";
    });
}

var transactionList = document.getElementById("transactions");
var transactions = [];
function populateTransactionList(letzteBezahlungen) {
    while (transactionList.firstChild) {
        transactionList.removeChild(transactionList.firstChild);
    }
    transactions = [];
    for (var i = 0; i < letzteBezahlungen.length; i++) {

        transactions[i] = letzteBezahlungen[i];
        var currentDate = new Date(transactions[i].zeitpunkt);
        if (i == 0) {
            var dateHeading = document.createElement("h3");
            dateHeading.className = "mdc-list-group__subheader";
            dateHeading.innerHTML = currentDate.getDayName() + ", " + currentDate.toLocaleDateString();
            transactionList.appendChild(dateHeading);
        } else {
            var previousDate = new Date(transactions[i - 1].zeitpunkt);
            if (previousDate.getDate() != currentDate.getDate() || previousDate.getMonth() != currentDate.getMonth() || previousDate.getFullYear() != currentDate.getFullYear()) {
                var dateHeading = document.createElement("h3");
                dateHeading.className = "mdc-list-group__subheader";
                dateHeading.innerHTML = currentDate.getDayName() + ", " + currentDate.toLocaleDateString();
                transactionList.appendChild(dateHeading);
            }
        }
        transactionList.appendChild(createTransactionListItem(letzteBezahlungen[i].beschreibung, letzteBezahlungen[i].bezahlendePerson.name, letzteBezahlungen[i].empfaenger, letzteBezahlungen[i].wert));
    }
}
function createTransactionListItem(name, payer, payees, amount) {
    var li = document.createElement("li");
    li.className = "mdc-list-item"
    var div = document.createElement("div");
    div.className = "mdc-list-item__text";
    div.innerHTML = name;
    var span = document.createElement("span");
    span.className = "mdc-list-item__secondary-text";
    span.innerHTML = payer + " an ";
    for (var i = 0; i < payees.length; i++) {
        span.innerHTML += payees[i].name;
        if (i != payees.length - 1) span.innerHTML += ", "
    }
    var div2 = document.createElement("div");
    div2.className = "mdc-list-item__meta";
    div2.innerHTML = amount + "€";

    li.appendChild(div);
    div.appendChild(span);
    li.appendChild(div2);

    return li;
}



function autoLogin() {
    if (localStorage.getItem("token")) {
        showLoadScreen("Übersicht wird geladen");
        getRequest(KONTOKORRENT_URL, true, function (response, code) {
            console.log(response);
            console.log(code);
            if (code == 401) { showSplashScreen(); }
            else {
                console.log("got status");
                showHomeScreen(response);
            }
        });
    }
    else {
        showSplashScreen();
    }
}
autoLogin();

