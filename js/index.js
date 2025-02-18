// For number counting
const counters = document.querySelectorAll('.counter'); // Select all counters
const duration = 1000; // Animation duration in milliseconds
let editIndex = -1; // Tracks which card is being edited (-1 means adding a new card)


counters.forEach(counterEl => {
    const targetValue = parseInt(counterEl.getAttribute('data-target')); // Get target value
    const increment = targetValue / (duration / 10); // Calculate increment based on duration
    let counterNumber = 0;

    function updateCounter() {
        counterNumber += increment;
        if (counterNumber >= targetValue) {
            counterEl.textContent = targetValue; 
            // counterEl.style.color = '#D92002';
        } else {
            counterEl.textContent = Math.floor(counterNumber); // Display whole numbers
            setTimeout(updateCounter, 10); // Smooth updates every 10ms
        }
    }

    updateCounter(); // Start counting animation for this counter
});

let cards = JSON.parse(localStorage.getItem('cards')) || []; // Load cards from local storage

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// Function to create a card HTML template
function createCard(profileImage, fullName, position, locationFrom, locationTo, date, id) {
    return `
        <div class="col-md-3 mb-4" id="card-${id}">
            <div class="card">
                <!-- First Section: Profile Image, Full Name, Position -->
                <div class="card-section-1">
                    <img src="${profileImage}" alt="Profile Image" class="card-profile-image">
                <div class="detail" >
                    <h5 class="card-full-name">${fullName}</h5>
                    <p class="card-position">${position}</p>
                    </div>
                    <ul><i class="fa-solid fa-circle"></i></ul>
                </div>

                <!-- Second Section: Location and Date -->
                <div class="card-section-2">
                    <div class="card-location">
                     <div class="card-date">
                     <div class="loca">
                      <ul><i class="fa-solid fa-location-dot"></i></ul>
                      <span class="card-location-from">${locationFrom}</span>
                      </div>
                     <div class="diate">
                     <ul><i class="fa-solid fa-calendar-days"></i></ul>
                        <span>${date}</span>
                     </div>
                    </div>
                    <div class="whereto">
                        <span class="card-location-from">${locationFrom}</span>
                        <i class="fas fa-arrow-right"></i>
                        <span class="card-location-to">${locationTo}</span>
                        </div>
                    </div>
                </div>

                <!-- Third Section: View Detail -->
                <div class="card-section-3">
                    <p class="card-view-detail">View detail</p>
                    <button onclick="editCard(${id})" class="btn btn-warning btn-sm"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteCard(${id})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
}

// Function to render all cards in the card container
function renderCards() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Clear existing cards
    cards.forEach((card, index) => {
        cardContainer.innerHTML += createCard(
            card.profileImage,
            card.fullName,
            card.position,
            card.locationFrom,
            card.locationTo,
            card.date,
            index // Card ID
        );
    });
}

// Save cards to local storage
function saveCards() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

// Handle form submission
document.getElementById('cardForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission and page reload

    // Get form values
    const profileImageInput = document.getElementById('profileImage');
    const fullName = document.getElementById('fullName').value;
    const position = document.getElementById('position').value;
    const locationFrom = document.getElementById('locationFrom').value;
    const locationTo = document.getElementById('locationTo').value;
    const date = document.getElementById('date').value;

    // Validate input
    if ((profileImageInput.files.length === 0 && editIndex === -1) || !fullName || !position || !locationFrom || !locationTo || !date) {
        alert("Please fill out all fields.");
        return;
    }

    // Handle profile image
    let profileImage = cards[editIndex]?.profileImage || ''; // Keep old image if no new file uploaded
    if (profileImageInput.files.length > 0) {
        profileImage = await toBase64(profileImageInput.files[0]);
    }

    // Update or add card
    if (editIndex > -1) {
        cards[editIndex] = { profileImage, fullName, position, locationFrom, locationTo, date };
    } else {
        cards.push({ profileImage, fullName, position, locationFrom, locationTo, date });
    }

    // Save and re-render cards
    saveCards();
    renderCards();

    // Reset form and state
    document.getElementById('cardForm').reset();
    editIndex = -1;
    document.querySelector('#cardForm button[type="submit"]').textContent = 'Add Card';

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('cardModal'));
    modal.hide();
});

// Edit a card
function editCard(id) {
    const card = cards[id];
    if (card) {
        document.getElementById('profileImage').value = '';
        document.getElementById('fullName').value = card.fullName;
        document.getElementById('position').value = card.position;
        document.getElementById('locationFrom').value = card.locationFrom;
        document.getElementById('locationTo').value = card.locationTo;
        document.getElementById('date').value = card.date;

        editIndex = id;

        const submitButton = document.querySelector('#cardForm button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Update Card';
        } else {
            console.error('Submit button not found.');
        }

        const modal = new bootstrap.Modal(document.getElementById('cardModal'));
        modal.show();
    }
}

// Delete a card
function deleteCard(id) {
    if (confirm("Are you sure you want to delete this card?")) {
        cards.splice(id, 1); // Remove card
        saveCards(); // Save updated cards
        renderCards(); // Re-render cards
    }
}

// Initial render
renderCards();

// For sidebar in mobile

const navbar = document.getElementById('navbar')
const openButton = document.getElementById('open-sidebar-button')
const media = window.matchMedia("(width < 768px")

function openSidebar (){
    navbar.classList.add('show')
    openButton.setAttribute('aria-expand','true')
    navbar.removeAttribute('inert')
}
function closeSidebar (){
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expand','false')
}