// Configuración inicial del mapa
let config = {
  minZoom: 7,
  maxZoom: 18,
}
const zoom = 12

// Coordenadas de los marcadores
const marker1Lat = -34.922883
const marker1Lng = -57.956317

const marker2Lat = -54.801912
const marker2Lng = -68.303216

// Crear el mapa
const map = L.map("map", config).setView([marker1Lat, marker1Lng], zoom)

// Añadir capa de OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

// Crear los marcadores
const marker1 = L.marker([marker1Lat, marker1Lng]).addTo(map)
const marker2 = L.marker([marker2Lat, marker2Lng]).addTo(map)

// Función para animar el mapa desde el marcador 1 al marcador 2
function animateMap() {
  map.flyTo([marker2Lat, marker2Lng], 15) // Zoom al marcador 2
  marker2.bindPopup("<b>Otro Lorem Ipsum</b><br>Maecenas euismod cursus dignissim.").openPopup() // Abrir el pop-up del marcador 2
}

// Agregar evento al botón para animar el mapa
const animateButton = document.getElementById("animate-button")
animateButton.addEventListener("click", animateMap)
