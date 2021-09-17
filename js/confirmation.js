let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
let Id = localStorage.getItem("idresponse");
let contact = JSON.parse(localStorage.getItem("contact"));
console.log(contact.firstName);

document.querySelector("#orderCommande").textContent = `${Id} `;
console.log(Id);

document.querySelector("#TotalPriceConfirm").textContent = `${totalPrice}€`;
console.log(totalPrice);

document.querySelector(
  "#recapLivraisonAdresse"
).textContent = `${contact.firstName}  
                 ${contact.lastName}
                 ${contact.address}
                 ${contact.city}`;

function deleteKey(key) {
  localStorage.removeItem(key);
}

deleteKey("totalPrice");
deleteKey("productKey");
deleteKey("idresponse");
deleteKey("contact");
