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
     img.style.width="100px";
     img.style.height="100px";
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
     

// Add click event listeners to each span
increaseSpan.addEventListener("click",function(){
   
})
decreaseSpan.addEventListener("click", function(){
    
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
}


// Append the spans to the 'tdCount' cell
tdCount.appendChild(countWrapper);
     tr.append(tdImage,tdName,tdPrice,tdCount,TdRemove)
     let table=document.querySelector(".table");
     CalculateBaketTotalPrice()
     table.lastElementChild.append(tr);
     TdRemove.onclick=function(){
        let basket = getBasket();

       tr.remove();
       calculationBasketCount()
   removeItem(products.id); 
   //updateBasket(basket);
     }
});
function calculationBasketCount(){
    let basket=localStorage.getItem("basket");
    let length;
    if(basket){
        length=JSON.parse(basket).length;
        Basketcount.innerText=length;
    }
};
calculationBasketCount();
CalculateBaketTotalPrice()
