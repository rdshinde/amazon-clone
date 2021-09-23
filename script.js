// import { appendFile } from "fs";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

import { db } from "./firebase.js";

// import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "items"));

let items = [];
querySnapshot.forEach((doc) => {
  items.push({
    id: doc.id,
    image: doc.data().image,
    name: doc.data().name,
    make: doc.data().make,
    rating: doc.data().rating,
    price: doc.data().price,
  });
  // console.log(`${doc.id} => ${doc.data()}`);
});
generateItems(items);
// console.log(items);

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product","m-5");
    doc.innerHTML = `
    <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                      <!-- image -->
                      <img class="w-full h-full object-contain" src="${item.image}" alt="">
                  </div>
                  <div class="product-name text-gray-700 font-bold text-sm mt-2">
                    ${item.name}
                  </div>
                  <div class="product-make text-green-700">
                  ${item.make}
                  </div>
                  <div class="product-rating text-yellow-500 font-bold my-1">
                    ⭐️⭐️⭐️⭐️⭐️ ${item.rating}
                  </div>
                  <div class="product-price font-bold text-gray-700 text-lg">
                    ₹ ${item.price}
                  </div>
                  <!-- Add to cart button -->
                  <div class="add-to-cart h-8 w-28 bg-yellow-500 flex items-center justify-center rounded cursor-pointer text-md hover:bg-yellow-600 mt-1 text-white">Add to Cart</div>
    `
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add("add-to-cart","h-8","w-28","bg-yellow-500","flex","items-center","justify-center","rounded","cursor-pointer",)

  });
  document.querySelector(".main-section-products").innerHTML = itemsHTML;

}

// function addItems(){
//   const docRef =  addDoc(collection(db, "items"), {
//     image: "Ada",
//     name: "Lovelace",
//     price: 1815,
//     rating:5,
//     make:"appendFile"
//   });
//   console.log("Document written with ID: ", docRef.id);
// }
// addItems();
