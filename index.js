const modal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");
const contactForm = document.getElementById("contactForm");
const modalTitle = document.getElementById("title");
let contacts = []; // array to store contact objects

// ---------- Storage Helpers ---------- //
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
    const saved = localStorage.getItem("contacts");
    if (saved) {
        contacts = JSON.parse(saved);
        displayOutput(contacts);
    } else {
        fetchContacts(); // if no saved contacts, fetch from API
    }
}

// ---------- Event Listeners ---------- //
document.getElementById('refresh').addEventListener("click", fetchContacts);
document.getElementById('addContact').addEventListener("click", function () {
    showModal("Add Contact");
});

// ---------- Modal Logic ---------- //
closeModal.onclick = function () {
    modal.style.display = "none";
    contactForm.reset();
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        contactForm.reset();
    }
};

function showModal(mode, index = null) {
    modal.style.display = "block";
    modalTitle.textContent = mode;

    // Reset the form before any action
    contactForm.reset();
    document.getElementById("contactIndex").value = "";

    if (mode === "Edit Contact") {
        const contact = contacts[index];
        document.getElementById("contactIndex").value = index;
        document.getElementById("firstName").value = contact.name.first;
        document.getElementById("email").value = contact.email;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("gender").value = contact.gender;
        document.getElementById("imageUrl").value = contact.picture.large;
    }
}

// ---------- Form Submit ---------- //
contactForm.onsubmit = function (e) {
    e.preventDefault();

    const index = document.getElementById("contactIndex").value;
    const contactData = {
        picture: {
            large: document.getElementById("imageUrl").value || "https://picsum.photos/200"
        },
        name: {
            first: document.getElementById("firstName").value,
           
        },
        gender: document.getElementById("gender").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    };

    if (index === "") {
        contacts.push(contactData);
    } else {
        contacts[index] = contactData;
    }

    saveContacts();
    displayOutput(contacts);
    modal.style.display = "none";
    contactForm.reset();
};

// ---------- Fetch from API ---------- //
function fetchContacts() {
    fetch("https://randomuser.me/api/?results=2")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            contacts = data.results;
            displayOutput(contacts);
            saveContacts();
        })
        .catch(function (error) {
            console.error("Fetch error:", error);
        });
}

// ---------- Display Contacts ---------- //
function displayOutput(contacts) {
    let table = document.getElementById("table");
    table.innerHTML = "";

    contacts.forEach(function (contact, index) {
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
}

// ---------- Edit Contact ---------- //
function editContact(index) {
    showModal("Edit Contact", index);
}

// ---------- Delete Contact ---------- //
function deleteContact(index) {
    if (confirm("Are you sure you want to delete this contact?")) {
        contacts.splice(index, 1);
        displayOutput(contacts);
        saveContacts();
    }
}

// ---------- Load Contacts on Page Load ---------- //
loadContacts();
