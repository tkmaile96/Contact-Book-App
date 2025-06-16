
function fetchContacts() {
    fetch("https://randomuser.me/api/?results=20")
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.data); // this is the array of users
        displayOutput(data.results);
    })
    .catch(function(error) {
        console.error("Fetch error:", error);
    });
}

function displayOutput(contacts) {
    let table = document.getElementById("table");
    table.innerHTML = "";

    contacts.forEach(function(contact) {
        let contactDiv = document.createElement("div");
        contactDiv.innerHTML = `
             <img src="${contact.picture.large}" width="50" height="50"> 
            <p><strong>${contact.name.first} ${contact.name.last}</strong></p>
            <p>Gender: ${contact.gender}</p>
            <p>Email: ${contact.email}</p>
            <p>Phone: ${contact.phone}</p>
            <hr>
        `;
        table.appendChild(contactDiv);
    });
}