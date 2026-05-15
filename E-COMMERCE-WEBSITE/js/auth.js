//dark mode
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

//register
let registerForm = document.querySelector("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    register();
  });
}

function register() {
  let username = document.querySelector("#username").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let confirm = document.querySelector("#confirm").value;

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (username.trim() === "") {
    alert("Please Enter User Name");
    return;
  }
  if (email.trim() === "" || !emailPattern.test(email)) {
    alert("Please Enter Email");
    return;
  }
  if (password.trim() === "") {
    alert("Please Enter Password");
    return;
  }
  if (confirm.trim() === "" || confirm !== password) {
    alert("Passwords do not match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userExists = users.find((user) => user.email === email);

  console.log(users);
  if (userExists) {
    alert("User already registered");
    return;
  }

  let newUser = {
    username: username,
    email: email,
    password: password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration Successful");
  window.location.href = "login.html";
}

// LOGIN
let loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    login();
  });
}

function login() {
  let email = document.querySelector("#email").value;

  let password = document.querySelector("#password").value;

  let remember = document.querySelector("#remember").checked;

  if (email.trim() === "") {
    alert("Please Enter Email");
    return;
  }

  if (password.trim() === "") {
    alert("Please Enter Password");
    return;
  }

  if (!remember) {
    alert("Please select 'Remember Me' before logging in.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!validUser) {
    alert("Account not found. Please register first.");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(validUser));
  localStorage.setItem("isLoggedIn", "true");

  if (remember) {
    localStorage.setItem("rememberUser", "true");
  } else {
    localStorage.setItem("rememberUser");
  }

  alert("Login Successful");

  window.location.href = "index.html";
}

