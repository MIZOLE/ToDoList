const button = document.querySelector('.button')

//register a user
function register() {
    let users_stored = JSON.parse(localStorage.getItem("storing")) || [];

    let username_input = document.getElementById('username');
    let password_input = document.getElementById('password');
    let verify = document.getElementById('password2');

    let alert_message = document.getElementById("alert_message");

    // Check if passwords match
    if (password_input.value !== verify.value) {
        alert_message.innerHTML = "Passwords do not match";
        return;
    }

    // Check if any field is empty
    if (!username_input.value || !password_input.value || !verify.value) {
        alert_message.innerHTML = "All fields are required";
        return;
    }

    // Create user details object
    let user_details = {
        name: username_input.value,
        pass1: password_input.value,
        verifyPass: verify.value
    };

    // Push user details to the array and update local storage
    users_stored.push(user_details);
    localStorage.setItem("storing", JSON.stringify(users_stored));

    alert_message.innerHTML = "Registration successful";

    // Clear input fields
    username_input.value = '';
    password_input.value = '';
    verify.value = '';
}



//a user login
function login() {
    let details = JSON.parse(localStorage.getItem("storing")) || [];
    console.log(details)


    let username_input = document.getElementById('username').value
    let password_input = document.getElementById('password').value
    let foundUser = details.find(user => user.name === username_input && user.pass1 === password_input);

    if (foundUser) {

        window.location.replace("dashboard.html")
    } else {
        alert("User is not defined")
    }
}

//Create an Item
function createItem() {
    let item_storage = JSON.parse(localStorage.getItem("item")) || [];
    console.log(item_storage)

    let input1 = document.getElementById('title').value;
    let input2 = document.getElementById('description').value;
    let dates = document.getElementById('date').value;

    if (input1 && input2 && dates) {
        let newItem = {
            Title: input1,
            des: input2,
            date: dates
        };

        item_storage.push(newItem);
        console.log(item_storage);
        localStorage.setItem("item", JSON.stringify(item_storage));

        viewItems(); // Call the viewItems function to update the displayed items
    }
}


//View Item and edit Item
function viewItems() {
    let item_storage = JSON.parse(localStorage.getItem("item")) || [];

    let container = '';

    for (let i = 0; i < item_storage.length; i++) {
        container += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Title: ${item_storage[i].Title}</h5>
                    <div class="item">
                        <p>Description: ${item_storage[i].des}</p>
                    </div>
                    <p>Date: ${item_storage[i].date}</p>
                    <button class="edit-button" data-bs-toggle="modal" data-bs-target="#editmodal_${i}" data-index="${i}"><img src="./images/icons8-edit-24.png" alt="show" srcset="">
                    </button>
                    <button class="delete-button" data-index="${i}" onclick="del(this, ${i})"><img src="./images/icons8-delete-24.png" alt="show" srcset="">
                    </button> 
                    <button class="view-button" data-bs-toggle="modal" data-index="${i}" data-bs-target="#viewmodal_${i}"><img src="./Images/icons8-view-24.png" alt="show" srcset="">
                    </button> 

                    </div>
            </div>

            <!-- Edit modal -->
            <div class="modal" id="editmodal_${i}" >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLabel">Edit Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" id="title_${i}" placeholder="Title" value="${item_storage[i].Title}"><br>
                            <input type="text" id="description_${i}" placeholder="Description" value="${item_storage[i].des}"><br>
                            <input type="date" id="date_${i}" value="${item_storage[i].date}"><br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="saveChanges(${i})">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- view modal -->
            <div class="modal" id="viewmodal_${i}" >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLabel">View Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" readonly id="title_${i}" placeholder="Title" value="${item_storage[i].Title}"><br>
                            <input type="text" readonly id="description_${i}" placeholder="Description" value="${item_storage[i].des}"><br>
                            <input type="date" readonly id="date_${i}" value="${item_storage[i].date}"><br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel  </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('show_duties').innerHTML = container;
}

// Function to save changes to item data
function saveChanges(index) {
    let titleInput = document.getElementById(`title_${index}`).value;
    let descriptionInput = document.getElementById(`description_${index}`).value;
    let dateInput = document.getElementById(`date_${index}`).value;

    let item_storage = JSON.parse(localStorage.getItem("item")) || [];

    // Update item data
    item_storage[index].Title = titleInput;
    item_storage[index].des = descriptionInput;
    item_storage[index].date = dateInput;

    // Update local storage
    localStorage.setItem("item", JSON.stringify(item_storage));

    // Close the modal
    let modal = new bootstrap.Modal(document.getElementById(`editmodal_${index}`));
    modal.hide();

    // Refresh the view
    viewItems();
    window.location.reload()
}

// Call the function to display items and modals
    viewItems();


//store and splice deleted 
let arr = []
arr.splice

function del(e, indexToRemove){
    let item_storage = JSON.parse(localStorage.getItem("item"));
    item_storage.splice(indexToRemove, 1);//Remove an item form specific position
    localStorage.setItem("item", JSON.stringify(item_storage))

    console.log(item_storage)
    viewItems()
}


function displayItems(filteredItems) {

    const itemList = document.getElementById("items_list");

    
    itemList.innerHTML = "";

    for (const item of filteredItems) {
        const li = document.createElement("li");
        li.textContent = item.Title; // Replace "Title" with the property you want to display
        itemList.appendChild(li);
    }
}

function searchItems(query) {
    const item_storage = JSON.parse(localStorage.getItem("item")) || [];
    const filteredItems = item_storage.filter(item =>
        item.Title.toLowerCase().includes(query.toLowerCase()) // Replace "Title" with the property you want to search
    );
    displayItems(filteredItems);
}

let searchInput = document.getElementById("Search");

searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    searchItems(query);
});

// Initial display
searchItems(""); // To display all items initially
//Attach evet listeners to delete button using i to track them
// function eventToDeleteButtons(){
//     let deleteButtons = document.getElementsByClassName('delete-button');

//     for (let i = 0; i < deleteButtons.length; i++) {
//         const button = deleteButtons[i];

//         button.addEventListener("click", function () {
//             const indexToRemove = parseInt(this.getAttribute("data-index"));
//             deleteItem(indexToRemove)
//             //refreshthe view afte deleting a card
//         });
    
//     };
//     window.location.reload()
// }
//
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}