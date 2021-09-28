function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot)=>{
        let cartItems = []
        snapshot.docs.forEach((doc)=>{
            cartItems.push({
                id:doc.id,
                ...doc.data()
            });
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
}

// Function to handle the total cost
function getTotalCost(cartItems){
    let totalCost = 0;
    cartItems.forEach((cartItem)=>{
        totalCost += cartItem.price * cartItem.quantity
    })
    document.querySelector(".total-cost-number").innerText = "₹ "+totalCost;

}

// Function for decrease count
function decreaseCount(itemID){
    let cartItem = db.collection("cart-items").doc(itemID);
    cartItem.get().then(function(doc){
        if(doc.exists){
            if(doc.data().quantity > 1){
                cartItem.update({
                    quantity : doc.data().quantity - 1
                })
            }
        }
    })
}
// Function for increase count
function increaseCount(itemID){
    let cartItem = db.collection("cart-items").doc(itemID);
    cartItem.get().then(function(doc){
        if(doc.exists){
            if(doc.data().quantity > 0){
                cartItem.update({
                    quantity : doc.data().quantity + 1
                })
            }
        }
    })
}
// Function for deleting item
function deleteItem(itemID){
    messageHandler(`Item removed from cart successfully!`);
    db.collection("cart-items").doc(itemID).delete();
}

function generateCartItems(cartItems){
    let itemsHTML = "";
    cartItems.forEach((cartItem)=>{
        itemsHTML += `<div
              class="cart-item flex items-center pb-4 border-b border-gray-100"
            >
              <div
                class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg mt-5"
              >
                <!-- Image -->
                <img
                  class="w-full h-full object-contain"
                  src="${cartItem.image}"
                  alt=""
                />
              </div>
              <div class="cart-item-details flex-grow">
                <!-- item details -->
                <div class="cart-item-title font-bold text-sm text-gray-600">
                  ${cartItem.name}
                </div>
                <div class="cart-item-brand font-bold text-sm text-gray-400">
                  ${cartItem.make}
                </div>
              </div>
              <div class="cart-item-counter w-48 flex items-center">
                <!-- counter -->
                <div
                data-id="${cartItem.id}"
                  class="
                    
                    cart-item-decrease
                    cursor-pointer
                    text-gray-400
                    bg-gray-100
                    rounded
                    h-6
                    w-6
                    items-center
                    justify-center
                    flex
                    hover:bg-gray-200
                    mr-2
                  "
                >
                  <i class="fa fa-chevron-left fa-xs" aria-hidden="true"></i>
                </div>
                <h4 class="text-gray-400">x${cartItem.quantity}</h4>
                <div
                data-id="${cartItem.id}"
                  class="
                    cart-item-increase
                    cursor-pointer
                    text-gray-400
                    bg-gray-100
                    rounded
                    h-6
                    w-6
                    items-center
                    justify-center
                    flex
                    hover:bg-gray-200
                    ml-2
                  "
                >
                  <i class="fa fa-chevron-right fa-xs" aria-hidden="true"></i>
                </div>
              </div>
              <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                <!-- price -->
                ₹ ${cartItem.price * cartItem.quantity}
              </div>
              <div
              data-id="${cartItem.id}"
                class="
                  cart-item-delete
                  w-10
                  font-bold
                  text-gray-300
                  cursor-pointer
                  hover:text-gray-400
                "
              >
                <!-- delete item -->
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
            </div>`
        
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners(){
    const decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    const increaseButtons = document.querySelectorAll(".cart-item-increase");

    const deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button)=>{
        button.addEventListener("click",function(){
            decreaseCount(button.dataset.id);
        })
    })
    increaseButtons.forEach((button)=>{
        button.addEventListener("click",function(){
            increaseCount(button.dataset.id);
        })
    })

    deleteButtons.forEach((button)=>{
        button.addEventListener("click",function(){
            deleteItem(button.dataset.id);
        })
    })
}


getCartItems();