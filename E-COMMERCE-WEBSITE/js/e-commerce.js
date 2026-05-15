let imgheader = document.querySelector("#header");
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

//calling json
let allData = [];
async function callData() {
  let req = await fetch("js/data.json");
  let res = await req.json();
  allData = res;
  displayData(allData);
  viewCart();
  categoryFilter(allData);
  filterByPrice();
  dealOfDay();
  showCartData();
}

callData();

function displayData(data) {
  let stacklist = document.querySelector("#stacklist");
  stacklist.innerHTML = "";
  data.forEach((item) => {
    let li = document.createElement("li");

    let imgDiv = document.createElement("div");
    let itemImg = document.createElement("img");
    imgDiv.className = "imgDiv";
    itemImg.className = "itemImg";
    imgDiv.appendChild(itemImg);
    li.appendChild(imgDiv);

    let itemName = document.createElement("p");
    itemName.className = "itemName";
    li.appendChild(itemName);

    let itemCategory = document.createElement("p");
    itemCategory.className = "itemCategory";

    let itemPrice = document.createElement("p");
    itemPrice.className = "itemPrice";

    let itemContainer = document.createElement("div");
    itemContainer.className = "itemContainer";
    itemContainer.appendChild(itemCategory);
    itemContainer.appendChild(itemPrice);
    li.appendChild(itemContainer);

    let itemRating = document.createElement("p");
    itemRating.className = "itemRating";
    li.appendChild(itemRating);

    let cartBtn = document.createElement("button");
    cartBtn.className = "itemCart";
    li.appendChild(cartBtn);

    stacklist.appendChild(li);

    itemImg.src = item.image;
    itemName.innerText = item.title;
    itemCategory.innerText = item.category;
    itemPrice.innerText = `₹${item.price}`;
    itemRating.innerText = `⭐${item.rating} (${item.reviews})`;
    cartBtn.innerText = `Add To Cart`;

    addToCart(cartBtn, item);

    li.addEventListener("click", (e) => {
      let productModal = document.querySelector("#productModal");
      if (e.target.tagName === "BUTTON") {
        return;
      }
      productModal.classList.remove("hidden");
      openModal(item);
    });
  });
}

// search
let searchInput = document.querySelector("#input input");

searchInput.addEventListener("input", () => {
  let searchValue = searchInput.value.toLowerCase();
  if (searchValue.trim() === "") {
    imgheader.classList.remove("hidden");
  } else {
    imgheader.classList.add("hidden");
  }
  let searchData = allData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchValue) ||
      item.category.toLowerCase().includes(searchValue)
    );
  });
  displayData(searchData);
});

//darkmode
let mode = document.querySelector("#mode");
let body = document.querySelector("body");
let isDay = true;
let lightMode = document.querySelector("#light");
let darkMode = document.querySelector("#dark");

mode.addEventListener("click", async () => {
  body.classList.toggle("darkmode");
  lightMode.classList.toggle("hidden");
  darkMode.classList.toggle("hidden");
});

//cart
function viewCart() {
  let cart = document.querySelector("#cart");
  let back = document.querySelector("#back");
  let ckeckoutSlidebar = document.querySelector("#checkout-sidebar");

  cart.addEventListener("click", () => {
    ckeckoutSlidebar.classList.remove("hidden");
  });

  back.addEventListener("click", () => {
    ckeckoutSlidebar.classList.add("hidden");
  });
}

//add to cart
function addToCart(cartBtn, item) {
  let ckeckoutSlidebar = document.querySelector("#checkout-sidebar");
  let cart = document.querySelector("#cart");
  let cartList = document.querySelector("#cart-list");
  cartBtn.addEventListener("click", () => {
    ckeckoutSlidebar.classList.remove("hidden");

    let product = document.createElement("div");
    product.id = "product";

    let itemImg = document.createElement("div");
    let imgTag = document.createElement("img");
    itemImg.id = "itemImg";
    imgTag.id = "imgTag";
    imgTag.src = item.image;
    itemImg.appendChild(imgTag);

    let productName = document.createElement("div");
    productName.id = "productName";
    productName.innerText = item.title;

    let productPrice = document.createElement("div");
    productPrice.id = "productPrice";
    productPrice.innerText = `₹${item.price}`;

    let productBox = document.createElement("div");
    productBox.id = "productBox";

    productBox.appendChild(productName);
    productBox.appendChild(productPrice);

    let quantityBox = document.createElement("div");
    quantityBox.id = "quantityBox";

    let plusBox = document.createElement("div");
    plusBox.id = "plusBox";
    plusBox.innerText = "+";
    plusBox.classList.add("opacity");

    let quantityText = document.createElement("div");
    quantityText.id = "quantity";
    quantityText.innerText = 1;

    let minusBox = document.createElement("div");
    minusBox.id = "minusBox";
    minusBox.innerText = "-";
    minusBox.classList.add("opacity");

    quantityBox.appendChild(plusBox);
    quantityBox.appendChild(quantityText);
    quantityBox.appendChild(minusBox);

    let productCancel = document.createElement("div");
    productCancel.id = "productCancel";
    productCancel.innerText = "✖";
    productCancel.classList.add("opacity");

    product.appendChild(itemImg);
    product.appendChild(productBox);
    product.appendChild(quantityBox);
    product.appendChild(productCancel);

    cartList.appendChild(product);

    let cartValue = document.querySelector("#cartVal");

    let cartObject = {
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    };

    cartData.push(cartObject);

    localStorage.setItem("cartData", JSON.stringify(cartData));

    showCartData();
    total();

    cartValue.innerText = `Your Cart (${cartData.length})`;
  });
}

//localStorage
function showCartData() {
  let ckeckoutSlidebar = document.querySelector("#checkout-sidebar");
  let cart = document.querySelector("#cart");
  let cartList = document.querySelector("#cart-list");
  let cartValue = document.querySelector("#cartVal");

  cartList.innerHTML = "";

  cartData.forEach((item, index) => {
    ckeckoutSlidebar.classList.remove("hidden");

    let product = document.createElement("div");
    product.id = "product";

    let itemImg = document.createElement("div");
    let imgTag = document.createElement("img");
    itemImg.id = "itemImg";
    imgTag.id = "imgTag";
    imgTag.src = item.image;
    itemImg.appendChild(imgTag);

    let productName = document.createElement("div");
    productName.id = "productName";
    productName.innerText = item.title;

    let productPrice = document.createElement("div");
    productPrice.id = "productPrice";
    productPrice.innerText = `₹${item.price}`;

    let productBox = document.createElement("div");
    productBox.id = "productBox";

    productBox.appendChild(productName);
    productBox.appendChild(productPrice);

    let quantityBox = document.createElement("div");
    quantityBox.id = "quantityBox";

    let plusBox = document.createElement("div");
    plusBox.id = "plusBox";
    plusBox.innerText = "+";
    plusBox.classList.add("hover");
    plusBox.classList.add("opacity");

    let quantityText = document.createElement("div");
    quantityText.className = "quantity";
    quantityText.innerText = item.quantity;

    let minusBox = document.createElement("div");
    minusBox.id = "minusBox";
    minusBox.innerText = "-";
    minusBox.classList.add("hover");
    minusBox.classList.add("opacity");

    plusBox.addEventListener("click", () => {
      item.quantity++;
      quantityText.innerText = item.quantity;
      localStorage.setItem("cartData", JSON.stringify(cartData));
      total();
    });

    minusBox.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantityText.innerText = item.quantity;
        localStorage.setItem("cartData", JSON.stringify(cartData));
        total();
      }
    });

    quantityBox.appendChild(minusBox);
    quantityBox.appendChild(quantityText);
    quantityBox.appendChild(plusBox);

    let productCancel = document.createElement("div");
    productCancel.id = "productCancel";
    productCancel.innerText = "✖";
    productCancel.classList.add("opacity");

    product.appendChild(itemImg);
    product.appendChild(productBox);
    product.appendChild(quantityBox);
    product.appendChild(productCancel);
    cartList.appendChild(product);

    productCancel.addEventListener("click", () => {
      cartData.splice(index, 1);

      localStorage.setItem("cartData", JSON.stringify(cartData));

      showCartData();
      total();
    });
  });
  total();

  cartValue.innerText = `Your Cart (${cartData.length})`;
}

//  total
function total() {
  let subTotalValue = document.querySelector("#sub-totalVal");
  let totalValue = document.querySelector("#totalVal");

  let total = 0;
  cartData.forEach((item) => {
    total = total + item.price * item.quantity;
  });
  subTotalValue.innerText = `₹${total}`;
  totalValue.innerText = `₹${total}`;
}

//checkout
let cartList = document.querySelector("#cart-list");
let totalValue = document.querySelector("#totalVal");
let cartValue = document.querySelector("#cartVal");
let checkoutBtn = document.querySelector("#checkoutBtn");
let viewCartBtn = document.querySelector("#viewCartBtn");
let subTotalValue = document.querySelector("#sub-totalVal");

checkoutBtn.addEventListener("click", () => {
  cartList.innerHTML = "";
  cartValue.innerText = "Your Cart (0)";
  totalValue.innerText = `₹${0}`;
  subTotalValue.innerText = `₹${0}`;
  alert("Order Placed Successfully!");
  localStorage.removeItem("cartData");
  cartData = [];
});

//🔥Deal Of The Day
function dealOfDay() {
  let deal = document.querySelector("#deal");
  deal.innerHTML = "";
  let randomItem = allData[Math.floor(Math.random() * allData.length)];

  let imgDiv = document.createElement("div");
  let dealImg = document.createElement("img");

  dealImg.id = "dealImg";
  dealImg.src = randomItem.image;

  let dealName = document.createElement("p");
  dealName.id = "dealName";
  dealName.innerText = randomItem.title;

  let dealPrice = document.createElement("p");
  dealPrice.id = "dealPrice";

  let offerPrice = randomItem.price - 50;
  if (randomItem.price === 0) {
    dealPrice.innerText = `₹${randomItem.price}`;
  } else {
    dealPrice.innerText = `₹${offerPrice}`;
  }

  deal.appendChild(dealImg);
  deal.appendChild(dealName);
  deal.appendChild(dealPrice);
}

//slide-bar category

function categoryFilter(allData) {
  let allcategory = document.querySelector("#allcategory");
  let frontend = document.querySelector("#frontend");
  let backend = document.querySelector("#backend");
  let devops = document.querySelector("#devops");
  let uiUx = document.querySelector("#ui-ux");
  let notes = document.querySelector("#notes");
  let projects = document.querySelector("#projects");
  let templates = document.querySelector("#templates");
  let imgheader = document.querySelector("#header");

  allcategory.addEventListener("click", () => {
    displayData(allData);
    imgheader.classList.add("hidden");
  });

  frontend.addEventListener("click", () => {
    let filterFrontend = allData.filter((item) => item.category === "Frontend");
    displayData(filterFrontend);
    imgheader.classList.add("hidden");
  });

  backend.addEventListener("click", () => {
    let filterBackend = allData.filter((item) => item.category === "Backend");
    displayData(filterBackend);
    imgheader.classList.add("hidden");
  });

  devops.addEventListener("click", () => {
    let filterDevops = allData.filter((item) => item.category === "DevOps");
    displayData(filterDevops);
    imgheader.classList.add("hidden");
  });

  uiUx.addEventListener("click", () => {
    let filterUiUx = allData.filter((item) => item.category === "UI/UX");
    displayData(filterUiUx);
    imgheader.classList.add("hidden");
  });

  notes.addEventListener("click", () => {
    let filterNotes = allData.filter((item) => item.category === "Notes");
    displayData(filterNotes);
    imgheader.classList.add("hidden");
  });

  projects.addEventListener("click", () => {
    let filterProjects = allData.filter((item) => item.category === "Projects");
    displayData(filterProjects);
    imgheader.classList.add("hidden");
  });

  templates.addEventListener("click", () => {
    let filtertemplates = allData.filter(
      (item) => item.category === "Templates",
    );
    displayData(filtertemplates);
    imgheader.classList.add("hidden");
  });
}

// filter
let slider = document.querySelector("#priceRange");
let output = document.querySelector("#filterValue");
let clearPrice = document.querySelector("#clearPrice");
let filterBtn = document.querySelector("#filterOutput button");

clearPrice.addEventListener("click", () => {
  slider.value = 0;
  output.innerText = `Price: ₹0 - ₹0`;
  displayData(allData);
});

output.innerText = `Price: ₹0 - ₹2000`;

slider.oninput = function () {
  output.innerText = `Price: ₹0 - ₹${slider.value}`;
};

filterBtn.addEventListener("click", () => {
  filterByPrice();
  imgheader.classList.remove("hidden");
});

function filterByPrice() {
  let priceVal = Number(slider.value);
  let filter = allData.filter((item) => item.price <= priceVal);
  displayData(filter);
}

//type
let allType = document.querySelector("#all-type");
let freeType = document.querySelector("#free-type");
let paidType = document.querySelector("#paid-type");
let typeBtn = document.querySelector("#filter-type button");

allType.addEventListener("change", filterType);
freeType.addEventListener("change", filterType);
paidType.addEventListener("change", filterType);

function filterType() {
  let filterData = [];

  if (freeType.checked === true) {
    let freeTypeFilter = allData.filter((item) => item.type === "Free");
    filterData = filterData.concat(freeTypeFilter);
    imgheader.classList.remove("hidden");
  }

  if (paidType.checked === true) {
    let paidTypeFilter = allData.filter((item) => item.type === "Paid");
    filterData = filterData.concat(paidTypeFilter);
    imgheader.classList.remove("hidden");
  }

  if (allType.checked === true) {
    displayData(allData);
    return;
  }

  if (!allType.checked && !freeType.checked && !paidType.checked) {
    displayData(allData);
    return;
  }

  displayData(filterData);
}

//rating

let filterRating = document.querySelector("#filter-rating");
let star1 = document.querySelector("#star1");
let star2 = document.querySelector("#star2");
let star3 = document.querySelector("#star3");
let star4 = document.querySelector("#star4");

star1.addEventListener("change", rateFilter);
star2.addEventListener("change", rateFilter);
star3.addEventListener("change", rateFilter);
star4.addEventListener("change", rateFilter);

function rateFilter() {
  let filterStar = [];

  if (star1.checked === true) {
    data1 = allData.filter(
      (item) => Number(item.rating) >= 1 && Number(item.rating) < 2,
    );
    filterStar = filterStar.concat(data1);
    imgheader.classList.remove("hidden");
  }

  if (star2.checked === true) {
    data2 = allData.filter(
      (item) => Number(item.rating) >= 2 && Number(item.rating) < 3,
    );
    filterStar = filterStar.concat(data2);
    imgheader.classList.remove("hidden");
  }

  if (star3.checked === true) {
    data3 = allData.filter(
      (item) => Number(item.rating) >= 3 && Number(item.rating) < 4,
    );
    filterStar = filterStar.concat(data3);
    imgheader.classList.remove("hidden");
  }

  if (star4.checked === true) {
    data4 = allData.filter((item) => Number(item.rating) >= 4);
    filterStar = filterStar.concat(data4);
    imgheader.classList.remove("hidden");
  }

  if (!star1.checked && !star2.checked && !star3.checked && !star4.checked) {
    displayData(allData);
    return;
  }

  displayData(filterStar);
}

//sort by:

let categoryList = document.querySelector("#category-list");
let allList = document.querySelector("#all");
let lowToHigh = document.querySelector("#low-high");
let HighToLow = document.querySelector("#high-low");

categoryList.addEventListener("change", () => {
  if (categoryList.value === "all") {
    displayData(allData);
    return;
  }
  if (categoryList.value === "low-high") {
    let filterList1 = allData.sort((a, b) => a.price - b.price);
    displayData(filterList1);
  }
  if (categoryList.value === "high-low") {
    let filterList2 = allData.sort((a, b) => b.price - a.price);
    displayData(filterList2);
  }
  if (categoryList.value === "popular") {
    let filterPopular = allData.filter((item) => Number(item.rating) >= 4);
    displayData(filterPopular);
  }
});

// modal elements
let productModal = document.querySelector("#productModal");
let modalImg = document.querySelector("#modalImg");
let modalPrice = document.querySelector("#modalPrice");
let modalTitle = document.querySelector("#modalTitle");
let modalDesc = document.querySelector("#modalDesc");
let modalTech = document.querySelector("#modalTech");
let modalRating = document.querySelector("#modalRating");
let closeModal = document.querySelector("#closeModal");
let modalCartBtn = document.querySelector("#modalCartBtn");
productModal.classList.add("hidden");

function openModal(item) {
  modalImg.src = item.image;
  modalTitle.innerText = item.title;
  modalPrice.innerText = `₹${item.price}`;
  modalDesc.innerText =
    item.description || "Best quality study material for students.";
  modalTech.innerText = `Technology: ${item.category}`;
  modalRating.innerText = `⭐${item.rating} (${item.reviews})`;

  modalCartBtn.onclick = () => {
    let cartObject = {
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    };
    cartData.push(cartObject);
    localStorage.setItem("cartData", JSON.stringify(cartData));
    showCartData();
    total();
    productModal.classList.add("hidden");
    alert("Added To Cart");
  };
}

closeModal.addEventListener("click", () => {
  productModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === productModal) {
    productModal.classList.add("hidden");
  }
});

