var champ_container = document.getElementById('champ-container')
var skin_container = document.getElementById('skin-container')

var panel = document.querySelectorAll('.panel')

var fetchLegends = async () => {

    const url = `https://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion.json`
    const res = await fetch(url)
    const data = await res.json()


    const count = Object.keys(data.data).length
    console.log(count)

    const keys = Object.keys(data.data)

    for (let i = 0; i < keys.length; i++) {

        const key = keys[i];


        const champEl = document.createElement('div')

        champEl.classList.add('champ')

        const champInnerHTML = `
        <div class="img-container">
            <img src="https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/${key}.png" alt="${key}">
        </div>
        <div class="info">
        <button class="astext" id="skin" onClick="skinView('${key}')">${key}</button>
        </div>
        `

        champEl.innerHTML = champInnerHTML
        champ_container.appendChild(champEl)

    }




}

fetchLegends()

var skinView = async (name) => {

    if (skin_container.childNodes !== 0) {
        skin_container.textContent = ''
    }

    console.log(name)
    const url = `https://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion/${name}.json`
    const res = await fetch(url)
    const data = await res.json()


    for (let i = 0; i < Object.keys(data.data[name].skins).length; i++) {
        /*
                const skinEL = document.createElement('div')
                skinEL.setAttribute("class", "panel active")
        
                dir = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + name + '_' + data.data[name].skins[i].num + '.jpg'
                console.log(dir)
        
                skinEL.setAttribute("style", "background-image: url(" + dir + ")")
        
        
                skinEL.innerHTML = "<h3>" + data.data[name].skins[i].name + "</h3>";
        
                skin_container.appendChild(skinEL)
        */

        const skinEL = document.createElement('div')
        skinEL.setAttribute("class", "mySlides fade")
        dir = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + name + '_' + data.data[name].skins[i].num + '.jpg'
        var nombreChamp = data.data[name].skins[i].name
        if(data.data[name].skins[i].name == "default"){
            nombreChamp = name
        }
        
        const skinInnerHTML = `
        <div class="numbertext">${i} / ${Object.keys(data.data[name].skins).length}</div>
        <img src="${dir}" style="width:100%">
        <div class="text">${nombreChamp}</div>
        `

        skinEL.innerHTML = skinInnerHTML
        skin_container.appendChild(skinEL)

    }
    // Crear los elementos de enlace
    const prevLink = document.createElement('a');
    prevLink.classList.add('prev');
    prevLink.textContent = '\u00AB'; // Agregar el texto del enlace usando el código Unicode

    const nextLink = document.createElement('a');
    nextLink.classList.add('next');
    nextLink.textContent = '\u00BB'; // Agregar el texto del enlace usando el código Unicode

    // Agregar los manejadores de eventos
    prevLink.onclick = function () {
        plusSlides(-1);
    };

    nextLink.onclick = function () {
        plusSlides(1);
    };

    skin_container.appendChild(prevLink);
    skin_container.appendChild(nextLink);

    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }



}


