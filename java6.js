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
      name: " زيل لتنظيم المناسبات ",
      description: "تصميم و تنسيق ديكور , كرت الدعوة , كيك الزفاف, تنظيم و تنسيق الكوشة, دي جي مع نظام صوت, ضيافة و توزيعات , تنسيق الزهور, زينة الطاولات, الطاولات و الكراسي, هندسة الإضاءة, العشاء",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/38024/preview_eqccjcjqdjbzkkvsdqikgttjc.jpg",
      price: 1000
    },
    {
      id: 1,
      name: " منسقة الحفلات هدى الباز",
      description: " نحن جاهزون لتغطية احتفالاتكم في جميع انحاء المملكة العربية السعودية، ان الوقت الذي تقضونه في التحضير لترتيب الصالات والطاولات والورود وكيفية استقبال الضيوف والموسيقا والعراضة هو وقت ثمين جدا لكم ومن الافضل ان تقضونه مع من تحبونه لأنهم الاولى بكم ودعوا هذه الامور على عاتقنا وسوف تعجبكم ترتيباتنا بكل تاكيد.",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/37043/preview_rtspxyymbiprwmaxvaqhfjhby.jpg",
      price: 2000,
    },
    {
      id: 2,
      name: " حفلاتكم ",
      description: "كل ما تحتاجه لسهرة مميزة وحفل متكامل من تنظيم وترتيب وتنسيق للقاعة أو لمكان إقامة الحفل بغض النظر عن نوعه",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/47758/preview_hfl-tkm_MEnJ6W6N.jpg",
      price: 3000
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
                             <div class="product-price"><span>السعر:</span> ${item.price}$</div>
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