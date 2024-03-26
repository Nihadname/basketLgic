let allAddingBasketButtons = document.querySelectorAll(".save-btn");
let Basketcount = document.querySelector("#count");
// Query all buttons using the class .save-btn and assign them to a variable
// Iterate over each button and attach a click event listener
allAddingBasketButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        this.innerHTML = `<div class="loader"></div>`;

        setTimeout(() => {

            this.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 5px;">
              <img src="https://kontakt.az/static/version1710847247/frontend/Swissup/breeze-customized/az_Latn_AZ/images/icon/addto-in-cart.svg" alt="" style="vertical-align: middle;">
              <span>added to basket</span>
            </div>`;            this.style.color="black";
            let i=document.createElement("i");
            this.style.background="#f3f3f3";
        
        }, 2000); 
    });
});



allAddingBasketButtons.forEach(item => {
    item.addEventListener("click", function (ev) {
        ev.preventDefault();
        let productsArr = [];
        let productId = this.parentElement.getAttribute("data-id");
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]));
        } else {
            productsArr = JSON.parse(localStorage.getItem("basket"))
        }
        let existProduct = productsArr.find(p => p.id == productId);
        if (existProduct) {
            existProduct.count++;
        } else {

            let products = {
                id: productId,
                name: this.parentElement.firstElementChild.innerText,
                desc: this.previousElementSibling.previousElementSibling.previousElementSibling.innerText,
                price: this.previousElementSibling.innerText.split("$")[0],
                count: 1,
                image: this.parentElement.previousElementSibling.getAttribute("src")
            }
            productsArr.push(products);
        }
        localStorage.setItem("basket", JSON.stringify(productsArr));

        calculationBasketCount();

    })
})

function calculationBasketCount() {
    let basket = localStorage.getItem("basket");
    let length;
    if (basket) {
        length = JSON.parse(basket).length;
        Basketcount.innerText = length;
    }
};
calculationBasketCount();

function ToShowDiscountsInTheProducts(){
    let price=document.querySelectorAll(".price");
    
    price.forEach(item=>{
        let originalPriceText = item.textContent;
        item.style.textDecoration="line-through";
        let valueOfNewProduct = parseFloat(originalPriceText.split("$")[0]);
        let valueOfNewProductAfterDiscount = valueOfNewProduct * 0.75; 
        let newDiscountedPriceValue = document.createElement("p");
        newDiscountedPriceValue.classList.add("newPrice")
        newDiscountedPriceValue
        newDiscountedPriceValue.textContent =valueOfNewProductAfterDiscount.toFixed(2) + "$";
        item.after(newDiscountedPriceValue);
    })

}
ToShowDiscountsInTheProducts();

//input dan searche etme mentiqi
let inputForSearch = document.querySelector(".inputForSearch");
let Search = document.querySelector("#Search");
let productsArr2 = [];


    document.querySelectorAll(".card").forEach(function(card) {
        let product = {
            id: card.querySelector(".card-body").getAttribute("data-id"),
            name: card.querySelector(".card-title").innerText,
            desc: card.querySelector(".card-text").innerText,
            price: card.querySelector(".newPrice").innerText.split("$")[0],
            count: 1,
            image: card.querySelector("img").src
        };
        productsArr2.push(product);
    });

    localStorage.setItem("Allproducts", JSON.stringify(productsArr2));

Search.addEventListener("click", function (event) {
    event.preventDefault();

    let searchedValue = inputForSearch.value.toLowerCase(); 

    if (searchedValue.trim() == '') {
        displayResults([]);
        return; 
    }
    const Allproducts = JSON.parse(localStorage.getItem("Allproducts"));
    console.log(Allproducts);

    const filteredProducts = Allproducts.filter(products => products.name.toLowerCase().includes(searchedValue) || products.desc.toLowerCase().includes(searchedValue));
    console.log(filteredProducts);
    displayResults(filteredProducts);
});


function displayResults(results){
    const container = document.querySelector(".resultsOfTheSearchBar");
    container.innerHTML='';
    results.forEach(items=>{
        const productElement = document.createElement("div");
        productElement.innerHTML +=`<div class="card" style="width: 18rem;">
        <img src="${items.image}" class="card-img-top" alt="...">
        <div class="card-body" data-id="${items.id}">
          <h5 class="card-title">${items.name}</h5>
          <p class="card-text">${items.desc}</p>
          <p class="price">${items.price}$</p>
          <a  class="btn btn-primary">add  basket</a>
        </div>
      </div>`;
        container.appendChild(productElement);
    })

}

cardimg=document.querySelectorAll(".card-img-top");
cardimg.forEach(items=>{
    items.addEventListener("click",function(){
        window.location.href="TheProductIntroduce.html"
    })
})
