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
]

categorySorter(productCategories)

function categorySorter(productCategories) {

// Categories
let electronicsCategory = []
let cosmeticsCategory = []
let groceriesCategory = []
let homeCategory = []
let womensCategory = []
let autoCategory = []
let mensCategory = []

let noCategory = []

productCategories.forEach(category => {

switch (category) {
    case 'smartphones':
    case 'laptops':
        console.log('electronics')
        electronicsCategory.push(category)
        break;
    
    case 'fragrances':
    case 'skincare':
        console.log('cosmetics')
        cosmeticsCategory.push(category)
        break;

    case 'groceries':
        console.log('groceries')
        groceriesCategory.push(category)
        break;

    case 'home-decoration':
    case 'furniture':
        console.log('home')
        homeCategory.push(category)
        break;
    
    case 'womens-dresses':
    case 'womens-shoes':
    case 'womens-watches':
    case 'womens-bags':
    case 'womens-jewellery':
        console.log('women')
        womensCategory.push(category)
        break;

    case 'automotive':
    case 'motorcycle':
        console.log('auto');
        autoCategory.push(category)
        break;

    case 'mens-shirts':
    case 'mens-shoes':
    case 'mens-watches':
        console.log('men')
        mensCategory.push(category)
        break;

    default:
        console.log(category)
        noCategory.push(category)
        break;
}

})}

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