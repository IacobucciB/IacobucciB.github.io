let config = {
  minZoom: 7,
  maxZoom: 18,
};

const zoom = 12;

const json = {
  "america_del_norte": {
    "universidad": "Universidad de Stanford",
    "latitud": 37.4275,
    "longitud": -122.1697,
    "descripcion": "La Universidad de Stanford es una institución líder en investigación y educación, reconocida mundialmente por su excelencia académica y sus contribuciones en diversos campos como la tecnología, la medicina y las ciencias sociales.",
    "imagen": "img/STA.jpg"
  },
  "america_del_sur": {
    "universidad": "Universidad de Buenos Aires",
    "latitud": -34.6037,
    "longitud": -58.3816,
    "descripcion": "La Universidad de Buenos Aires es la institución educativa más prestigiosa de América del Sur, destacada por su calidad académica y su amplia oferta de programas de estudio en diversas disciplinas.",
    "imagen": "img/UBA.jpg"
  },
  "europa": {
    "universidad": "Universidad de Oxford",
    "latitud": 51.754816,
    "longitud": -1.254367,
    "descripcion": "La Universidad de Oxford, una de las universidades más antiguas del mundo, es reconocida por su excelencia académica y su compromiso con la investigación de vanguardia en campos como las ciencias, las humanidades y las ciencias sociales.",
    "imagen": "img/OXF.jpg"
  },
  "africa": {
    "universidad": "Universidad de Ciudad del Cabo",
    "latitud": -33.9575,
    "longitud": 18.461,
    "descripcion": "La Universidad de Ciudad del Cabo es una institución de renombre en África, conocida por su excelencia en la educación superior, su enfoque en la diversidad cultural y su contribución a la investigación científica y social en el continente.",
    "imagen": "img/CAB.jpg"
  },
  "asia": {
    "universidad": "Universidad de Tokio",
    "latitud": 35.7131,
    "longitud": 139.7628,
    "descripcion": "La Universidad de Tokio es una de las principales instituciones educativas de Asia, reconocida por su excelencia en la enseñanza y la investigación en una amplia gama de disciplinas, incluyendo la ciencia, la tecnología, las humanidades y las ciencias sociales.",
    "imagen": "img/TOK.jpg"
  },
  "oceania": {
    "universidad": "Universidad de Melbourne",
    "latitud": -37.7964,
    "longitud": 144.9612,
    "descripcion": "La Universidad de Melbourne es una institución destacada en Oceanía, conocida por su calidad académica y su compromiso con la investigación innovadora. Ofrece una amplia variedad de programas de estudio y cuenta con reconocidos académicos en diversas áreas del conocimiento.",
    "imagen": "img/MEL.jpg"
  }
};

const markers = Object.values(json).map(({ latitud, longitud, descripcion }) => ({
  lat: latitud,
  lng: longitud,
  descripcion: descripcion
}));

const map = L.map("map", config).setView([markers[0].lat, markers[0].lng], zoom);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const leafletMarkers = markers.map(({ lat, lng, descripcion }) =>
  L.marker([lat, lng]).addTo(map).bindPopup(descripcion)
);

const card = document.querySelector('.card');

let currentMarkerIndex = 0;
const animateButton = document.getElementById("animateButton");
animateButton.addEventListener("click", () => {
  currentMarkerIndex = (currentMarkerIndex + 1) % markers.length;
  const currentMarker = leafletMarkers[currentMarkerIndex];
  map.flyTo([currentMarker.getLatLng().lat, currentMarker.getLatLng().lng], 15);
  const currentMarkerData = json[Object.keys(json)[currentMarkerIndex]];
  card.innerHTML = `
    <h2>${currentMarkerData.universidad}</h2>
    <img src="${currentMarkerData.imagen}" alt="Imagen de la universidad">
    <p>${currentMarkerData.descripcion}</p>
  `;
  animateButton.textContent = `SIG`;
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  currentMarkerIndex = (currentMarkerIndex - 1 + markers.length) % markers.length;
  const currentMarker = leafletMarkers[currentMarkerIndex];
  map.flyTo([currentMarker.getLatLng().lat, currentMarker.getLatLng().lng], 15);
  const currentMarkerData = json[Object.keys(json)[currentMarkerIndex]];
  card.innerHTML = `
    <h2>${currentMarkerData.universidad}</h2>
    <img src="${currentMarkerData.imagen}" alt="Imagen de la universidad">
    <p>${currentMarkerData.descripcion}</p>
  `;
  animateButton.textContent = `SIG`;
});
