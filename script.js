let selectRaca = document.getElementById("raca");
let selectSubRaca = document.getElementById("subRaca");
let selectFonte = document.getElementById("fonte");
let pesquisarSubRaca = document.getElementById("pesquisarSubRaca");
let inputNome = document.getElementById("nome");
let nomeCachorro = document.getElementById("nomeCachorro");
let botaoEnviar = document.getElementById("enviar");
let limpar = document.getElementById("limpar");
let divImagem = document.getElementById("imagem");
let mensagem = document.getElementById("mensagem");

let preferenciasUsuario = JSON.parse(localStorage.getItem('atributos_dog')) || [];

carregarPreferencias();

fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then((data) => {
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
    let racaselecionada = y[x].text


    fetch(`https://dog.ceo/api/breed/${racaselecionada}/list`)
        .then(response => response.json())
        .then((data) => {
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
                optionValue.setAttribute("value", "Não há sub-raças");
                optionValue.innerHTML = "Não há Sub-Raças";
                selectSubRaca.appendChild(optionValue);
            }

        })
        .catch((error) => {
            console.warn(error);
        })
}

botaoEnviar.onclick = () => {

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

    if (subRacaSelecionada == 'Não há Sub-Raças') {
        fetch(`https://dog.ceo/api/breed/${racaselecionada}/images/random`)
            .then(response => response.json())
            .then((data) => {
                foto = data.message;
                divImagem.style.backgroundImage = `url('${foto}')`;
                pegaFonte(fonteSelecionada);
                setTimeout(() => { nomeCachorro.textContent = inputNome.value; }, 700);
                mensagem.style.display = "block";
                setTimeout(() => { mensagem.style.display = "none"; }, 1500);
                salvarPreferencias();
            })
            .catch(error => console.warn(error))
    }

    else {
        fetch(`https://dog.ceo/api/breed/${racaselecionada}/${subRacaSelecionada}/images/random`) // Imagem por raça e sub-raça
            .then(response => response.json())
            .then((data) => {
                foto = data.message;
                divImagem.style.backgroundImage = `url('${foto}')`;
                pegaFonte(fonteSelecionada);
                setTimeout(() => { nomeCachorro.textContent = inputNome.value; }, 700);
                mensagem.style.display = "block";
                setTimeout(() => { mensagem.style.display = "none"; }, 1500);
                salvarPreferencias();
            })
            .catch(error => console.warn(error))
    }

}

function pegaCor(){
    let corSelecionada = document.querySelector("input[name=cor]:checked")
    nomeCachorro.style = (`color: ${corSelecionada.id}`)
}

function pegaFonte(fonte){
    nomeCachorro.style.fontFamily = `${fonte}`;
}

function salvarPreferencias(){
    let hoje = new Date();
    let data = hoje.getDate() +'/'+ (hoje.getMonth()+1)+'/'+hoje.getFullYear();
    let hora = hoje.getHours() + ":" + hoje.getMinutes();

    let subRacaIndex = document.getElementById("subRaca").selectedIndex;
    let subRacaOpcao = document.getElementById("subRaca").options;
    let subRacaSelecionada = subRacaOpcao[subRacaIndex].text;
    
    let radioSelecionado = document.querySelector('input[name="cor"]:checked').value;

    preferenciasUsuario.push(
        {
            nome: inputNome.value,
            raca: selectRaca.value,
            subRaca: subRacaSelecionada,
            fonte: selectFonte.value,
            radio: radioSelecionado,
            dataCompleta:{
                data: data,
                hora: hora
            }
        }
    );

    localStorage.setItem("atributos_dog", JSON.stringify(preferenciasUsuario));
}

function limparCampos(){
    let radioSelecionado = document.querySelector('input[name="cor"]:checked').value;

    inputNome.value = '';
    selectRaca.value = '';
    selectSubRaca.options.length = 0;
    selectFonte.value = '';
    radioSelecionado = '';
    nomeCachorro.textContent = "";
    divImagem.style.backgroundImage = "url('')";
}

function carregarPreferencias(){    
    let dog = preferenciasUsuario.pop();
    inputNome.value = dog.nome;
    selectRaca.innerHTML = `<option>${dog.raca}</option>`;
    selectSubRaca.innerHTML = `<option>${dog.subRaca}</option>`;
    selectFonte.value = dog.fonte;
}