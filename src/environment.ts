let API_URL;
if (__ENVIRONMENT == "local") {
    API_URL = "https://kontokorrent.marik.ch";
}
else if (__ENVIRONMENT == "gh-pages") {
    API_URL = "https://kontokorrent.marik.ch";
}
else if (__ENVIRONMENT == "gh-pagesv2") {
    API_URL = "https://kontokorrent.marik.ch";
}
else {
    API_URL = "https://kontokorrent.marik.ch";
}

export const environment = {
    API_URL: API_URL
};
