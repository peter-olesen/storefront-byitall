// fetchCategoryList();
fetchProductData();

// Functions below

function fetchCategoryList() {
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(console.log);
};

function fetchProductData() {
    fetch('https://dummyjson.com/products?limit=0')
        .then(res => res.json())
        .then(productData => {
            receivedProductData(productData);
        })
};

function receivedProductData(productData) {
    let allProducts = productData.products
    let featuredProducts = [];

    featuredProducts.push(allProducts[3], allProducts[5], allProducts[9])

    console.log(featuredProducts);
}