// winkelwagen.js
const winkelwagen = document.querySelector('.winkelwagen');
const winkelwagenLijst = document.querySelector('.winkelwagen-lijst');
const totaalSpan = document.querySelector('#totaal');
const bestelKnop = document.querySelector('#bestel-knop');

let producten = [];
let totaal = 0;

// voeg product toe aan winkelwagen
function voegProductToe(product) {
  const productHTML = `
    <div class="product">
      <h2>${product.naam}</h2>
      <p>€${product.prijs}</p>
    </div>
  `;
  winkelwagenLijst.innerHTML += productHTML;
  producten.push(product);
  berekenTotaal();
}

// bereken totaal
function berekenTotaal() {
  totaal = 0;
  producten.forEach(product => {
    totaal += product.prijs;
  });
  totaalSpan.textContent = `€${totaal.toFixed(2)}`;
}

// bestel knop
bestelKnop.addEventListener('click', () => {
    // check if user is logged in
    if (!isLoggedIn()) {
      alert('U moet eerst inloggen om uw bestelling uit te voeren!');
      return;
    }
  
    // toon modale dialoogvenster
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <h2>Bevestig uw bestelling</h2>
      <p>Weet u zeker dat u uw bestelling wilt plaatsen?</p>
      <button id="bevestig-knop">Doorgaan met bestelling</button>
      <button id="annuleer-knop">Annuleer bestelling</button>
    `;
    document.body.appendChild(modal);
  
    // add overlay element to prevent interactions with the page
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  
    // voeg event listeners toe aan knoppen
    const bevestigKnop = document.getElementById('bevestig-knop');
    const annuleerKnop = document.getElementById('annuleer-knop');
  
    bevestigKnop.addEventListener('click', () => {
      // voer bestelling uit
      console.log('Bestelling uitgevoerd!');
      modal.remove();
      overlay.remove();
    });
  
    annuleerKnop.addEventListener('click', () => {
      // annuleer bestelling
      console.log('Bestelling geannuleerd!');
      modal.remove();
      overlay.remove();
    });
  });
  
  // isLoggedIn function to check if user is logged in
  function isLoggedIn() {
    // assuming you have a way to store the login state, e.g. in localStorage
    return localStorage.getItem('loggedIn') === 'true';
  }