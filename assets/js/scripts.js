fetchCategoryData();
fetchProductData();

const featuredProductsElement = document.getElementById('featuredProducts');
const topNavigationElement = document.getElementById('pageNavigation');

let allProducts = null

// Functions below

// ---------- FETCH START ----------

function fetchCategoryData() {
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(categoryData => {
            receivedCategoryData(categoryData);
        })
};

function fetchProductData() {
    fetch('https://dummyjson.com/products?limit=0')
        .then(res => res.json())
        .then(productData => {
            receivedProductData(productData);
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
    // write the sorting code for categories
    buildNav(categoryData)
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
                <h2>${product.title}</h2>
            </header>
            <img src="${product.thumbnail}" alt="" class="thumbnail">
            <footer class="featuredFooter">
                <button id="readMore">Read More</button><button id="addToCart">Add to Cart</button>
            </footer>`

        featuredProductsElement.innerHTML += featuredHTML
    });
}

function buildNav(categoryData) {
    let categoryNavHTML = ''

    categoryData.forEach(categoryName => {

        let navButtons = `<button onclick="navButtonClick('${categoryName}')">${categoryName}</button> `
        categoryNavHTML += navButtons
    });

    topNavigationElement.innerHTML = categoryNavHTML
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

    console.log(categoryProducts);

    // let categoryURL = `https://dummyjson.com/products/category/${categoryName}?limit=0`

    // fetchProductsByCategory(categoryURL)
    
    clearMain();
    
    buildFeaturedProducts(categoryProducts)
}

// ---------- CLEAR MAIN ----------

function clearMain() {
    featuredProductsElement.innerHTML = ""
}