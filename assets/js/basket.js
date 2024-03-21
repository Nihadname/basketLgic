function getBasket(){
    let basket=localStorage.getItem("basket");
    let products=[];
    if(basket){
        products=JSON.parse(basket);
    }
    return products;
}
let totalPrice=document.querySelector("#totalPrice");

function CalculateBaketTotalPrice(){
    let totalPriceBasket=0;
    let basket=getBasket();
    basket.forEach(products=>{
        totalPriceBasket+=products.count*products.price;
    })
    totalPrice.innerText="Total price is "+totalPriceBasket;

}
let Basketcount=document.querySelector("#count");

getBasket().forEach(products => {
    let tr=document.createElement("tr");
    let tdImage=document.createElement("td");
     let img=document.createElement("img");
     img.setAttribute("src",products.image);
     img.style.width="120px";
     img.style.height="120px";
     tdImage.appendChild(img);
     let tdName=document.createElement("td");
     tdName.innerText=products.name;
     let tdPrice=document.createElement("td");
     tdPrice.innerText=(products.count*products.price)+"$";
     let tdCount=document.createElement("td");
     let TdRemove=document.createElement("td");
     TdRemove.innerHTML=`<i class="fa-solid fa-trash"></i>`;
     let countWrapper = document.createElement("div");
     countWrapper.style.display = "flex";
     countWrapper.style.alignItems = "center";
     
     // Create the decrease and increase spans
     let decreaseSpan = document.createElement("span");
     decreaseSpan.style.margin="12px"
     decreaseSpan.innerHTML = '<i class="fa-solid fa-minus"></i>';
     let increaseSpan = document.createElement("span");
     increaseSpan.style.margin="12px"
     increaseSpan.innerHTML = '<i class="fa-solid fa-plus"></i>';
     
     // Span to display the count, you may adjust this part based on your actual code logic
     let countDisplay = document.createElement("span");
     countDisplay.innerText = products.count;
     
     // Append the decreaseSpan, countDisplay, and increaseSpan to the countWrapper
     countWrapper.appendChild(decreaseSpan);
     countWrapper.appendChild(countDisplay);
     countWrapper.appendChild(increaseSpan);

     
function updateProductsInBasket(productId,newValue){
    let basket=getBasket();
  let productIndex=  basket.findIndex(product => product.id === productId)
  if(productIndex!==-1){
basket[productIndex].count=newValue;
  }
  updateBasket(basket);
}
// Add click event listeners to each span
increaseSpan.addEventListener("click",function(){
 products.count+=1;
 countDisplay.innerText=products.count;
 tdPrice.innerText=(products.count*products.price)+"$";

 updateProductsInBasket(products.id,products.count);
 CalculateBaketTotalPrice();
 calculationBasketCount();
})
decreaseSpan.addEventListener("click", function(){
    if(products.count>0){
        products.count-=1;
        countDisplay.innerText=products.count;
        tdPrice.innerText=(products.count*products.price)+"$";

        updateProductsInBasket(products.id,products.count);
        CalculateBaketTotalPrice();
        calculationBasketCount();
        if(products.count==0){
            tr.remove();
            clearBasket();
            removeItem(products.id); 
        }
    }
})
//update it
function updateBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
    CalculateBaketTotalPrice();
    calculationBasketCount();
}

function removeItem(productId) {
    let basket = getBasket();
    basket = basket.filter(product => product.id !== productId);
    updateBasket(basket);
    updateAlertVisibility(); // Check and update alert visibility

}


// Append the spans to the 'tdCount' cell
tdCount.appendChild(countWrapper);
     tr.append(tdImage,tdName,tdPrice,tdCount,TdRemove)
     let table=document.querySelector(".table");
     table.classList.remove("d-none");
    
    CalculateBaketTotalPrice();
     
     table.lastElementChild.append(tr);
     TdRemove.onclick=function(){
        let basket = getBasket();

       tr.remove();
       calculationBasketCount();
   removeItem(products.id); 
   //updateBasket(basket);
     }
});
function calculationBasketCount(){
    let basket=localStorage.getItem("basket");
    let length=0;
    if(basket){
        length=JSON.parse(basket).length;
        Basketcount.innerText=length;
    }
    return length
};
calculationBasketCount();
CalculateBaketTotalPrice()
function clearBasket(){
    let table=document.querySelector(".table");

    localStorage.setItem("basket", JSON.stringify([]));
    table.lastElementChild.innerHTML=" "
    updateAlertVisibility(); // Check and update alert visibility

}
let deleteAll=document.querySelector("#deleteAll")
deleteAll.addEventListener("click", function(){
  
    if (confirm('Are you sure you want to clear the basket?')) {
        clearBasket();
        CalculateBaketTotalPrice();
        calculationBasketCount();

    }
})
function updateAlertVisibility() {
    let alertInZeroCondition = document.querySelector(".AlertInZeroCondition");
    let table=document.querySelector(".table");
    let totalPriceItself=document.querySelector(".totalPriceItself");

    let basket = getBasket();
    if (basket.length === 0) {
        // Show the alert if the basket is empty
        table.classList.add("d-none");
        alertInZeroCondition.classList.remove("d-none");

        totalPriceItself.classList.add("d-none");
    } else {
        table.classList.remove("d-none");
        totalPriceItself.classList.remove("d-none");
        // Hide the alert if the basket is not empty
        alertInZeroCondition.classList.add("d-none");
    }
}
updateAlertVisibility();
