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
    const gmail = document.getElementById('itemGmail').value;
    const phonenumber = document.getElementById('itemPhonenumber').value;
    const sex = document.getElementById('itemSex').value;
    const position = document.getElementById('itemPosition').value;

    if (!name || !gmail || !phonenumber || !sex || !position) {
        alert('Please fill in all fields.');
        return;
    }

    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push({ id: items.length + 1, name, gmail, phonenumber, sex , position });
    localStorage.setItem('items', JSON.stringify(items));

    renderTable(); // Refresh the table

    // Clear form fields and close popup
    document.getElementById('itemName').value = '';
    document.getElementById('itemGmail').value = '';
    document.getElementById('itemPhonenumber').value = '';
    document.getElementById('itemSex').value = '';
    document.getElementById('itemPosition').value = '';

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
            <td>${item.gmail}</td>
            <td>${item.phonenumber}</td>
            <td>${item.sex}</td>
            <td>${item.position}</td>
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
    document.getElementById('itemGmail').value = item.gmail;
    document.getElementById('itemPhonenumber').value = item.phonenumber;
    document.getElementById('itemSex').value = item.sex;
    document.getElementById('itemPosition').value = item.position;

    // Remove the old item
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));

    showPopup();
    renderTable();
}
