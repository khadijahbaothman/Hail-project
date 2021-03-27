var ShoppingCart = (function($) {
  "use strict";
  
  // Cahce necesarry DOM Elements
  var productsEl = document.querySelector(".products"),
      cartEl =     document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");

    

  // Fake JSON data array here should be API call
  var products = [
    {
      id: 0,
      name: "حلويات ورد ",
      description: "في ورد للحلويات و الضيافة نعتبر أن أفراحكم هي أفراحنا لذلك نقدم لكم أفضل ما عندنا من أنواع الحلوبات العربية والغربية، و نتميز بالمستوى العالي من الحرفية",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/34173/preview_bwrnwcttlpkbqtjyhpppzrjha.jpg",
      price: 100
    },
    {
      id: 1,
      name: "حلويات القصور",
      description: "تنسيق الطاولات, خدمة توصيل, طاقم خدمة",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/34309/preview_xawxzdjmocmxcjjejfdztjanc.jpg",
      price: 50,
    },
    {
      id: 2,
      name: "حلويات سمر",
      description: "كيك الزفاف, بوفيه مفتوح, أطباق على الطاولات, مشروبات بانواعها, حلويات, ضيافة على الطاولات, مقبلات",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/33873/preview_qtbwmlqwwfwxmswrognzcmnrj.jpg",
      price: 30000
    }
  ],
  


  
    productsInCart = [];
      
      
  
  // Pretty much self explanatory function. NOTE: Here I have used template strings (ES6 Feature)



var generateProductList = function() {
    products.forEach(function(item) {
      var productEl = document.createElement("div");
      if(productEl.className = "product"){
            productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>الاسم : </span> ${item.name}</div>
                             <div class="product-description"><span>الوصف:</span> ${item.description}</div>
                             <div class="product-price"><span>السعر:</span> ${item.price} for one person</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button see-more">More Details</a>
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;

      }


      

     
    
                             
productsEl.appendChild(productEl);

    });
  }
  
  // Like one before and I have also used ES6 template strings
  var generateCartList = function() {
    
    cartEl.innerHTML = "";
    
    productsInCart.forEach(function(item) {
      var li = document.createElement("li");
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
    });
    
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons()
  }
  
  
  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }
  
  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
       var elId = el.dataset.id;
       addToCart(elId);
      }
    });
    
    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }
  
  // Adds new items or updates existing one in productsInCart array
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
  
  // This function checks if project is already in productsInCart array
  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price *  item.quantity);
    }, 0);
  }
  
  // This functon starts the whole application
  var init = function() {
    generateProductList();
    setupListeners();
  }
  
  // Exposes just init function to public, everything else is private
  return {
    init: init
  };
  
  // I have included jQuery although I haven't used it
})(jQuery);







ShoppingCart.init();