const data = [
    {
        id: 1,
        name: "Just stylish clocks",
        img: "https://time-street.ru/image/cache/catalog/EYKI/8/1-large_default-overfly-e3065l-dz2hch-700x700.jpg",
        price: 46,
        cat: "Dress",
    },
    {
        id: 2,
        name: "One more clock very beautiful",
        img: "https://tehnoteca.ru/img/1195/1194676/ingersoll_i00901_1.jpg",
        price: 85,
        cat: "Casual",
    },
    {
        id: 3,
        name: "Very expensive clock",
        img: "https://pluslogo.ru/wp-content/uploads/2018/10/ideal-watch-57-sinij-temnyj-0003-watch-hrom-black.jpg",
        price: 122,
        cat: "Sport",
    },
    {
        id: 4,
        name: "Most luxury item",
        img: "http://g02.a.alicdn.com/kf/HTB1pKYFIFXXXXXnaXXXq6xXFXXXH/Watches-men-WEIDE-luxury-brand-leather-Quartz-Digital-LED-reloj-hombre-Army-Military-Sport-wristwatch-relogio.jpg",
        price: 105,
        cat: "Luxury",
    },
    {
        id: 5,
        name: "Low price item",
        img: "https://ae04.alicdn.com/kf/H215d8c910c9e452599ce620c2cf45f04V.jpg",
        price: 32,
        cat: "Dress",
    },
    {
        id: 6,
        name: "Sports clock",
        img: "https://ae04.alicdn.com/kf/HTB1jVwkQXXXXXb8XVXXq6xXFXXXQ/Oulm.jpg",
        price: 50,
        cat: "Sport",
    },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts
        .map(
            (product) =>
                `
        <div class="product">
            <img src=${product.img} alt="">
            <span class="name">${product.name}</span>
            <span class="priceText">$${product.price}</span>
        </div>
        `
        )
        .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    if (value) {
        displayProducts(
            data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
        );
    } else {
        displayProducts(data);
    }
});

const setCategories = () => {
    const allCats = data.map((item) => item.cat);
    const categories = [
        "All",
        ...allCats.filter((item, i) => {
            return allCats.indexOf(item) === i;
        }),
    ];
    categoriesContainer.innerHTML = categories
        .map(
            (cat) =>
                `
        <span class="cat">${cat}</span>
        `
        )
        .join("");

    categoriesContainer.addEventListener("click", (e) => {
        const selectedCat = e.target.textContent;
        selectedCat === "All"
            ? displayProducts(data)
            : displayProducts(data.filter((item) => item.cat === selectedCat));
    });
};

const setPrices = () => {
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;

    priceValue.textContent = "$" + maxPrice;

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter((item) => item.price <= e.target.value));
    });
};

setCategories();
setPrices();
