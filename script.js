const champ_container = document.getElementById('champ-container')
const skin_container = document.getElementById('skin-container')

panel = document.querySelectorAll('.panel')

const fetchLegends = async () => {

    const url = `http://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion.json`
    const res = await fetch(url)
    const data = await res.json()


    
    
    const count = Object.keys(data.data).length
    console.log(count)

    const keys = Object.keys(data.data)

    for (let i = 0; i < keys.length; i++) {

        const key = keys[i];
        //console.log(key, data[key]);

        const champEl = document.createElement('div')
        //console.log(champEl)
        champEl.classList.add('champ')

        const champInnerHTML = `
        <div class="img-container">
            <img src="http://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/${key}.png" alt="${key}">
        </div>
        <div class="info">
        <button class="astext" id="skin" onClick="skinView('${key}')">${key}</button>
        </div>
        `
        //console.log(champInnerHTML)

        champEl.innerHTML = champInnerHTML
        champ_container.appendChild(champEl)

    }

    


}

fetchLegends()

const skinView = async (name) => {

    if(skin_container.childNodes !== 0){
        skin_container.textContent = ''
    }

    console.log(name)
    const url = `http://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion/${name}.json`
    const res = await fetch(url)
    const data = await res.json()

    //console.log(Object.keys(data.data[name].skins))
    //console.log(data.data[name].skins)
/*
    for(let i = 0; i < Object.keys(data.data[name].skins).length; i++){
        console.log(data.data[name].skins[i].name)
        console.log(data.data[name].skins[i].num)

        const skinEL = document.createElement('div')
        //console.log(skinEL)
        skinEL.classList.add('skin')

        const skinInnerHTML = `
        <div class="panel active" style="background-image: url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${data.data[name].skins[i].num}.jpg')">
            <h3>${data.data[name].skins[i].name}</h3>
        </div>
        `
        console.log(skinInnerHTML)

        skinEL.innerHTML = skinInnerHTML
        skin_container.appendChild(skinEL)
        console.log(skin_container.appendChild(skinEL))
    }
*/
    for(let i = 0; i < Object.keys(data.data[name].skins).length; i++){

        const skinEL = document.createElement('div')
        skinEL.setAttribute("class","panel active")

        dir = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+ name + '_' + data.data[name].skins[i].num + '.jpg'
        //console.log(dir)
        skinEL.setAttribute("style", "background-image: url(" + dir + ")")
        
        
        skinEL.innerHTML = "<h3>"+data.data[name].skins[i].name+"</h3>";

        skin_container.appendChild(skinEL)
    }

    panel = document.querySelectorAll('.panel')
    console.log(panel)

    panel.forEach( panel => {
        panel.addEventListener('click', () =>{
            console.log("Panel Clicked")
            removeActiveClasses()
            panel.classList.add('active')
        })
    })
    
    function removeActiveClasses(){
        panel.forEach( panel => {
            panel.classList.remove('active')
        })
    }
}


