const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const currentPage = window.location.pathname;
const isLoginPage = currentPage.includes("login.html");
const isRegisterPage = currentPage.includes("register.html");

if (!isLoggedIn && !isLoginPage && !isRegisterPage) {
  window.location.replace("login.html");
}

if (isLoggedIn && isLoginPage) {
  window.location.replace("index.html");
}

const pagesDiv = document.querySelector("#pages");
if (pagesDiv) {
  if (isLoggedIn) {
    pagesDiv.innerHTML = `
      <a href="index.html" class="opacity">Home</a>
      <a href="cart.html" class="opacity">Cart</a>
      <a href="#" class="opacity" id="logoutBtn">Logout</a>
    `;
    document.querySelector("#logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");
      window.location.replace("login.html");
    });
  } else {
    pagesDiv.innerHTML = `
      <a href="index.html" class="opacity">Home</a>
      <a href="cart.html" class="opacity">Cart</a>
      <a href="login.html" class="opacity">Login</a>
      <a href="register.html" class="opacity">Register</a>
    `;
  }
}

