//appel pour les nounours

fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((data) => {
    const card = document.querySelector("#produit");
    let cards = "";
    for (const product of data) {
      cards += `<div id="${product._id}">
                  <article>
                  <img class ="picture" src="${
                    product.imageUrl
                  }" alt="ours fait à la main"/> 
                  <h3>${product.name}</h3> 
                  <h4>prix: ${(product.price / 100)
                    .toFixed(2)
                    .replace(".", ",")}€</h4>
                  <button id="${
                    product._id
                  }" onclick ="createPanier(event)" ontype="button" class="addbookbutton"> selectionner </button>
                  </article>   
                </div>`;
    }
    console.log(cards);
    card.innerHTML = cards;

    //Ajout de la quantité des articles dans le panier
    let produitLocalStorage = JSON.parse(localStorage.getItem("productKey"));
    const reducer = (acc, currentValue) => acc + currentValue;
    if (produitLocalStorage === null) {
      document.querySelector("#basket_total_quantity").style.display = "none";
    } else {
      let totalQuantityCart = [];
      for (let q = 0; q < produitLocalStorage.length; q++) {
        let totalQuantityProduct = parseInt(produitLocalStorage[q].quantity);
        totalQuantityCart.push(totalQuantityProduct);
      }
      const totalQuantity = totalQuantityCart.reduce(reducer, 0);
      //Afficher le total
      document.querySelector("#basket_total_quantity").style.display = "flex";
      document.querySelector(
        "#basket_total_quantity"
      ).textContent = `${totalQuantity}`;
    }
  });
/***************************************partie pop-up******************************************************/
//-------------------------------------------------
//declaration de mes constantes (pop-up)

const produits = document.getElementById("produit");
const popup = document.getElementById("popup");
const popupDetail = document.getElementById("popupDetail");
const btnclose = document.getElementById("btnclose");

//fonction creation de la fenêtre pop-up
function createPanier(event) {
  popup.style.display = "inline-block";
}
//création de la fonction du pop-up(detail produit)

function createPanier(event) {
  let url = "http://localhost:3000/api/teddies/" + event.target.id;
  fetch("http://localhost:3000/api/teddies/" + event.target.id)
    .then((response) => response.json())
    .then((data) => {
      let produitDetail = data;
      let cards = "";
      var dd = "";
      for (i = 0; i < data.colors.length; i++) {
        dd += "<option>" + data.colors[i] + "</option>";
      }
      cards += `<div class="produit_carte">
                  <h2 class="popup_title">
                    Detail du produit
                      <span id="btnclose" onclick="closeModal()"> &times;</span>
                  </h2>
                  <article>
                    <img class="picture_detail" src="${data.imageUrl}" alt""/>
                    <h3>${data.name}</h3>
                    <h4>prix :${(data.price / 100)
                      .toFixed(2)
                      .replace(".", ",")}€</h4>
                    <h4>${data.description}<h4>
                      <div class="quantités">
                        <label for="nounoursNumbers">Quantité :</label>
                        <input id="nounoursNumbers" type="number" name="nounoursNum" value="1" min="1">
                      </div>
                      <div class="produits__color">
                        <label for="colorSelect">Couleur</label>
                        <select name="color" id="colorSelect">
                          ${dd}
                        </select>
                      </div>
                    <button onclick="ajoutmessageconfirm(event)" id="button_Panier" class="btn" >Ajouter au panier</button>
                  </article>
                </div>`;
      popup.innerHTML = cards;
      //fonction du boutton pour l'ajout au localStorage (données du nounours : prix , quantité, nom, image)
      let btn = document.getElementById("button_Panier");
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        let quantityProduct = document.getElementById("nounoursNumbers").value;
        let detailProduit = {
          name: data.name,
          id: data._id,
          price: data.price / 100,
          quantity: quantityProduct,
          image: data.imageUrl,
        };
        let produitLocalStorage = JSON.parse(
          localStorage.getItem("productKey")
        );
        let existeId = false;

        if (produitLocalStorage) {
          for (e = 0; e < produitLocalStorage.length; e++) {
            if (produitLocalStorage[e].id == detailProduit.id) {
              existeId = true;
            }
          }
        } else {
          produitLocalStorage = [];
        }
        if (existeId == false) {
          produitLocalStorage.push(detailProduit);
          localStorage.setItem(
            "productKey",
            JSON.stringify(produitLocalStorage)
          );
        } else {
          for (e = 0; e < produitLocalStorage.length; e++) {
            if (produitLocalStorage[e].id == detailProduit.id) {
              // console.log("Ce produit est déjà présent dans le panier");
              // alert("Ce produit est déjà présent dans le panier");
              let quantityOfProductInLocalStorage = parseInt(
                produitLocalStorage[e].quantity
              );
              let quantityOfProductInThisPage = parseInt(
                detailProduit.quantity
              );
              quantityOfProductInLocalStorage += quantityOfProductInThisPage;
              console.log(
                "Après ajout, il y a " +
                  quantityOfProductInLocalStorage +
                  "fois ce produit dans le local storage"
              );
              alert(
                "Après ajout, il y a " +
                  quantityOfProductInLocalStorage +
                  " fois ce produit au panier"
              );
              produitLocalStorage.splice(e, 1);
              detailProduit.quantity = quantityOfProductInLocalStorage;
              produitLocalStorage.push(detailProduit);
              localStorage.setItem(
                "productKey",
                JSON.stringify(produitLocalStorage)
              );
              break;
            }
          }
        }
        //calcul du prix total du panier
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
        alert("le montant de votre pannier est de " + totalPrice + "€");
        // Envoyer le total dans le local storage
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
      });
    });
  popup.style.display = "inline-block";
}

//------------fonction du boutton fermeture de mon pop-up-----------------

function closeModal() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}
