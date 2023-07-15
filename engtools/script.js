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