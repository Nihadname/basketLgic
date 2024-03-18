function getBasket(){
    let basket=localStorage.getItem("basket");
    let products=[];
    if(basket){
        products=JSON.parse(basket);
    }
    return products;
}
let Basketcount=document.querySelector("#count");

let totalPrice=document.querySelector("#totalPrice");
let totalPriceBasket=0;
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
     tdCount.innerText=products.count;
     let TdRemove=document.createElement("td");
     TdRemove.innerHTML=`<i class="fa-solid fa-trash"></i>`;
     tr.append(tdImage,tdName,tdPrice,tdCount,TdRemove)
     let table=document.querySelector(".table");
     table.lastElementChild.append(tr);
     totalPriceBasket+=products.count*products.price;
     TdRemove.onclick=function(){
        tr.remove();
     }
});
totalPrice.innerText=totalPriceBasket
function calculationBasketCount(){
    let basket=localStorage.getItem("basket");
    let length;
    if(basket){
        length=JSON.parse(basket).length;
        Basketcount.innerText=length;
    }
};
calculationBasketCount();