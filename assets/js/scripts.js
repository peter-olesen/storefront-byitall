const featuredProductsElement = document.getElementById('featuredProducts');
const topNavigationElement = document.getElementById('pageNavigation');
const cartIcon = document.getElementById('cartIcon')

const byitallTitle = document.getElementById('byitallTitle');

byitallTitle.onclick = backToFrontPage;

let allProducts = null

// page load
InitApp()

// Functions below

// ---------- FETCH START ----------

function fetchProductData() {
    fetch('https://dummyjson.com/products?limit=0')
        .then(res => res.json())
        .then(productData => {
            receivedProductData(productData);
        })
};

function fetchCategoryData() {
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(categoryData => {
            receivedCategoryData(categoryData);
        })
};

// function fetchProductsByCategory(categoryURL) {
//     fetch(categoryURL)
//         .then(res => res.json())
//         .then(featuredCards => {
//             receivedProductsByCategory(featuredCards);
//         })
// }

// ---------- FETCH END ----------

// ---------- RECEIVE START ----------

function receivedProductData(productData) {
    allProducts = productData.products

    let featuredProducts = [];

    featuredProducts.push(allProducts[3], allProducts[5], allProducts[9])

    // console.log(featuredProducts);

    buildFeaturedProducts(featuredProducts)
}

function receivedCategoryData(categoryData) {
    let megaMenuData = categorySorter(categoryData);
    buildNav(megaMenuData);
}

// function receivedProductsByCategory(productData) {
//     buildFeaturedProducts(productData)
// }

// ---------- RECEIVE END ----------

// ---------- BUILD START ----------

function buildFeaturedProducts(featuredCards) {

    featuredCards.forEach(product => {
        // console.log(product);

        let featuredHTML = `
        <div class="featuredProduct">
            <header class="featuredHeader">
                <p>${product.brand}</p>
                <h2 onclick="clickedProduct(${product.id})">${product.title}</h2>
            </header>
            <img onclick="clickedProduct(${product.id})" src="${product.thumbnail}" alt="" class="thumbnail">
            <footer class="featuredFooter">
                <button id="readMore" onclick="clickedProduct(${product.id})">Read More</button><button id="addToCart" onclick="addToCart(${product.id})">Add to Cart</button>
            </footer>`

        featuredProductsElement.innerHTML += featuredHTML
    });
}

function buildNav(megaMenuData) {
    const topNavigationElement = document.getElementById('pageNavigation');
    topNavigationElement.innerHTML = '';

    megaMenuData.forEach(mainCategoryData => {
        let megaMenuSubCat = '<ul>';
        mainCategoryData.subCategories.forEach(subCategory => {
            // Replace dashes with spaces for display only
            let displayName = subCategory.replace(/-/g, ' ');

            let megaMenuListElement = `<li><a href="#" onclick="navButtonClick('${subCategory}')">${displayName}</a></li>`;
            megaMenuSubCat += megaMenuListElement;
        });
        megaMenuSubCat += '</ul>';

        let megaMenuCategory = `
            <ul>
                <li>
                    <a href="#">${mainCategoryData.mainCategoryName}</a>
                    ${megaMenuSubCat}
                </li>
            </ul>`;
        topNavigationElement.innerHTML += megaMenuCategory;
    });
}

function navButtonClick(categoryName) {
    console.log(`Clicked on ${categoryName}`);
}


let productCategories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
];

function categorySorter(productCategories) {
    // Categories
    let electronicsCategory = [];
    let cosmeticsCategory = [];
    let groceriesCategory = [];
    let homeCategory = [];
    let womensCategory = [];
    let autoCategory = [];
    let mensCategory = [];
    let noCategory = [];

    productCategories.forEach(category => {
        switch (category) {
            case 'smartphones':
            case 'laptops':
                electronicsCategory.push(category);
                break;
            case 'fragrances':
            case 'skincare':
                cosmeticsCategory.push(category);
                break;
            case 'groceries':
                groceriesCategory.push(category);
                break;
            case 'home-decoration':
            case 'furniture':
            case 'lighting':
                homeCategory.push(category);
                break;
            case 'womens-dresses':
            case 'womens-shoes':
            case 'womens-watches':
            case 'womens-bags':
            case 'womens-jewellery':
                womensCategory.push(category);
                break;
            case 'automotive':
            case 'motorcycle':
                autoCategory.push(category);
                break;
            case 'mens-shirts':
            case 'mens-shoes':
            case 'mens-watches':
                mensCategory.push(category);
                break;
            default:
                noCategory.push(category);
                break;
        }
    });

    let megaMenuData = [
        {
            mainCategoryName: 'Electronics',
            subCategories: electronicsCategory
        },
        {
            mainCategoryName: 'Cosmetics',
            subCategories: cosmeticsCategory
        },
        {
            mainCategoryName: 'Groceries',
            subCategories: groceriesCategory
        },
        {
            mainCategoryName: 'Home',
            subCategories: homeCategory
        },
        {
            mainCategoryName: 'Women',
            subCategories: womensCategory
        },
        {
            mainCategoryName: 'Men',
            subCategories: mensCategory
        },
        {
            mainCategoryName: 'Auto',
            subCategories: autoCategory
        },
        {
            mainCategoryName: 'Misc',
            subCategories: noCategory
        }
    ];

    return megaMenuData;
}


// Call the categorySorter function
// let megaMenuData = categorySorter(productCategories);

// console.log(megaMenuData);



function buildProductPage(product) {

    let productHTML = `
        <section class="productView">
        <h2>${product.title}</h2>
    
        <img class="productImage" src="${product.images[0]}">
        <h3>Price:<br>USD ${product.price}</h3>
        <p>${product.description}</p>
        <button class="addToCart" onclick="addToCart(${product.id})">Add To Cart</button>
        </section>
    `


    featuredProductsElement.innerHTML = productHTML
}

function clickedProduct(myId) {

    let myClickedProduct = null


    allProducts.forEach(product => {

        if (product.id == myId) {
            myClickedProduct = product
        }
    }
    )

    if (myClickedProduct == null) {
        alert('no product')
    }
    else {
        clearMain();
        buildProductPage(myClickedProduct)

    }

}


// ---------- BUILD END ----------

function navButtonClick(categoryName) {
    
    // // console.log(categoryName);

    let categoryProducts = []

    allProducts.forEach(product => {
        if (product.category == categoryName) {
            categoryProducts.push(product)
        }
    });

    // console.log(categoryProducts);

    // let categoryURL = `https://dummyjson.com/products/category/${categoryName}?limit=0`

    // fetchProductsByCategory(categoryURL)
    
    clearMain();
    
    buildFeaturedProducts(categoryProducts)
}

function backToFrontPage() {
    clearMain();
    fetchProductData();
}

// ---------- CLEAR MAIN ----------

function clearMain() {
    featuredProductsElement.innerHTML = ""
}



// Cart code

function initializeCart() {
    let myCart = localStorage.getItem('myCart')

    if (!myCart) {
        console.log('no cart');

        let newCart = {
            products: [],
            total: 0
        }


        updateCartIcon(0)

        saveCartData(newCart)

    } else {

        let myData = JSON.parse(myCart)

        updateCartIcon(myData.products.length)

    }

}

function addToCart(productId) {

    let myCart = readLocalStorage()

    myCart.products.push(productId);

    updateCartIcon(myCart.products.length)

    saveCartData(myCart)
}

function cartIconCallback() {
    let myCart = readLocalStorage()

    let myProducts = []

    myCart.products.forEach(productId => {
        let myProduct = getProduct(productId)
        if (myProduct) {

            myProducts.push(myProduct)
        }
    });

    buildCart(myProducts)   
}

function getProduct(id) {
    let myProduct = false
    allProducts.forEach(product => {
        if (id == product.id) {
            myProduct = product
        }
    });

    return myProduct
}

function ToggleMenu() {
    let myMenues = document.getElementById('menuLists')
    myMenues.classList.toggle('hidden')

}

function readLocalStorage() {

    let myCartString = localStorage.getItem('myCart')
    let myCart = JSON.parse(myCartString)
    return myCart
}

function updateCartIcon(items) {

    let myUpdateElement = document.getElementById('cartProductText')
    myUpdateElement.innerHTML = items

}

function buildCart(products) {
    clearMain()

    let basketHTML = '<section id="basketWiev">'
    if (products.length > 0) {
        products.forEach(product => {
            // console.log(product);

            let myHTML = `<figure><img src="${product.thumbnail}"><h2>${product.title}</h2><p>PRIS: ${product.price}</p><button onclick="removeFromCart(${product.id})">remove</button></figure>`


            basketHTML += myHTML
        })
        basketHTML += `<section id="basketTools"><button onclick="paymentCallBack()">Go to payment</button><button onclick="clearCart()">clear basket</button></section>`
    } else {
        basketHTML += `<h1>basket empty go buy stuff</h1><button onclick="GetProductData()">OK</button>`

    }

    basketHTML += '</section>'

    featuredProductsElement.innerHTML = basketHTML
}


function saveCartData(cartData) {
    let mySerializedData = JSON.stringify(cartData)
    localStorage.setItem('myCart', mySerializedData)
}

function clearCart() {
    let newBasket = {
        products: [],
        total: 0
    }
    updateCartIcon(0)
    /*   mySerializedData = JSON.stringify(newBasket)
      localStorage.setItem('myBasket', mySerializedData) */

    saveCartData(newBasket)

    cartIconCallback()
}

function removeFromCart(id) {

    let myCart = readLocalStorage();    

    myCart.products.forEach((productId, index) => {
        if (id == productId) {
            myCart.products.splice(index, 1)
            return;
        }
    });

    saveCartData(myCart);

    cartIconCallback();
}

function InitApp() {

    fetchProductData();
    fetchCategoryData();
    initializeCart();
}