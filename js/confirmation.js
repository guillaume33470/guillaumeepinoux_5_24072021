let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
let Id = localStorage.getItem("idresponse");

document.querySelector("#orderCommande").textContent = `${Id} `;

document.querySelector("#TotalPriceConfirm").textContent = `${totalPrice}€`;

function deleteKey(key) {
  localStorage.removeItem(key);
}

deleteKey("totalPrice");
deleteKey("productKey");
deleteKey("idresponse");
