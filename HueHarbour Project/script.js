const products = [
    {image: "assets/1.jpg", name: "Irises - Vincent Van Gogh" , price: 1099},
    {image: "assets/2.jpg", name: "Bridge at Giverny - Monet European Tapestry " , price: 1299},
    {image: "assets/3.jpg", name: "Woman with a Parasol - Claude Monet" , price: 2499},
    {image: "assets/4.jpg", name: "Almond Blossoms - Vincent Van Gogh" , price: 1399},
    {image: "assets/5.jpg", name: "The Scream - Edvard Munch" , price: 2799},
    {image: "assets/6.jpg", name: "The Persistence of Memory - Salvador Dali" , price: 2099},
    {image: "assets/7.jpg", name: "Starry Night - Vincent Van Gogh" , price: 1999},
    {image: "assets/9.jpg", name: "Cafe Terrace at Night - Vincent Van Gogh" , price: 1799},
    {image: "assets/10.jpg", name: "Wintry Street Scene in Copenhagen - Paul Gustav Fischer " , price: 1699},
    {image: "assets/11.jpg", name: "Water Lilies - Claude Monet" , price: 1499},
    {image: "assets/12.jpg", name: "Bedroom in Aries - Vincent Van Gogh " , price: 1999},
    {image: "assets/14.jpg", name: "Piano Painting - Willow Bader " , price: 1399},
];

let cartItems = [];


const buyPage = document.getElementById('buy-page');
const buyGrid = document.getElementById('buy-grid');


const cartPage = document.getElementById('cart-page');
const cartItemsContainer = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');


function showPage(pageToShow) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page === pageToShow) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    });
}

function updateCartItemCount() {
    const cartLink = document.getElementById('cart-link');
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartLink.textContent = `cart(${cartItemCount})`;
}

function renderProducts() {
    buyGrid.innerHTML = '';
    products.forEach((product, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <img src="${product.image}">
            <p>${product.name}</p>
            <p>₹${product.price}</p>
            <button class="add-to-cart-btn" data-index="${index}">add to cart</button>
        `;
        buyGrid.appendChild(gridItem);
    });
}

function sortByLowToHigh(){
    products.sort((a,b)=>a.price-b.price);
    renderProducts();
}

function sortByHighToLow(){
    products.sort((a,b)=>b.price-a.price);
    renderProducts();
}

const sortOptions = document.getElementById('sort-options');
sortOptions.addEventListener('change',()=>{
    const selectedOption = sortOptions.value;
    if (selectedOption==='low-to-high'){
        sortByLowToHigh();
    }
    else if (selectedOption==='high-to-low'){
        sortByHighToLow();
    }
});

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.product.image}">
            <p>${item.product.name}</p>
            <p>₹${item.product.price}</p>
            <div class="increasing-quantity">
            <button class="decrease-quantity-btn" data-product-name="${item.product.name}">-</button>
            <p>${item.quantity}</p>
            <button class="increase-quantity-btn" data-product-name="${item.product.name}">+</button>       
            <button class="delete-item-btn" data-product-name="${item.product.name}">
            X
            </button>     
            </div>
            
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}


function handleIncreaseQuantity(event) {
    const productName = event.target.dataset.productName;
    const cartItem = cartItems.find(item => item.product.name === productName);

    if (cartItem) {
        cartItem.quantity++;
        updateCartItemCount();
        renderCartItems();
        updateTotalAmount();
    }
}

function handleDecreaseQuantity(event) {
    const productName = event.target.dataset.productName;
    const cartItem = cartItems.find(item => item.product.name === productName);

    if (cartItem) {
        cartItem.quantity--;
        updateCartItemCount();
        renderCartItems();
        updateTotalAmount();
    }
}

function handleDeleteItem(event) {
    const productName = event.target.dataset.productName;
    cartItems = cartItems.filter(item => item.product.name !== productName);
    updateCartItemCount();
    renderCartItems();
    updateTotalAmount();
}



function filterProductsByName(query) {
    const lowerCaseQuery = query.toLowerCase();
    return products.filter(product => product.name.toLowerCase().includes(lowerCaseQuery));
  }
  

  function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm === '') {
      renderProducts(); 
    } else {
      const filteredProducts = filterProductsByName(searchTerm);
      renderFilteredProducts(filteredProducts);
    }
  }
  
  function renderFilteredProducts(filteredProducts) {
    buyGrid.innerHTML = '';
    if (filteredProducts.length === 0) {
      buyGrid.innerHTML = '<p>no products found.</p>';
    } else {
      filteredProducts.forEach((product, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <img src="${product.image}">
            <p>${product.name}</p>
            <p>₹${product.price}</p>
            <button class="add-to-cart-btn" data-index="${index}">add to cart</button>
        `;
        buyGrid.appendChild(gridItem);
      });
    }
  }
  
 
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', handleSearch);




buyGrid.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        handleAddToCart(event);
    }
});

cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('increase-quantity-btn')) {
        handleIncreaseQuantity(event);
    } else if (event.target.classList.contains('delete-item-btn')) {
        handleDeleteItem(event);
    } else if(event.target.classList.contains('decrease-quantity-btn')){
        handleDecreaseQuantity(event);
    }
});

function updateTotalAmount() {
    const total = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    totalAmount.textContent = total;
}

function handleAddToCart(event) {
    const index = event.target.dataset.index;
    const productToAdd = products[index];

   
    const existingCartItem = cartItems.find(item => item.product.name === productToAdd.name);

    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        cartItems.push({ product: productToAdd, quantity: 0 });
    }
    event.target.textContent="added to cart";
    event.target.classList.add("added-to-cart-btn");
   
    updateCartItemCount();
    renderCartItems();
    updateTotalAmount();
}

function handleCheckout() {
    alert('Thanks for shopping! Visit again.');
}


document.getElementById('buy-link').addEventListener('click', () => showPage(buyPage));
document.getElementById('cart-link').addEventListener('click', () => {
    showPage(cartPage);
    renderCartItems();
    updateTotalAmount();
});
buyGrid.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        handleAddToCart(event);
    }
});
checkoutBtn.addEventListener('click', handleCheckout);


renderProducts();
showPage(buyPage);
updateCartItemCount();