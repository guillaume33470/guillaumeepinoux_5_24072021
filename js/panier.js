// Tu récupêre les données de localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem("productKey"));
if (produitLocalStorage === null || produitLocalStorage == "") {
  console.log("il n'y a rien dans le panier");
} else {
  let fullPanier = [];
  for (produit = 0; produit < produitLocalStorage.length; produit++) {
    fullPanier += `<div >
                      <a>
                        <div class="produit_contain>
                          <span id="name">${produitLocalStorage[produit].name}
                          </span></br>
                          <img  id="productImage" src="${
                            produitLocalStorage[produit].image
                          }
                            " alt="photo produit">
                        <div >
                          <span id="reference">Réf : ${
                            produitLocalStorage[produit].id
                          }
                          </span>
                        </div>
                        <div id="price_trash">
                            <span id = "price">
                              ${produitLocalStorage[produit].quantity}
                              x 
                              ${produitLocalStorage[produit].price},00€
                            </span></br>
                            <span id="total_price_product">
                              ${
                                produitLocalStorage[produit].price *
                                produitLocalStorage[produit].quantity
                              },00€
                        </div>
                        <div id="panier_container_vide">
                          <i id ="${
                            produitLocalStorage[produit].id
                          }" class="fas fa-trash" onclick="cleararticle(event)"></i>
                        </div>
                      </a>               
                  </div>`;
    console.log(fullPanier);
    document.getElementById("panier_container").innerHTML = fullPanier;
  }
}
/********variables de mon formulaire à recupérer******/
let lastName = document.getElementById("lastname");
let firstName = document.getElementById("firstname");
let email = document.getElementById("email");
let adress = document.getElementById("adress");
let town = document.getElementById("city");
/******************************affichage de mon formulaire**************/
if (produitLocalStorage == 0) {
  console.log("merci de retourner selectionner votre nounours");
  const cardForm = document.querySelector("#formulaire");
  cardForm.style.opacity = "0";
} else {
  const cardForm = document.querySelector("#formulaire");
  let cards = "";
  cards += `<div>
                  <section class="formulaire_commande">
                    <h2>Passer la commande de vos articles</h2>
                      <form name="formContact" id="form" method="POST">
                        <div class="form-group">
                          <label for="lastname"> Nom de famille </label>
                          <input
                            type="text"
                            id="lastname"
                            name="nom"
                            class="form-control"
                            placeholder="Dupont"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="firstname"> Prénom </label>
                          <input
                            type="text"
                            id="firstname"
                            name="prenom"
                            class="form-control"
                            placeholder="Jean"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="email"> Adresse email </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="votre mail"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                          />
                        </div>
                        <div class="form-group">
                          <label for="adress"> Adresse postale et de facturation </label>
                          <input
                            type="text"
                            id="adress"
                            name="adresse"
                            class="form-control"
                            placeholder="Ex: 32, avenue Georges Brassens"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="city"> Ville </label>
                          <input
                            type="text"
                            id="city"
                            name="ville"
                            class="form-control"
                            placeholder="Ex: Bordeaux"
                            required
                          />
                        </div>
                        <!--formulaire choix paiement-->
                        <div class="form-group-card">
                          <label> Choix du moyen de paiement </label>
                        </div>
                        <div class="carte">
                          <input
                            type="radio"
                            class="paiement"
                            name="identifieur"
                            value="Visa"
                          />
                          <i class="fab fa-cc-visa fa-2x"></i>
                          <input
                            type="radio"
                            class="paiement"
                            name="identifieur"
                            value="Mastercard"
                          />
                          <i class="fab fa-cc-mastercard fa-2x"></i>
                          <input
                            type="radio"
                            class="paiement"
                            name="identifieur"
                            value="Paypal"
                          />
                          <i class="fab fa-cc-paypal fa-2x"></i>
                        </div>
                        <button onclick="validation_commande(event)" id="confirme_commande" type="submit" name="commander">
                          Commander
                        </button>
                      </form>
                  </section>
                </div>`;

  console.log(cards);
  cardForm.innerHTML = cards;
}

/********fonction total panier********/

let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
if (totalPrice == null) {
  console.log("merci de retourner selectionner votre nounours");
  const cardForm = document.querySelector("#formulaire");
  cardForm.style.opacity = "0";
} else {
  let fullTotal = "";
  fullTotal += `<div >
                        <h2>total:${totalPrice}€</h2>
                </div>`;
  document.getElementById("total_price").innerHTML = fullTotal;
}

/******function clear article**********/

const viderArticleBtn = document.getElementsByClassName(".fas fa-trash");
viderArticleBtn.addEventListener("click", cleararticle);

function cleararticle(event) {
  let produitLocalStorage = JSON.parse(localStorage.getItem("productKey"));
  produitLocalStorage = produitLocalStorage.filter(
    (el) => el.id !== event.target.id
  );
  localStorage.setItem("productKey", JSON.stringify(produitLocalStorage));
  let totalPriceCart = [];
  for (let p = 0; p < produitLocalStorage.length; p++) {
    let totalPriceProduct =
      produitLocalStorage[p].price * produitLocalStorage[p].quantity;
    totalPriceCart.push(totalPriceProduct);
  }
  let totalPrice = 0;
  for (let e = 0; e < totalPriceCart.length; e++) {
    totalPrice += totalPriceCart[e];
  }
  /******Envoyer le total dans le local storage******/
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  window.location.href = "panier.html";
}

/******function clear pannier********/

function clearAll(event) {
  localStorage.removeItem("productKey");
  localStorage.removeItem("totalPrice");
  window.location.href = "panier.html";
}
/******function clear pannier********/
const viderpanierBtn = document.getElementsById("btn_vide_panier");
viderpanierBtn.addEventListener("click", clearAll);

function clearAll(event) {
  localStorage.removeItem("productKey");
  localStorage.removeItem("totalPrice");
  window.location.href = "panier.html";
}
