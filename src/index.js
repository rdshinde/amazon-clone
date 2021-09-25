const dropdownArrow = document.querySelector(".category-dropdown-arrow");

const dropDownList = document.querySelector(".category-dropdown");
const overlayDiv = document.querySelector(".overlay");


dropdownArrow.addEventListener("click",function(){
    if(dropDownList.classList.contains("hidden")){
        dropDownList.classList.remove("hidden");
        overlayDiv.classList.remove("hidden");
    }
    else{
        dropDownList.classList.add("hidden");
        overlayDiv.classList.add("hidden");
    }
})

overlayDiv.addEventListener("click",function(){
    if(overlayDiv.classList.contains("hidden")){
        overlayDiv.classList.reomove("hidden");
        dropDownList.classList.remove("hidden");
    }
    else{
        dropDownList.classList.add("hidden");
        overlayDiv.classList.add("hidden");
    }
})
