let allAddingBasketButtons = document.querySelectorAll(".btn-primary");
let Basketcount=document.querySelector("#count");

allAddingBasketButtons.forEach(item => {
    item.addEventListener("click",function(ev){
        ev.preventDefault();
        let productsArr=[];
        let productId=this.parentElement.getAttribute("data-id");
        if(localStorage.getItem("basket")==null){
            localStorage.setItem("basket",JSON.stringify([]));
        }else{
            productsArr=JSON.parse(localStorage.getItem("basket"))
        }
        let existProduct=productsArr.find(p=>p.id==productId);
        if(existProduct){
            existProduct.count++;
        }else{ 
            let products={
            id:productId,
            name:this.parentElement.firstElementChild.innerText,
            desc:this.previousElementSibling.previousElementSibling.innerText,
            price:this.previousElementSibling.innerText,
            count:1
        }
        productsArr.push(products);
        }
        localStorage.setItem("basket",JSON.stringify(productsArr));

        calculationBasketCount();

    })
})

function calculationBasketCount(){
    let basket=localStorage.getItem("basket");
    let length;
    if(basket){
        length=JSON.parse(basket).length;
        Basketcount.innerText=length;
    }
};
calculationBasketCount();