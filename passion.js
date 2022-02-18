/******************* BURGERMENU ******************/

const btn = document.querySelector("button");
const ul = document.querySelector("nav");

function toggleMenu() {
  ul.classList.toggle("shown");

  const menu = ul.classList.contains("shown");

  if (menu) {
    // hvis ul har klassen "shown"
    //btn.textContent = "Luk";
    btn.classList.add("open");
  } else {
    // hvis IKKE ul har klassen "shown"
    //btn.textContent = "Menu";
    btn.classList.remove("open");
  }
}

btn.addEventListener("click", toggleMenu);

/******************* BURGERMENU SLUT ******************/

const url = "https://tema7-64ef.restdb.io/rest/planter";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let plante;

const myHeaders = {
  "x-apikey": "600ec2fb1346a1524ff12de4"
}

document.addEventListener("DOMContentLoaded", loadJSON);
console.log("ID", id)

async function loadJSON(){
    const JSONData = await fetch (`https://tema7-64ef.restdb.io/rest/planter/${id}`, {
        headers: myHeaders
        
    });

    plante = await JSONData.json();

    console.log("Planter", plante);
    visPlante(plante);
}
