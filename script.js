var API_URL = "https://kontokorrent.azurewebsites.net/api";
var KONTOKORRENT_URL = API_URL + "/kontokorrent";
var TOKEN_URL = API_URL + "/token";
var PERSONS_URL = API_URL + "/persons";
var PAYMENTS_URL = API_URL + "/payments"

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

var personenliste = [];

var splashScreen = document.getElementById("splashScreen")
var loginBox = document.getElementById("loginBox");
var loginButton = document.getElementById("loginButton");
var eventInput = document.getElementById("eventInput");
var createEventButton = document.getElementById("createEventButton");

loginButton.onclick = function () {
    var eventname = eventInput.value;
    if (eventname) {
        hideSplashError();

        getToken(eventname, function (response, code) {
            if (code == 200) {
                getRequest(KONTOKORRENT_URL, true, function (res, c) {
                    if (c = 200) {
                        exitSplashScreen(res);
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
            postRequest(KONTOKORRENT_URL, false, { "secret": newEventInput.value }, function (response, code) {
                if (code == 200) {
                    getToken(newEventInput.value, function (response, code) {
                        if (code == 200) {
                            createMultiplePersons(filteredNewPersonList, function (lastError) {
                                if (lastError == 200) {
                                    getRequest(KONTOKORRENT_URL, true, function (res, c) {
                                        if (c == 200) {
                                            exitSplashScreen(res);
                                        }
                                    })
                                } else {
                                    showSplashScreenError("Personen konnten nicht für dieses Event erstellt werden");
                                }
                            });
                        }
                    });
                }
                else {
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

function createMultiplePersons(namelist, callback) {
    var requestCount = namelist.length;
    var lastError = 200;
    function requestFinished() {
        requestCount--;
        if (requestCount == 0) callback(lastError);
        console.log("requestFinished");
    }
    for (var i = 0; i < requestCount; i++) {
        postRequest(PERSONS_URL, true, { "name": namelist[i] }, function (request, code) {
            requestFinished();
            if (code != 200) lastError = code;
        });
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
function exitSplashScreen(status) {
    splashScreen.style.display = "none";

    updateEventScreen(status);
}
function showSplashScreen() {
    splashScreen.style.display = "flex";
    //initializeEventScreen();
}
var toolbarTitle = document.getElementById("toolbarTitle");
function updateEventScreen(status) {
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
        newTransaction.scrollIntoView({ block: "start", behavior: "smooth" });
    }
}

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
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "white");
    path.setAttribute('d', "M1.73,12.91 8.1,19.28 22.79,4.59");
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
var overview = document.getElementById("overview");
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
        postRequest(PAYMENTS_URL, true, request, function (response, code) {
            overview.scrollIntoView();
        })
    }

}

autoLogin = function () {
    if (localStorage.getItem("token")) {
        getRequest(KONTOKORRENT_URL, true, function (response, code) {
            console.log(response);
            console.log(code);
            if (code == 401) { showSplashScreen(); }
            else {
                console.log("got status");
                updateEventScreen(response);
            }
        });
    }
    else {
        showSplashScreen();
    }
}
autoLogin()