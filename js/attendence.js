// Function to update the clock
function updateClock() {
  const clockElement = document.querySelector('#clock'); 
  
  if (clockElement) {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString(); 
  } else {
   console.log(error); 
  }
}

// loadpage function
function loadpage(event, url) {
  event.preventDefault(); 
  console.log('Loading page:', url);
  window.location.href = url;
}


// Ensure the code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  updateClock();
  setInterval(updateClock, 1000);
});

// For drop down
const dropdownTrigger = document.getElementById('dropdownTrigger');
const dropdown = document.getElementById('dropdown');
const attendanceDetails = document.getElementById('attendanceDetails');

// Toggle dropdown visibility when clicking the trigger
dropdownTrigger.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Hide dropdown if clicking outside the trigger and dropdown
document.addEventListener('click', (e) => {
  if (!dropdownTrigger.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Handle clicking on a date in the dropdown
dropdown.addEventListener('click', (e) => {
  if (e.target.classList.contains('dropdown-item')) {
    const selectedDate = e.target.getAttribute('data-date');
    dropdownTrigger.textContent = selectedDate;
    dropdown.style.display = 'none';
    loadAttendance(selectedDate);
  }
});

function loadAttendance(date) {
  attendanceDetails.innerHTML = `<p class="loader">Loading attendance for ${date}...</p>`;
  attendanceDetails.classList.add('show');

  fetchAttendanceData(date)
    .then(staffData => {
      renderAttendanceTable(date, staffData);
    })
    .catch(() => {
      attendanceDetails.innerHTML = `<p>Error loading data.</p>`;
    });
}

// Render the attendance table with rows for each staff member
function renderAttendanceTable(date, staffData) {
  let html = `<h2>Attendance for ${date}</h2>`;
  staffData.forEach(staff => {
    const savedStatus = getAttendanceStatus(date, staff.id);
    html += `
      <div class="attendance-row" data-staff-id="${staff.id}">
        <div class="staff-name">${staff.name}</div>
        <div class="attendance-options">
          <span class="attendance-circle ${savedStatus === 'P' ? 'selected' : ''}" data-status="P">P</span>
          <span class="attendance-circle ${savedStatus === 'A' ? 'selected' : ''}" data-status="A">A</span>
          <span class="attendance-circle ${savedStatus === 'L' ? 'selected' : ''}" data-status="L">L</span>
        </div>
      </div>
    `;
  });
  attendanceDetails.innerHTML = html;
}

// Simulated dynamic data fetching function
function fetchAttendanceData(date) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const staffData = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Bob Johnson" },
        { id: 4, name: "Alice Brown" }
      ];
      resolve(staffData);
    }, 1000);
  });
}

// Handle clicking on attendance circles using event delegation
attendanceDetails.addEventListener('click', (e) => {
  if (e.target.classList.contains('attendance-circle')) {
    const circle = e.target;
    const optionsContainer = circle.parentElement;
    const row = circle.closest('.attendance-row');
    const staffId = row.getAttribute('data-staff-id');
    const date = dropdownTrigger.textContent;
    const status = circle.getAttribute('data-status');

    // Deselect all circles in the same row
    optionsContainer.querySelectorAll('.attendance-circle').forEach(c => c.classList.remove('selected'));

    // Mark the clicked circle as selected
    circle.classList.add('selected');

    // Save attendance status
    saveAttendanceStatus(date, staffId, status);
  }
});

// Save attendance to localStorage
function saveAttendanceStatus(date, staffId, status) {
  let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
  if (!attendanceData[date]) {
    attendanceData[date] = {};
  }
  attendanceData[date][staffId] = status;
  localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
}

// Retrieve saved attendance from localStorage
function getAttendanceStatus(date, staffId) {
  let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
  return attendanceData[date]?.[staffId] || null;
}

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