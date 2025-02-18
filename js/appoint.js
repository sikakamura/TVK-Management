function showPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

// Load stored data on page load
window.onload = function () {
    renderTable();
};

function addItem() {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    const quantity = document.getElementById('itemQuantity').value;
    const price = document.getElementById('itemPrice').value;

    if (!name || !description || !quantity || !price) {
        alert('Please fill in all fields.');
        return;
    }

    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push({ id: items.length + 1, name, description, quantity, price });
    localStorage.setItem('items', JSON.stringify(items));

    renderTable(); // Refresh the table

    // Clear form fields and close popup
    document.getElementById('itemName').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemPrice').value = '';

    closePopup();
}

function renderTable() {
    const tableBody = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous entries

    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach((item, index) => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
    });
}

function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));

    renderTable(); // Update table after deletion
}

function editItem(index) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    const item = items[index];

    // Populate input fields with existing data
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemQuantity').value = item.quantity;
    document.getElementById('itemPrice').value = item.price;

    // Remove the old item
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));

    showPopup();
    renderTable();
}
