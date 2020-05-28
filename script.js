let selectRaca = document.getElementById("raca");
let selectSubRaca = document.getElementById("subRaca");
let pesquisarSubRaca = document.getElementById("pesquisarSubRaca");
let inputNome = document.getElementById("nome");
let nomeCachorro = document.getElementById("nomeCachorro");
let botaoEnviar = document.getElementById("enviar");
let divImagem = document.getElementById("imagem");
let mensagem = document.getElementById("mensagem");

fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        let dataRacas = data.message;
        Object.keys(dataRacas).forEach((raca) => {
            let optionValue = document.createElement("option");
            optionValue.setAttribute("value", raca);
            optionValue.textContent = raca;
            selectRaca.appendChild(optionValue);
            return optionValue
        })

    })
    .catch((error => {
        console.warn(error);
    }))

pesquisarSubRaca.onclick = () => {

    let x = document.getElementById("raca").selectedIndex;
    let y = document.getElementById("raca").options;
    console.log(y[x].text);
    let racaselecionada = y[x].text


    fetch(`https://dog.ceo/api/breed/${racaselecionada}/list`)
        .then(response => response.json() )
        .then((data) => {
            console.log(data.message);
            let dataSubRacas = data.message;

            selectSubRaca.innerHTML = ""

            if (typeof dataSubRacas != "undefined" && dataSubRacas != null && dataSubRacas.length != null && dataSubRacas.length > 0) {
                Object.keys(dataSubRacas).forEach((subRaca) => {
                    let optionValue = document.createElement("option");
                    optionValue.setAttribute("value", subRaca);
                    optionValue.innerHTML = dataSubRacas[subRaca];
                    selectSubRaca.appendChild(optionValue);
                })
            } else {
                let optionValue = document.createElement("option");
                optionValue.setAttribute("value", "vazio");
                optionValue.innerHTML = "Sub-Raça inexistente";
                selectSubRaca.appendChild(optionValue);
            }

        })
        .catch((error) => {
            console.warn(error);
        })
}

botaoEnviar.onclick = ()=>{

    let racaIndex = document.getElementById("raca").selectedIndex;
    let racaOpcao = document.getElementById("raca").options;

    let subRacaIndex = document.getElementById("subRaca").selectedIndex;
    let subRacaOpcao = document.getElementById("subRaca").options;

    let racaselecionada = racaOpcao[racaIndex].text;
    let subRacaSelecionada = subRacaOpcao[subRacaIndex].text;

    let fonteIndex = document.getElementById("fonte").selectedIndex;
    let fonteOpcao = document.getElementById("fonte").options;

    let fonteSelecionada = fonteOpcao[fonteIndex].text;

    let foto = "";

    console.log(racaOpcao[racaIndex].text);
    console.log(subRacaOpcao[subRacaIndex].text);

    if(subRacaSelecionada == 'Sub-Raça inexistente'){
        fetch(`https://dog.ceo/api/breed/${racaselecionada}/images/random`)
        .then(response => response.json())
        .then((data)=>{
            foto = data.message;
            divImagem.style.backgroundImage =`url('${foto}')`;
            pegaFonte(fonteSelecionada);
            setTimeout(()=> { nomeCachorro.textContent = inputNome.value; },700);
            mensagem.style.display = "block";
            setTimeout(() => { mensagem.style.display = "none"; }, 1500);
        })
        .catch(error => console.warn(error))
    }
    
    else{
        fetch(`https://dog.ceo/api/breed/${racaselecionada}/${subRacaSelecionada}/images/random`) // Imagem por raça e sub-raça
        .then(response => response.json())
        .then((data)=>{
            foto = data.message;
            divImagem.style.backgroundImage =`url('${foto}')`;
            pegaFonte(fonteSelecionada);
            setTimeout(()=> { nomeCachorro.textContent = inputNome.value; },700);
            mensagem.style.display = "block";
            setTimeout(() => { mensagem.style.display = "none"; }, 1500);
        })
        .catch(error=>console.warn(error))
    }

}

function pegaCor() {
    let corSelecionada = document.querySelector("input[name=cor]:checked")
    nomeCachorro.style=(`color: ${corSelecionada.id}`)
}

function pegaFonte(fonte){
    nomeCachorro.style.fontFamily = `${fonte}`;
    console.log(fonte);
}