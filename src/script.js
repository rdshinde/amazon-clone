const searchItemsDiv = document.querySelector(".search-items");
const searchInput = document.querySelector(".search-item");

function getSearchItems(searchValue) {
  db.collection("items").onSnapshot((snapshot) => {
    let searchItems = [];
    snapshot.docs.forEach((doc) => {
      if (
        doc.data().name.toLowerCase().includes(searchValue.toLowerCase()) ||
        doc.data().make.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        searchItems.push({
          id: doc.id,
          ...doc.data(),
        });
        searchItemsDiv.innerHTML = "";
        generateSearchItems(searchItems);
      }
      // if(!doc.data().name.toLowerCase().includes(searchValue.toLowerCase()) ||
      //   doc.data().make.toLowerCase().includes(searchValue.toLowerCase())){
      //   searchItemsDiv.innerText = `

      //     Items not Found for search "${searchValue}" 😔.

      //   `;
      // }
    });
  });
}
function getWishlistItems() {
  db.collection("wishlist-items").onSnapshot((snapshot) => {
    let wishlistItems = [];
    snapshot.docs.forEach((doc) => {
      wishlistItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateWishlistItems(wishlistItems);
  });
}
// Event Listener for wishlist Icon
document.querySelector(".wishlist").addEventListener("click", function () {
  let wishlistShocaseDiv = document.querySelector(".wishlist-showcase");
  wishlistShocaseDiv.classList.toggle("hidden");
  getWishlistItems();
});

// Function for printing wishlist items
function generateWishlistItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "m-5", "relative");
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
                  
    `;
    // Creating wishlist child element for item
    let addToWishlistEl = document.createElement("div");
    addToWishlistEl.classList.add(
      "wishlist-icon",
      "absolute",
      "h-6",
      "w-6",
      "top-1",
      "right-1",
      "text-gray-200",
      "cursor-pointer",
      "hover:text-yellow-600"
    );
    addToWishlistEl.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    addToWishlistEl.addEventListener("click", function () {
      // addToWishlist(item);
      addToCartEl.classList.toggle("text-gery-200");
      addToCartEl.classList.add("text-yellow-500");
      deleteWishlistItem(item.id);
    });
    // Creating Add to Cart Child Element for item
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "add-to-cart",
      "h-8",
      "w-28",
      "bg-yellow-500",
      "flex",
      "items-center",
      "justify-center",
      "rounded",
      "cursor-pointer",
      "text-md",
      "hover:bg-yellow-600",
      "mt-1",
      "text-white"
    );
    addToCartEl.innerText = "Add to Cart";
    // Add to cart 'click' Event listener
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
      addToCartEl.innerText = "";
      addToCartEl.classList.add("button-loading");
      setTimeout(function () {
        addToCartEl.innerText = "Add to Cart";
        addToCartEl.classList.remove("button-loading");
        deleteWishlistItem(item.id);
      }, 2000);
    });
    // Adding add to cart div to parent div
    doc.appendChild(addToCartEl);
    doc.appendChild(addToWishlistEl);
    document.querySelector(".wishlist-items").appendChild(doc);
  });
}
// Function for printing search items
function generateSearchItems(searchItems) {
  let itemsHTML = "";
  searchItems.forEach((searchItem) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "m-5", "relative");
    doc.innerHTML = `
    <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                      <!-- image -->
                      <img class="w-full h-full object-contain" src="${searchItem.image}" alt="">
                  </div>
                  <div class="product-name text-gray-700 font-bold text-sm mt-2">
                    ${searchItem.name}
                  </div>
                  <div class="product-make text-green-700">
                  ${searchItem.make}
                  </div>
                  <div class="product-rating text-yellow-500 font-bold my-1">
                    ⭐️⭐️⭐️⭐️⭐️ ${searchItem.rating}
                  </div>
                  <div class="product-price font-bold text-gray-700 text-lg">
                    ₹ ${searchItem.price}
                  </div>
                  
    `;
    // Creating wishlist child element for item
    let addToWishlistEl = document.createElement("div");
    addToWishlistEl.classList.add(
      "wishlist-icon",
      "absolute",
      "h-6",
      "w-6",
      "top-1",
      "right-1",
      "text-gray-200",
      "cursor-pointer",
      "hover:text-yellow-600"
    );
    addToWishlistEl.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;
    addToWishlistEl.addEventListener("click", function () {
      addToWishlist(searchItem);
    });
    // Creating Add to Cart Child Element for searchItem
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "add-to-cart",
      "h-8",
      "w-28",
      "bg-yellow-500",
      "flex",
      "items-center",
      "justify-center",
      "rounded",
      "cursor-pointer",
      "text-md",
      "hover:bg-yellow-600",
      "mt-1",
      "text-white"
    );
    addToCartEl.innerText = "Add to Cart";
    // Add to cart 'click' Event listener
    addToCartEl.addEventListener("click", function () {
      addToCart(searchItem);
    });
    // Adding add to cart div to parent div
    doc.appendChild(addToCartEl);
    doc.appendChild(addToWishlistEl);
    searchItemsDiv.appendChild(doc);
  });
}

searchInput.addEventListener("change", (event) => {
  document.querySelector(".search-result-name").classList.remove("hidden");
  var searchValue = event.target.value;
  getSearchItems(searchValue);
});

// function getItems() {
//   db.collection("items")
//     .get()
//     .then((querySnapshot) => {
//       let items = [];
//       querySnapshot.forEach((doc) => {
//         // console.log(doc.data().name.includes("Series 7"));
//         items.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });
//       generateItems(items);
//     });
// }

function getItems() {
  db.collection("items").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateItems(items);
  });
}

getItems();

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "m-5", "relative");
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
                  
    `;
    // Creating wishlist child element for item
    let addToWishlistEl = document.createElement("div");
    addToWishlistEl.classList.add(
      "wishlist-icon",
      "absolute",
      "h-6",
      "w-6",
      "top-1",
      "right-1",
      "text-gray-200",
      "cursor-pointer",
      "hover:text-yellow-600"
    );
    addToWishlistEl.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;
    addToWishlistEl.addEventListener("click", function () {
      addToWishlist(item);
    });
    // Creating Add to Cart Child Element for item
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "add-to-cart",
      "h-8",
      "w-28",
      "bg-yellow-500",
      "flex",
      "items-center",
      "justify-center",
      "rounded",
      "cursor-pointer",
      "text-md",
      "hover:bg-yellow-600",
      "mt-1",
      "text-white"
    );
    addToCartEl.innerText = "Add to Cart";
    // Add to cart 'click' Event listener
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
      addToCartEl.innerText = "";
      addToCartEl.classList.add("button-loading");
      setTimeout(function () {
        addToCartEl.innerText = "Add to Cart";
        addToCartEl.classList.remove("button-loading");
      }, 2000);
    });
    // Adding add to cart div to parent div
    doc.appendChild(addToCartEl);
    doc.appendChild(addToWishlistEl);
    document.querySelector(".main-section-products").appendChild(doc);
  });
}

// Function to add items to cart-items in database
function addToCart(item) {
  let cartItem = db.collection("cart-items").doc(item.id);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItem.set({
        image: item.image,
        name: item.name,
        make: item.make,
        rating: item.rating,
        price: item.price,
        quantity: 1,
      });
    }
  });
}

// function to add items to wishlist in database

function addToWishlist(item) {
  let wishlistItem = db.collection("wishlist-items").doc(item.id);
  wishlistItem.get().then(function (doc) {
    if (doc.exists) {
      alert("Already present in wishlist! ");
    } else {
      wishlistItem.set({
        image: item.image,
        name: item.name,
        make: item.make,
        rating: item.rating,
        price: item.price,
      });
    }
  });
}
// Function For deleting wishlist Items
function deleteWishlistItem(itemID) {
  db.collection("wishlist-items").doc(itemID).delete();
}
