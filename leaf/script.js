let config = {
  minZoom: 7,
  maxZoom: 18,
}
const zoom = 12

const marker1Lat = -34.922883
const marker1Lng = -57.956317

const marker2Lat = -54.801912
const marker2Lng = -68.303216

const map = L.map("map", config).setView([marker1Lat, marker1Lng], zoom)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

const marker1 = L.marker([marker1Lat, marker1Lng]).addTo(map)
const marker2 = L.marker([marker2Lat, marker2Lng]).addTo(map)
marker2.bindPopup("<b>Otro Lorem Ipsum</b><br>Maecenas euismod cursus dignissim.")

let currentMarker = marker1
const animateButton = document.getElementById("animateButton")
animateButton.addEventListener("click", () => {
  if (currentMarker === marker1) {
    map.flyTo([marker2Lat, marker2Lng], 15)
    currentMarker = marker2
    animateButton.textContent = "Ir a Marker 1"
  } else {
    map.flyTo([marker1Lat, marker1Lng], zoom)
    currentMarker = marker1
    animateButton.textContent = "Ir a Marker 2"
  }
})
