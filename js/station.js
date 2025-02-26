// Initialize the map at the desired coordinates and zoom level
var map = L.map('map').setView([11.576178258252943, 104.91604895404149], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add a marker at the initial location
var marker = L.marker([11.576178258252943, 104.91604895404149]).addTo(map);

// Draw a circle around the marker; adjust radius as desired (e.g., 200 meters)
var circle = L.circle([11.576178258252943, 104.91604895404149], {
    color: 'blue',       // outline color
    fillColor: '#30f',   // fill color
    fillOpacity: 0.2,    // fill transparency
    radius: 200          // radius in meters
}).addTo(map);

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