const authForm = document.getElementById("auth-form");
const message = document.getElementById("message");

function renderRegisterForm() {
  authForm.innerHTML = `
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="Enter username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Enter password">
    </div>
    <button onclick="register()">Register</button>
    <p>Already have an account? <a href="#" onclick="renderLoginForm()">Login here</a></p>
  `;
}

function renderLoginForm() {
  authForm.innerHTML = `
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="Enter username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Enter password">
    </div>
    <button onclick="login()">Login</button>
    <p>Don't have an account? <a href="#" onclick="renderRegisterForm()">Register here</a></p>
  `;
}

function renderSecuredPage(username) {
  authForm.innerHTML = `
    <h2>Welcome, ${username}!</h2>
    <button onclick="logout()">Logout</button>
  `;
}

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    displayMessage("Please fill in all fields.", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    displayMessage("Username already exists. Please choose another one.", "error");
    return;
  }

  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  displayMessage("Registration successful. Please login.", "success");
  renderLoginForm();
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    displayMessage("Please fill in all fields.", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username] && users[username] === password) {
    displayMessage(`Welcome back, ${username}!`, "success");
    renderSecuredPage(username);
  } else {
    displayMessage("Invalid username or password.", "error");
  }
}

function logout() {
  displayMessage("You have logged out.", "success");
  renderLoginForm();
}

function displayMessage(msg, type) {
  message.textContent = msg;
  message.style.color = type === "success" ? "green" : "red";
}


renderLoginForm();
