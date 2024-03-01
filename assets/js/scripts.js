fetchCategoryData();
fetchProductData();

const featuredProductsElement = document.getElementById('featuredProducts');
const topNavigationElement = document.getElementById('pageNavigation');
const byitallTitle = document.getElementById('byitallTitle');

byitallTitle.onclick = backToFrontPage;

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
                <h2>${product.title}</h2>
            </header>
            <img src="${product.thumbnail}" alt="" class="thumbnail">
            <footer class="featuredFooter">
                <button id="readMore">Read More</button><button id="addToCart">Add to Cart</button>
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
