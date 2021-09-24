
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

import { db } from "./firebase.js";



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
  
});
generateItems(items);


// Function for handling add to cart click event 
function addToCart(item){
  
  addItems(item);

}


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
                  
    `
    // Creating Add to Cart Child Element for item
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add("add-to-cart","h-8","w-28","bg-yellow-500","flex","items-center","justify-center","rounded","cursor-pointer","text-md","hover:bg-yellow-600","mt-1","text-white");
    addToCartEl.innerText = "Add to Cart";
  // Add to cart 'click' Event listener
    addToCartEl.addEventListener("click",function(){
      addToCart(item);
    });
    // Adding add to cart div to parent div
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-products").appendChild(doc);

  });
  

}
// Function to add items to cart-items in database
function addItems(item){
  updateCart(item);
  
}

function updateCart(item){
  let cartItem = doc(db, "cart-items", item.id);
  const docSnap = getDoc(cartItem);
  console.log(docSnap.exists());
    if(docSnap.exists()){
      updateDoc(cartItem, {
        quantity: increment(1)
      });
      console.log("Updated")
    }
    else{
      // const docRef =  addDoc(collection(db, "cart-items"), {
      //   id:item.id,
      //   image: item.image,
      //   make: item.make,
      //   name: item.name,
      //   rating:item.rating,
      //   price:item.price,
      //   quantity:1
      // });
      console.log("else");
    }
}