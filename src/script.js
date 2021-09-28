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
// Function To get Items in Hot Deals
function getItems() {
  db.collection("iphones").onSnapshot((snapshot) => {
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
  let iconColor = "";
  let itemsHTML = "";
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "m-5", "relative");
    doc.innerHTML = `
    <div class="product-image w-48 h-52 bg-white rounded-xl p-4">
                      <!-- image -->
                      <img class="w-full h-full p-2 object-contain" src="${item.image}" alt="">
                  </div>
                  <div class="product-name text-gray-700 font-bold text-sm mt-2">
                    ${item.name}
                  </div>
                  <div class="product-make text-green-700">
                  ${item.make}
                  </div>
                  <div class="product-rating inline-block ml-auto rounded-2xl bg-green-500  text-white my-2 justify-around">
                    <h4 class="p-2 inline"> ${item.rating} ★ </h4>
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
      `text-gray-200`,
      "cursor-pointer",
      "hover:text-yellow-600"
    );
    addToWishlistEl.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;
    addToWishlistEl.addEventListener("click", function () {
      addToWishlist(item,addToWishlistEl);
      addToWishlistEl.style.color = "#f59e0b";
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
      messageHandler(`Item quantity incresed by one!`);
    } else {
      cartItem.set({
        image: item.image,
        name: item.name,
        make: item.make,
        rating: item.rating,
        price: item.price,
        quantity: 1,
      });
      messageHandler(`Item added to cart successfully!`);
    }
  });
}

// function to add items to wishlist in database

function addToWishlist(item,ele) {
  let wishlistItem = db.collection("wishlist-items").doc(item.id);
  wishlistItem.get().then(function (doc) {
    if (doc.exists) {
      messageHandler(`Item removed from wishlist successfully!`);
      ele.style.color = "#e5e7eb";
      wishlistItem.delete();
    } else {
      wishlistItem.set({
        image: item.image,
        name: item.name,
        make: item.make,
        rating: item.rating,
        price: item.price,
      });
      messageHandler(`Item added to wishlist successfully!`);
    }
  });
}

