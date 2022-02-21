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
const header = document.querySelector(".kategori")

const options= {
    headers: {
      "x-apikey": key,
  },
};    

document.addEventListener("DOMContentLoaded", start);
let filter = "alle";
//første funktion der kaldes efter dom er loaded
function start(){
  const filterKnapper = document.querySelectorAll("nav button"); //Vi laver en variabel der indeholder "nav button" fra dom
  filterKnapper.forEach(knap => knap.addEventListener("click", filtrerPlanter)); //vi bruger forEach metoden for at gentage funktionen for hvert element, og i dette tilfælde er det en click funktion 
  hentdata();//kald så async function hvor vi henter alt data
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
  const respons = await fetch(url, options);//Lav variabel "respons" hvor der await fetches, (starter/venter på en request som returner et promise), hvor vi i dette tilfælde venter på vores url const og options const
  planter = await respons.json();//variablen "planter" sættes lig med respons consten som vi awaiter, så den henter alt json fra databasen
  vis();//Kald derefter funktionen vis()
}


function vis(){
  console.log("Planter", planter)//vis nu "planter" i konsollen
  const container = document.querySelector("section");
  const temp = document.querySelector("template");
  container.textContent = ""; // Ryd container inden ny loop


    //vi looper planter og gentager funktion for hvert element
  planter.forEach((plante) => {
    console.log("kategori", plante.type) 
    //Lav if statement, filtrer efter plante.type, ellers alle, ellers, størrelse, ellers sværhedsgrad. 
    if (filter == plante.type || filter == "alle" || filter == plante.størrelse || filter == plante.sværhedsgrad){
    
        
      const klon = temp.cloneNode(true).content; //lav en const der hedder klon, hvor vi kloner det content der er i "temp"
      //Dernæst sætter vi vores indhold ind i de forskellige ting, såsom overskrifter og billeder, der står tomt i "temp"
     klon.querySelector("h2").textContent = plante.navn;



      klon.querySelector("img").src = "billeder/" + plante.billede;
      //for hver img, laves der en click eventlistener
      klon.querySelector("img").addEventListener("click", () => visDetaljer(plante));

      //Vi bruger appendChild til at sætte vores klon ind i "container"
      container.appendChild(klon);

    }

  });

}

//Vi laver function som viser detaljer fra det element (img) man har klikket på, i en ny side.
function visDetaljer (hvad) {

    //location.href bruges til at vise ny html side når man klikker på "img". Her bruger vi "id" fra databasen. Man ser dermed "id" oppe i URL'en.
  location.href = `plante-detalje.html?id=${hvad._id}`; 

}

hentdata();