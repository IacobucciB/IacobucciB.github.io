let config = {
  minZoom: 7,
  maxZoom: 18,
}
const zoom = 12

const markers = [
  { lat: -34.922883, lng: -57.956317 },
  { lat: -54.801912, lng: -68.303216 },
]

const map = L.map("map", config).setView([markers[0].lat, markers[0].lng], zoom)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

const leafletMarkers = markers.map(({ lat, lng }) =>
  L.marker([lat, lng]).addTo(map)
)

leafletMarkers[1].bindPopup("<b>Otro Lorem Ipsum</b><br>Maecenas euismod cursus dignissim.")

let currentMarkerIndex = 0
const animateButton = document.getElementById("animateButton")
animateButton.addEventListener("click", () => {
  currentMarkerIndex = (currentMarkerIndex + 1) % markers.length
  const currentMarker = leafletMarkers[currentMarkerIndex]
  map.flyTo([currentMarker.getLatLng().lat, currentMarker.getLatLng().lng], 15)
  animateButton.textContent = `Ir a Marker ${currentMarkerIndex + 1}`
})
