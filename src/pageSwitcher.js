function PageSwitcher() {
    this.previousPageName = null;
}

PageSwitcher.prototype.switchToPage = function (pageName) {
    //hide previous page
    if (this.previousPageName != null) {
        var previousPageElements = document.getElementsByClassName(this.previousPageName);
        for (var i = 0; i < previousPageElements.length; i++) {
            if (!this.exitException(previousPageElements[i])) {
                previousPageElements[i].style.display = "none";
            }
        }
    }

    //show new page
    var pageElements = document.getElementsByClassName(pageName);
    for (var i = 0; i < pageElements.length; i++) {
        if (!this.enterException(pageElements[i])) {
            pageElements[i].style.display = "flex";
        }
    }
    this.previousPageName = pageName;

    this.onPageSwitch(previousPageName == null);
}
PageSwitcher.prototype.enterException = function (pageElement) {
    return false;
}
PageSwitcher.prototype.exitException = function (pageElement) {
    return false;
}


PageSwitcher.prototype.onPageSwitch = function (initial){

}