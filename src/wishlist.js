function getWishlistItems() {
  db.collection("wishlist-items").onSnapshot((snapshot) => {
    let wishlistItems = [];
    snapshot.docs.forEach((doc) => {
      wishlistItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    document.querySelector(".wishlist-items").innerHTML="";
    generateWishlistItems(wishlistItems);
  });
}

// Function for deleting item
function deleteWishlistItem(itemID) {
  messageHandler(`Item removed from wishlist successfully!`);
  db.collection("wishlist-items").doc(itemID).delete();
}

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
    //   window.location.reload()
      getWishlistItems();
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
        getWishlistItems();
        // window.location.replace("/cart.html");
      }, 2000);
    });
    // Adding add to cart div to parent div
    doc.appendChild(addToCartEl);
    doc.appendChild(addToWishlistEl);
    document.querySelector(".wishlist-items").appendChild(doc);
  });
}
getWishlistItems();