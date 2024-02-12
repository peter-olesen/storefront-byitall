fetchCategoryList();
fetchProductData();

// Functions below

function fetchCategoryList(){
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(console.log)
};

function fetchProductData(){
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(console.log);
};
