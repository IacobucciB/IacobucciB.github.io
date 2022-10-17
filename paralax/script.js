


const svgObject = document.getElementById('svg-object').contentDocument;
const svg = svgObject.getElementsByClassName("Argentina")
console.log(svg);
displayName("Argentina")

function displayName(name) {
    document.getElementById('country-name').firstChild.data = name;
}
