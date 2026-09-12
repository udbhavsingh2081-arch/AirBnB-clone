// Check if coordinates are coming from show.ejs
console.log("Coordinates:", coordinates);
console.log("Location:", locationName);

// coordinates = [lng, lat] from MongoDB GeoJSON
const lng = coordinates[0];
const lat = coordinates[1];

// Initialize map
const map = L.map("map").setView([lat, lng], 13);

// OpenStreetMap tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);
//customIcon
const customIcon = L.divIcon({
    className: "custom-marker",
    html: '<i class="fa-solid fa-house"></i>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});
// Marker
L.marker([lat, lng],{   icon: customIcon})

    .addTo(map)
    .bindPopup(`
        <h4>${locationName}</h4>
         <p>Wellcome to Wanderlust!</p>
         `)
    .openPopup();