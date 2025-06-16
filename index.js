
let contacts = []; // array to store contact objects

// refresh button
const refreshButton = document.getElementById('refresh').addEventListener("click", fetchContacts);

// Add contacts button
const addContact = document.getElementById('addContact').addEventListener("click", addContacts);

 //Add contacts function
function addContact() {
    // create a new conatct
const newContact = {
    picture: {
             large:"https://picsum.photos/200/300",
               },
    name: { first: "New" , last: "User"},
    gender: "male",
    email: "newuser@example.com",
    phone: "123-456-7890",
};

contacts.push(newContact); // add the new contact to the contacts array
displayOutput(contacts); // display the updated contacts list

};



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

// The Display conatcts function
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
            <button onclick="editContact(${index})">Edit</button>
            <button onclick="deleteContact(${index})">Delete</button>
            <hr>
        `;
        table.appendChild(contactDiv);
    });
};

// The Edit Contact function
function editContact(index) {
    let newImage = document.createElement("img");
    let newName = prompt("Enter new first name:", contacts[index].name.first);
    let newGender = prompt ("Enter new gender:", contacts[index].gender);
    let newEmail = prompt ("Enter new email:", contacts[index].email);
    let newPhone = prompt ("Enter new phone:", contacts[index].phone);

    if (newImage) contacts[index].img = newImage;
    if (newName) contacts[index].name.first = newName;
    if (newGender) contacts[index].gender = newGender;
    if (newEmail) contacts[index].email = newEmail;
    if (newPhone) contacts[index].phone = newPhone;

    displayOutput(contacts);
}

// Delete Contact function
function deleteContact(index) {
    if(confirm("Are you sure you to delete this contact?")) {
        contacts.splice(index, 1);
        displayOutput(contacts); 
    }
};