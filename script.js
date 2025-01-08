function validateLoginForm(event) {
  event.preventDefault(); // Prevent form submission

  var name = document.getElementById("logName").value;
  var password = document.getElementById("logPassword").value;
  console.log(name, password);
  // For Admin.
  if (name == "Admin" && password == "Admin") {
    window.location.href = "./homepage.html";
    localStorage.setItem("username", name);
    localStorage.setItem("password", password);
  }
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // checking if user exists.
  var userExists = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].name === name && users[i].password === password) {
      userExists = true;
      break;
    }
  }
  if (password.length < 8) {
    document.getElementById("errorMsg").innerHTML =
      "Your password has more than 8 characters";
  } else if (!userExists) {
    alert("User not found. Please register first"); // Ask to user to register for getting login details
  } else {
    localStorage.setItem("username", name);
    localStorage.setItem("password", password);
    alert("Successfully logged in");
    window.location.href = "./homepage.html"; // Redirect to the homepage after successful login
  }
}

function validateSignupForm(event) {
  event.preventDefault();

  var mail = document.getElementById("signEmail").value;
  var name = document.getElementById("signName").value;
  var password = document.getElementById("signPassword").value;
  var confirmPassword = document.getElementById("signConfirmPassword").value;
  console.log(name, mail, password);

  if (mail == "" || name == "" || password == "") {
    document.getElementById("errorMsg").innerHTML =
      "Please fill the required fields";
  } else if (password.length < 8) {
    document.getElementById("errorMsg").innerHTML =
      "Your password must include at least 8 characters";
  } else if (password !== confirmPassword) {
    document.getElementById("errorMsg").innerHTML = "Passwords do not match";
  } else {
    // Check if user already exists
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var userExists = false;
    for (var i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        userExists = true;
        break;
      }
    }

    if (userExists) {
      alert("User already exists. Please login.");
    } else {
      // Store new user in localStorage
      users.push({ name: name, email: mail, password: password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Enter Username and password in Login section to login");
    }
  }
}

const loginSection = document.getElementById("loginSection");
const registrationSection = document.getElementById("registrationSection");
const toLogin = document.getElementById("tologinDiv");
toLogin.addEventListener("click", function () {
  loginSection.style.display = "block";
  registrationSection.style.display = "none";
});

const toRegister = document.getElementById("toregisterdiv");
toRegister.addEventListener("click", function () {
  registrationSection.style.display = "block";
  loginSection.style.display = "none";
});
