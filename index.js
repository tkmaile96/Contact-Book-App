
// refresh button
const refreshButton = document.getElementById('refresh').addEventListener("click", fetchContacts);

// Add contacts button
const addContacts = document.getElementById('addContacts').addEventListener("click", addContacts);

 //Add contacts function
function addContacts() {
    // create a new conatct
const newContact = {
    picture: {
             large:"https://picsum.photos/200/300",
               },
    name: { first: "New" , last: "User"},
    gender: "male",
    email: "newuser@example.com",
    phone: "123-456-7890",
}

};

contacts.push(newContact); // add the new contact to the contacts array
displayOutput(contacts); // display the updated contacts list

function fetchContacts() {
    fetch("https://randomuser.me/api/?results=2")
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