/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


var contenidoActual = null;

function mostrarContenido(id) {
  var contenido = document.getElementById(id);
  if (contenido === contenidoActual) {
    // El mismo contenido ya está visible, no hacer nada
    return;
  }

  if (contenidoActual) {
    // Ocultar el contenido actual
    contenidoActual.style.display = "none";
  }

  // Mostrar el nuevo contenido
  contenido.style.display = "block";

  // Actualizar la referencia al contenido actual
  contenidoActual = contenido;
}


function convertUnits() {
  const inputNumber = parseFloat(document.getElementById("inputNumber").value);
  console.log(inputNumber)
  const unitSelector = document.getElementById("unitSelector");
  const selectedUnit = unitSelector.options[unitSelector.selectedIndex].value;

  // Definir los factores de conversión para cada prefijo
  const conversionFactors = {
    yotta: 1e24,
    zetta: 1e21,
    exa: 1e18,
    peta: 1e15,
    tera: 1e12,
    giga: 1e9,
    mega: 1e6,
    kilo: 1e3,
    hecta: 1e2,
    deca: 1e1,
    base: 1,
    deci: 1e-1,
    centi: 1e-2,
    mili: 1e-3,
    micro: 1e-6,
    nano: 1e-9,
    pico: 1e-12,
    femta: 1e-15,
    atto: 1e-18,
    zepto: 1e-21,
    yotto: 1e-24
  };

  // Realizar las conversiones utilizando los factores de conversión
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h2>RESULT</h2>";

  for (const prefix in conversionFactors) {
    if (conversionFactors.hasOwnProperty(prefix)) {
      const convertedValue = inputNumber * conversionFactors[prefix];
      resultDiv.innerHTML += `<p>${inputNumber} ${selectedUnit} = ${convertedValue} ${prefix}</p>`;
    }
  }
}


function calculateDownloadTime() {
  const fileSize = parseFloat(document.getElementById("fileSize").value);
  const fileSizeUnit = document.getElementById("fileSizeUnit").value;
  const downloadSpeed = parseFloat(document.getElementById("downloadSpeed").value);
  const downloadSpeedUnit = document.getElementById("downloadSpeedUnit").value;

  // Convertir el tamaño del archivo a megabytes
  let fileSizeInMegabytes;
  switch (fileSizeUnit) {
    case "bytes":
      fileSizeInMegabytes = fileSize / 1024 / 1024;
      break;
    case "kilobytes":
      fileSizeInMegabytes = fileSize / 1024;
      break;
    case "megabytes":
      fileSizeInMegabytes = fileSize;
      break;
    case "gigabytes":
      fileSizeInMegabytes = fileSize * 1024;
      break;
    default:
      return;
  }

  // Convertir la velocidad de descarga a Mbps o MB/s
  let downloadSpeedInMbps;
  switch (downloadSpeedUnit) {
    case "bps":
      downloadSpeedInMbps = downloadSpeed / 1024 / 1024;
      break;
    case "Kbps":
      downloadSpeedInMbps = downloadSpeed / 1024;
      break;
    case "Mbps":
      downloadSpeedInMbps = downloadSpeed;
      break;
    case "MBps":
      downloadSpeedInMbps = downloadSpeed * 8;
      break;
    case "Gbps":
      downloadSpeedInMbps = downloadSpeed * 1024;
      break;
    default:
      return;
  }

  // Calcular el tiempo de descarga en segundos
  const downloadTimeInSeconds = fileSizeInMegabytes / downloadSpeedInMbps;

  // Convertir los segundos a días, horas y minutos
  const days = Math.floor(downloadTimeInSeconds / 86400);
  const remainingSeconds = downloadTimeInSeconds % 86400;
  const hours = Math.floor(remainingSeconds / 3600);
  const remainingMinutes = remainingSeconds % 3600;
  const minutes = Math.floor(remainingMinutes / 60);

  const result = `Tiempo estimado de descarga: ${days} días, ${hours} horas y ${minutes} minutos.`;
  document.getElementById("result").innerText = result;
}