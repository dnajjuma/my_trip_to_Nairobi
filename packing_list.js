// Get references to HTML elements
const itemNameInput = document.getElementById('itemNameInput');
const imageInput = document.getElementById('imageInput');
const addItemBtn = document.getElementById('addItemBtn');
const packingList = document.getElementById('packingList');

// Event listener for adding a new item
addItemBtn.addEventListener('click', addItem);

// Function to add a new item
function addItem() {
    const itemName = itemNameInput.value.trim();
    if (itemName !== '') {
        const item = document.createElement('li');
        item.textContent = itemName;

        // Check if an image is uploaded
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageURL = event.target.result;
                const image = document.createElement('img');
                image.src = imageURL;
                item.appendChild(image);
                saveItems();
            };
            reader.readAsDataURL(file);
        }

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', editItem);
        item.appendChild(editButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteItem);
        item.appendChild(deleteButton);

        packingList.appendChild(item);
        itemNameInput.value = '';
    } else {
        alert('Please enter an item name!');
    }
}

// Function to delete an item
function deleteItem(event) {
    const item = event.target.parentElement;
    packingList.removeChild(item);
    saveItems();
}

// Function to edit an item
// Function to edit an item
function editItem(event) {
    const item = event.target.parentElement;
    const itemName = item.textContent.trim();

    // Remove delete and edit buttons temporarily
    const deleteButton = item.querySelector('.delete-btn');
    const editButton = item.querySelector('.edit-btn');
    item.removeChild(deleteButton);
    item.removeChild(editButton);

    const newItemName = prompt('Edit item:', itemName);
    if (newItemName !== null) {
        item.textContent = newItemName.trim();

        // Create new image input
        const newImageInput = document.createElement('input');
        newImageInput.type = 'file';
        newImageInput.accept = 'image/*';
        newImageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageURL = event.target.result;
                const image = document.createElement('img');
                image.src = imageURL;
                // Remove old image, if any
                const oldImage = item.querySelector('img');
                if (oldImage) {
                    item.removeChild(oldImage);
                }
                item.appendChild(image);
                saveItems();
            };
            reader.readAsDataURL(file);
        });
        item.appendChild(newImageInput);

        // Re-add edit button
        item.appendChild(editButton);

        // Re-add delete button
        item.appendChild(deleteButton);

        saveItems();
    } else {
        // If the user cancels editing, re-add delete and edit buttons
        item.appendChild(deleteButton);
        item.appendChild(editButton);
    }
}


// Function to save items to local storage
function saveItems() {
    const items = [];
    document.querySelectorAll('#packingList li').forEach(item => {
        const itemName = item.textContent.trim();
        const imageURL = item.querySelector('img') ? item.querySelector('img').src : '';
        items.push({ name: itemName, image: imageURL });
    });
    localStorage.setItem('packingItems', JSON.stringify(items));
}

// Function to load items from local storage
function loadItems() {
    const items = JSON.parse(localStorage.getItem('packingItems')) || [];
    items.forEach(itemData => {
        const item = document.createElement('li');
        item.textContent = itemData.name;
        if (itemData.image) {
            const image = document.createElement('img');
            image.src = itemData.image;
            item.appendChild(image);
        }

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', editItem);
        item.appendChild(editButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteItem);
        item.appendChild(deleteButton);

        packingList.appendChild(item);
    });
}

// Load items when the page is loaded
loadItems();
