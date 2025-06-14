

let rootPath = "https://tkmaile96@gmail.com.itvarsity.org/api/ContactBook/";
let apiKey = chechApiKey();

function chechApiKey() {
    if (!localStorage.getItem("apikey")) {
        window.open("enter-api-key.html", "_self");
    }
    return localStorage.getItem("apikey");
}