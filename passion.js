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

const url = "https://tema7-64ef.restdb.io/rest/planter"
const key = "61fcfa4d3f215f310a37be8a"
let planter;

const options= {
  headers: {
      "x-apikey": key,
  },
};

document.addEventListener("DOMContentLoaded", start);
let filter = "alle";
//første funktion der kaldes efter dom er loaded
function start(){
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach(knap => knap.addEventListener("click", filtrerPlanter));
  hentdata();
}

//eventlistener knyttet til knapperne der vælger hvad for et filter der er aktivt
function filtrerPlanter(){
  filter = this.dataset.kategori; //Sæt variabel "filter" til værdien af data-kategori på den knap der er klikket på
  document.querySelector(".valgt").classList.remove("valgt") //fjern klassen valgt på den knap
  this.classList.add("valgt") //marker den knap der klikket på 
  vis(); // Kald funktionen vis() efter det nye filter er sat
  header.textContent = this.textContent;
}

async function hentdata() {
  const respons = await fetch(url, options);
  planter = await respons.json();
  vis();
}

function vis(){
  console.log("planter", planter)
  const container = document.querySelector("section");
  const temp = document.querySelector("template");
  container.textContent = ""; // Ryd container inden ny loop


  
  planter.forEach((plante) => {
    if (filter == plante.kategori || filter == "alle"){

      const klon = temp.cloneNode(true).content;
      klon.querySelector("h2").textContent = plante.navn;
      
      
      
      klon.querySelector("img").src = "billeder/" + plante.billed;
      //klon.querySelector("img").addEventListener("click", () => visDetaljer(plante));

      container.appendChild(klon);

    }

  });
  
}
hentdata();

