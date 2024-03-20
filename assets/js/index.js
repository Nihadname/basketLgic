let allAddingBasketButtons = document.querySelectorAll(".btn-primary");
let Basketcount = document.querySelector("#count");

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
                desc: this.previousElementSibling.previousElementSibling.innerText,
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

let inputForSearch = document.querySelector(".inputForSearch");
let Search=document.querySelector("#Search");
Search.addEventListener("click", function () {
    let searchedValue = this.value.toLowerCase();
    if(searchedValue.trim()==''){
        displayResults([])
    }
    const filteredProducts = JSON.parse(localStorage.getItem("basket")).filter(products => products.name.toLowerCase().includes(searchedValue) || 
    products.desc.toLowerCase().includes(searchedValue));
    displayResults(filteredProducts);

})

function displayResults(results){
    const container = document.querySelector(".resultsOfTheSearchBar");
    container.innerHTML='';
    results.forEach(items=>{
        const productElement = document.createElement("div");
        productElement.innerText = items.name + " - $" + items.price;
        container.appendChild(productElement);
    })

}