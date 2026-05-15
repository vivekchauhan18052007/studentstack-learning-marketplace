let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
// search
let searchInput = document.querySelector("#input input");

searchInput.addEventListener("input", () => {
  let searchValue = searchInput.value.toLowerCase();

  let products = document.querySelectorAll("#product");

  products.forEach((product) => {
    let title = product.querySelector("#productName").innerText.toLowerCase();

    if (title.includes(searchValue)) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
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

//cart list
let cartUl = document.querySelector("#cartUl");
if (cartData.length === 0) {
  cartUl.innerHTML = "<p>Your cart is empty! </p>";
}
cartData.forEach((item) => {
  let product = document.createElement("li");
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
  cartUl.appendChild(product);

  productCancel.addEventListener("click", () => {
    let currentIndex = cartData.indexOf(item);

    cartData.splice(currentIndex, 1);

    localStorage.setItem("cartData", JSON.stringify(cartData));
    product.remove();
    cartLength.innerText = `${cartData.length} items in your cart`;

    totalItem.innerText = `Sub Total (${cartData.length} items)`;

    total();
  });
  total();
  //cart length

  let cartLength = document.querySelector("#yourCart p");
  let totalItem = document.querySelector("#subTotalText");

  cartLength.innerText = `${Number(cartData.length)} items in your cart`;
  totalItem.innerText = `Sub Total (${Number(cartData.length)} items) `;
});

//  total
function total() {
  let subTotalValue = document.querySelector("#subTotalPriceSummary");
  let totalValue = document.querySelector("#totalPriceSummary");
  let discountTotalPriceSummary = document.querySelector(
    "#discountTotalPriceSummary",
  );
  let discountText = document.querySelector("#discountMsg p");
  let discountMsg = document.querySelector("#discountMsg");

  let total = 0;

  cartData.forEach((item) => {
    total += item.price * item.quantity;
  });

  let hasFreeProduct = cartData.some((item) => item.price === 0);

  let discount = 0;
  if (cartData.length > 0 && !hasFreeProduct) {
    discount = 100;
  }

  let finalTotal = total - discount;
  if (finalTotal < 0) finalTotal = 0;

  subTotalValue.innerText = `₹${total}`;
  totalValue.innerText = `₹${finalTotal}`;

  discountTotalPriceSummary.innerText = `₹${discount}`;
  discountText.innerText = `You're saving ₹${discount} on this order!`;

  if (discount === 0) {
    discountMsg.classList.add("hidden");
  } else {
    discountMsg.classList.remove("hidden");
  }

  if (cartData.length === 0) {
    cartUl.innerHTML = "<p>Your cart is empty!</p>";
    subTotalValue.innerText = "₹0";
    totalValue.innerText = "₹0";
    discountTotalPriceSummary.innerText = "₹0";
  }
}

//checkout
let checkoutBtn = document.querySelector("#checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  cartUl.innerHTML = "";
  cartData = [];
  localStorage.removeItem("cartData");
  alert("Order Placed Successfully!");

  total();
});

//coupon code

let couponText = document.querySelector("#couponText");
let couponBtn = document.querySelector("#couponBtn");

couponBtn.addEventListener("click", () => {
  let couponValue = couponText.value;
  if (couponValue.trim() === "") {
    alert("Please Enter Coupon Code");
    return;
  } else {
    alert("Coupon Applied Successfully!");
  }
});

