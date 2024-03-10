const productList = document.getElementById('product-list');
const searchButton = document.getElementById('srchBtn');
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('drop');
const dropdownSort = document.getElementById('dropSort');
const dropdownContent = dropdown.querySelector('.dropdown-content');
const dropSortContent = document.getElementById('sort-content');

var search = '';
const xhr = new XMLHttpRequest();

xhr.open('GET', 'products.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const products = JSON.parse(xhr.responseText);
        displayProducts(products);
        addCategoriesToDropdown(products);
        EventRegister(products);
    }
};

xhr.send();
function EventRegister(products){
    searchInput.addEventListener('input', function(){
        search = this.value;
    });

    searchButton.addEventListener('click', function(){
        SearchF(products);
    });
};

function displayProducts(products) {
    const row = document.createElement('div');
    row.classList.add('row');
    productList.appendChild(row);
    products.forEach(product => {
        addProducts(product);
    });
}

function addCategoriesToDropdown(products) {
    const categories = [];

    products.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });
    addAll(dropdownContent, products);
    categories.forEach((category, index) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = category;
        link.id = 'category-' + index;
        link.addEventListener('click', () => filterProductsByCategory(category, products));
        console.log(category);
        dropdownContent.appendChild(link);
    });
}

function addSorttoDropdown(products, sortParam){
    switch(sortParam){
        case 'Name':
            products.sort(sortByName);
            break;
        case 'Price':
            products.sort(sortByPrice);
            break;
        default:
            break;
    }
}

function addAll(dropdownContent, products){
    const allLink = document.createElement('a');
    allLink.href = '#';
    allLink.textContent = 'Всі';
    dropdownContent.appendChild(allLink);

    allLink.addEventListener('click', function(event) {
        productList.innerHTML = '';
        event.preventDefault();
        products.forEach(product => {
            addProducts(product);
        });
    });
}

function filterProductsByCategory(category, products) {
    productList.innerHTML = ''; 
    products.forEach(product => {
        if (product.category === category) {
            addProducts(product);
        }
    });
}

function addProducts(product){
    const productDiv = document.createElement('div');
    productDiv.classList.add('product', 'light-grey-background');
    productDiv.innerHTML = `
        <h2 class="popular__item-title">${product.name}</h2>
        <img src="/images/${product.image}" alt="${product.name}" class="popular__img">
        <p class="content__text">Ціна: $${product.price}</p>
        <p class="content__text">${product.description}</p>
    `;
    productList.appendChild(productDiv);
}

function sortByName(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

function sortByPrice(a, b) {
    return a.price - b.price;
}

function SearchF(products){
    productList.innerHTML = '';
    products.forEach(product=>{
        console.log(`search: ${search}, prodName: ${product.name}`);
        if(product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search)){
            console.log(`product: ${product}`);
            addProducts(product);
        }
    });
    
}

