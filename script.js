let selectRaca = document.getElementById("raca");
let selectSubRaca = document.getElementById("subRaca");
let pesquisarSubRaca = document.getElementById("pesquisarSubRaca");
let nomeCachorro = document.querySelector("#nomeCachorro");

fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => { return response.json() })
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
        .then((response) => { return response.json() })
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
        .catch((error => {
            console.warn(error);
        }))
}
function pegacor() {
    let selecionado = document.querySelector("input[name=cor]:checked")
    nomeCachorro.style=(`color: ${selecionado.id}`)
}
