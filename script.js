var API_URL = "https://kontokorrent.marik.ch/api";
var KONTOKORRENT_URL = API_URL + "/kontokorrent";
var TOKEN_URL = API_URL + "/token";
var PERSONS_URL = API_URL + "/persons";
var PAYMENTS_URL = API_URL + "/payments";

const ENTER_KEYCODE = 13;
// const KOMMA_KEYCODE = 188;

var request = function (type, url, includeToken, jsondata, callback) {
    var http = new XMLHttpRequest();
    http.open(type, url, true);

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

var postRequest = function (url, includeToken, jsondata, callback) {
    request("POST", url, includeToken, jsondata, callback);
}
var deleteRequest = function (url, includeToken, jsondata, callback) {
    request("DELETE", url, includeToken, jsondata, callback);
}
var putRequest = function (url, includeToken, jsondata, callback) {
    request("PUT", url, includeToken, jsondata, callback);
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
                        showSplashScreenError(res + " Code " + c);
                    }
                });
            }
            else if (code == 401) {
                showSplashScreenError("Kontokorrent nicht gefunden!");
            }
            else {
                showSplashScreenError(response + " Code " + code);
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
    div.className = "mdc-text-field  mdc-text-field--fullwidth";
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
    showSplashScreen();
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
            createOverviewPerson(personenliste[j].name, personenliste[j].id, personenliste[j].betrag);
        }
        populateTransactionPersons();
        populateTransactionList(response.letzteBezahlungen);
    }
}



var payingPerson = document.getElementById("payingPerson");
var newTransaction = document.getElementById("newTransaction");
var overview = document.getElementById("overviewList");
function createOverviewPerson(name, id, betrag) {
    var name = name;
    var betrag = betrag;
    var li = document.createElement("li");
    li.className = "mdc-list-item";
    var outerSpan = document.createElement("span");
    outerSpan.className = "mdc-list-item__text";
    outerSpan.innerHTML = name;
    var innerSpan = document.createElement("span");
    innerSpan.className = "mdc-list-item__secondary-text";
    betrag = centBetragMitNull(round(betrag, 2));
    innerSpan.innerHTML = betrag + '€';

    overview.appendChild(li);
    li.appendChild(outerSpan);
    outerSpan.appendChild(innerSpan);

    li.onclick = function () {
        // payingPerson.innerHTML = name;
        payerSelect.value = id;
        //if (newTransaction.getBoundingClientRect().bottom > (window.innerHeight || document.documentElement.clientHeight)) newTransaction.scrollIntoView({ block: "start", behavior: "smooth" });
    }
}
function round(value, decimals) {

    //Removing scientific notation if used:
    var valueString = value.toString();
    var indexOfE = valueString.indexOf("E");
    var indexOfe = valueString.indexOf("e");
    var power = 0;
    if (indexOfe > -1) {
        power = parseFloat(valueString.substring(indexOfe+1));
        valueString = valueString.substring(0,indexOfe)
    } else if (indexOfE > -1) {
        power = parseFloat(valueString.substring(indexOfE+1));
        valueString = valueString.substring(0,indexOfE)
    }
    //round
    return Number(Math.round(valueString + 'e' + (power + decimals)) + 'e-' + (decimals));
}
//payingPerson.onclick = function(){refresh();}
//var payingPersons = document.getElementById("payingPersons");
var payedPersons = document.getElementById("payedPersons");
var payerSelect = document.getElementById("payerSelect");

function populateTransactionPersons() {
    while (payedPersons.firstChild) {
        payedPersons.removeChild(payedPersons.firstChild);
    }
    payerSelect.innerHTML = "";
    payerSelect.appendChild(createSelectOption("", "", true, true));
    for (var i = 0; i < personenliste.length; i++) {
        var payedCheckbox = createCheckbox(personenliste[i].name);
        personenliste[i].payedCheckbox = payedCheckbox;
        payedPersons.appendChild(payedCheckbox);

        payerSelect.appendChild(createSelectOption(personenliste[i].id, personenliste[i].name, false, false));
    }
}
function createSelectOption(value, text, selected, disabled) {
    var option = document.createElement("option");
    option.disabled = disabled;
    option.selected = selected;
    option.value = value;
    option.innerHTML = text;
    return option;
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
payedForAllCheckboxInput.onclick = checkAllPersons;
function checkAllPersons() {
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
var transactionAmountInput = document.getElementById("amountInput");
var transactionError = document.getElementById("transactionError");
var page = document.getElementById("page");

confirmTransactionButton.onclick = function () {
    var payees = [];
    for (var i = 0; i < personenliste.length; i++) {
        if (personenliste[i].payedCheckbox.firstChild.firstChild.checked) {
            payees.push(personenliste[i].id);
        }
    }
    confirmTransaction(betreffInput.value, payerSelect, transactionError, transactionAmountInput, payees, null, function (res, code, success) {
        if (success) {
            refresh();
        }
    });
}
function confirmTransaction(betreffInput, payingPersonSelect, transactionErrorDiv, amountInput, payeeIds, zeitpunkt, callback) {
    parseTransactionInput(null, betreffInput, payingPersonSelect, transactionErrorDiv, amountInput, payeeIds, zeitpunkt, callback);
}
function editTransaction(paymentId, betreffInput, payingPersonSelect, transactionErrorDiv, amountInput, payeeIds, zeitpunkt, callback) {
    parseTransactionInput(paymentId, betreffInput, payingPersonSelect, transactionErrorDiv, amountInput, payeeIds, zeitpunkt, callback);
}
function parseTransactionInput(paymentId, betreffInput, payingPersonSelect, transactionErrorDiv, amountInput, payeeIds, zeitpunkt, callback) {
    var betreff = betreffInput;
    //var payer = payingPerson;
    var payerId = payingPersonSelect.options[payingPersonSelect.selectedIndex].value;
    var payees = payeeIds;
    // for (var i = 0; i < personenliste.length; i++) {
    //     if (payer == personenliste[i].name) {
    //         payerId = personenliste[i].id;
    //     }
    // }
    amountInput.setAttribute("type", "text");
    var amount = amountInput.value;
    amountInput.setAttribute("type", "number");

    amount = amount.replace(",", ".");
    amount = amount.replace(/ /g, '');


    var error = [];
    if (betreff == "") error.push("Betreff");
    // if (payer == "Bitte Person in der Übersicht auswählen") error.push("bezahlende Person");
    if (payerId == "") error.push("bezahlende Person");

    if (payees.length == 0) error.push("empfangende Personen");
    if (amount == "" || isNaN(amount)) error.push("Betrag");

    if (error.length == 0) {
        var request = {
            "bezahlendePerson": payerId,
            "empfaenger": payees,
            "wert": parseFloat(amount),
            "beschreibung": betreff
        };
        if (zeitpunkt != null) {
            request.zeitpunkt = zeitpunkt;
        }
        if (paymentId == null) {
            showLoadScreen("Transaktion wird hinzugefügt");
            postRequest(PAYMENTS_URL, true, request, function (response, code) {
                callback(response, code, true);
            });
        } else {
            showLoadScreen("Transaktion wird bearbeitet");
            putRequest(PAYMENTS_URL + "/" + paymentId, true, request, function (response, code) {
                callback(response, code, true);
            });
        }
    }
    else {
        var errormessage = "Bitte ";
        for (var i = 0; i < error.length; i++) {
            errormessage += error[i];
            if (i != error.length - 1) errormessage += ', ';
        }
        errormessage += " eingeben!";
        transactionErrorDiv.innerHTML = errormessage;
        transactionErrorDiv.style.display = "block";
        //newTransaction.scrollIntoView({ block: "start", behavior: "smooth" });
        callback(null, null, false);
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
    transactions = letzteBezahlungen;
    if (letzteBezahlungen != undefined) {
        createPaymentList(letzteBezahlungen, transactionList);
    }
}

function createPaymentList(payments, parent) {
    for (var i = 0; i < payments.length; i++) {

        var currentDate = new Date(payments[i].zeitpunkt);
        if (i == 0) {
            var dateHeading = document.createElement("h3");
            dateHeading.className = "mdc-list-group__subheader";
            dateHeading.innerHTML = currentDate.getDayName() + ", " + currentDate.toLocaleDateString();
            parent.appendChild(dateHeading);
        } else {
            var previousDate = new Date(payments[i - 1].zeitpunkt);
            if (previousDate.getDate() != currentDate.getDate() || previousDate.getMonth() != currentDate.getMonth() || previousDate.getFullYear() != currentDate.getFullYear()) {
                var dateHeading = document.createElement("h3");
                dateHeading.className = "mdc-list-group__subheader";
                dateHeading.innerHTML = currentDate.getDayName() + ", " + currentDate.toLocaleDateString();
                parent.appendChild(dateHeading);
            }
        }
        //console.log(letzteBezahlungen[i].beschreibung);
        parent.appendChild(createTransactionListItem(payments[i].beschreibung, payments[i].bezahlendePerson.name, payments[i].bezahlendePerson.id, payments[i].empfaenger, centBetragMitNull(payments[i].wert), payments[i].id, payments[i].zeitpunkt));
    }
}

//Mindestens 2 Nachkommastellen oder mehr, außer bei ganzen Euro Beträgen, z.B.: 1.333, 1.50, 50€
function centBetragMitNull(wert) {
    var Betrag = wert;
    var Kommaindex = Betrag.toString().indexOf(".");
    var Nachkommastellen = 0;
    if (Kommaindex != -1) {
        Nachkommastellen = Betrag.toString().length - (Kommaindex + 1);
        if (Nachkommastellen == 1) Betrag += '0';
    }
    return Betrag;
}
var transactionsDetails = document.getElementById("transactionsDetails");
function createTransactionListItem(name, payer, payerId, payees, amount, id, zeitpunkt) {
    var li = document.createElement("li");
    li.className = "mdc-list-item"
    var div = document.createElement("div");
    div.className = "mdc-list-item__text";
    div.innerHTML = name;
    var span = document.createElement("span");
    span.className = "mdc-list-item__secondary-text";
    span.innerHTML = payer + " für ";
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

    li.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();

        showDialog("Zahlung löschen?", 'Wirklich "' + name + '" löschen?', "Ja", "Nein", function () {
            showLoadScreen("Zahlung wird gelöscht");
            // deleteRequest(PAYMENTS_URL + "/" + id, true, {}, function (response, code) {
            deletePayment(id, function (response, code) {
                if (code == 200) {
                    refresh();
                }
            });
        }, null);


        return false;
    }, false);

    li.addEventListener('click', function (ev) {
        //return false;//remove this to activat editing feature
        ev.preventDefault();
        var container = document.createElement("div");
        var thisTransaction = transactionsDetails.cloneNode(true);
        container.appendChild(createMaterialIconButton("&#xE872;"));
        container.appendChild(thisTransaction);
        var everySubNode = thisTransaction.getElementsByTagName("*");

        var newName, newPayer, transactionError, newAmount, newPayees;
        for (var i = 0; i < thisTransaction.childNodes.length; i++) {
            var node = thisTransaction.childNodes[i];
            if (node.id == "betreffTextField") {
                newName = node.childNodes[1];
                newName.value = name;
            } else if (node.id == "payerSelectContainer") {
                node.childNodes[1].classList.add("mdc-select--disabled");
                newPayer = node.childNodes[1].childNodes[3];
                newPayer.value = payerId;
            } else if (node.id == "payedPersons") {
                newPayees = node.childNodes;
                for (var j = 0; j < node.childNodes.length; j++) {
                    var personenName = node.childNodes[j].childNodes[1].innerHTML;
                    for (var k = 0; k < payees.length; k++) {
                        if (personenName == payees[k].name) node.childNodes[j].firstChild.firstChild.checked = true;
                    }
                }
            } else if (node.id == "amountTextField") {
                newAmount = node.childNodes[1];
                node.childNodes[1].value = amount;
            } else if (node.id == "transactionError") {
                transactionError = node;
                transactionError.innerHTML = "";
            } else if (node.id == "alle") {
                node.style.display = "none";
            }

        }
        for (var l = 0; l < everySubNode.length; l++) {
            var idSuffix = "Edit";
            var forAttr = everySubNode[l].getAttribute("for");
            if (forAttr != null) everySubNode[l].setAttribute("for", forAttr + idSuffix);
            everySubNode[l].id += idSuffix;
        }
        // var deleteButton = document.createElement("li");
        // li.className = "mdc-list-item"
        showAsDialog(container, "speichern", "abbrechen", function () {
            var newPayeeIds = [];
            for (var i = 0; i < newPayees.length; i++) {
                if (newPayees[i].firstChild.firstChild.checked) {
                    for (var j = 0; j < personenliste.length; j++) {
                        if (personenliste[j].name == newPayees[i].childNodes[1].innerHTML) newPayeeIds.push(personenliste[j].id);
                    }
                }
            }
            var erfolg = true;
            editTransaction(id, newName.value, newPayer, transactionError, newAmount, newPayeeIds, zeitpunkt, function (response, code, success) {
                if (!success) {
                    erfolg = false;
                    return false;
                }
                if (code == 200) {
                    refresh();
                } else {
                    showLoadScreen("Error Code: " + code + " " + response)
                    setTimeout(refresh, 6000);
                }
            });
            return erfolg;
        }, null);
    }, false);

    return li;
}
function createMaterialIconButton(iconNumber, id, onclick) {
    var button = document.createElement("button");
    button.className = "mdc-button";
    if (id != null) button.id = id;
    if (onclick != null) button.onclick = onclick();
    var i = document.createElement("i");
    i.className = "material-icons mdc-button__icon";
    i.innerHTML = iconNumber;
    button.appendChild(i);
    return button;
}

function deletePayment(id, callback) {
    deleteRequest(PAYMENTS_URL + "/" + id, true, {}, function (r, c) { callback(r, c) });
}

var deletedButton = document.getElementById("deletedButton");
var deletedCard = document.getElementById("deletedPayments");
// deletedButton.onclick = function () {
//     pageSwitcher.switchToPage("deletedScreen");

//     createPaymentList(transactions, deletedCard);
// }

var toolbarTitle = document.getElementById("Toolbar");
toolbarTitle.onclick = function () {
    pageSwitcher.switchToPage("homeScreen");
}


function autoLogin() {
    if (localStorage.getItem("token")) {
        showLoadScreen("Übersicht wird geladen");
        getRequest(KONTOKORRENT_URL, true, function (response, code) {
            if (code == 401) { showSplashScreen(); }
            else {
                showHomeScreen(response);
            }
        });
    }
    else {
        showSplashScreen();
    }
}
autoLogin();


var dialog = document.getElementById("dialog");
var dialogTitel = document.getElementById("dialogTitel");
var dialogText = document.getElementById("dialogText");
var dialogAcceptButton = document.getElementById("dialogAcceptButton");
var dialogCancelButton = document.getElementById("dialogCancelButton");

showDialog = function (titel, text, accept, cancel, onAccept, onCancel) {
    dialogTitel.innerHTML = titel;
    dialogText.innerHTML = "";
    dialogText.innerHTML = text;
    setupDialogButtons(dialog, dialogAcceptButton, dialogCancelButton, accept, cancel, onAccept, onCancel);
}


var customDialog = document.getElementById("customDialog");
var customDialogAcceptButton = document.getElementById("customDialogAcceptButton");
var customDialogCancelButton = document.getElementById("customDialogCancelButton");
var customDialogContent = document.getElementById("customDialogContent");

showAsDialog = function (html, accept, cancel, onAccept, onCancel) {
    customDialogContent.innerHTML = "";
    customDialogContent.appendChild(html);
    setupDialogButtons(customDialog, customDialogAcceptButton, customDialogCancelButton, accept, cancel, onAccept, onCancel);
}

function setupDialogButtons(dialog, acceptButton, cancelButton, accept, cancel, onAccept, onCancel) {
    acceptButton.innerHTML = accept;
    cancelButton.innerHTML = cancel;

    acceptButton.onclick = function () {
        dialog.classList.remove("mdc-dialog--open");
        var done = true;
        if (onAccept != null) done = onAccept();
        if (!done) dialog.classList.add("mdc-dialog--open");
    }
    cancelButton.onclick = function () {
        dialog.classList.remove("mdc-dialog--open");
        var done = true;
        if (onCancel != null) done = onCancel();
        if (!done) dialog.classList.add("mdc-dialog--open");

    }
    dialog.classList.add("mdc-dialog--open");
}