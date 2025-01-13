let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];
let carModels = JSON.parse(localStorage.getItem("carModels")) || [];

function displayRentalCards() {
  const rentalCardsContainer = document.getElementById("rentalCardsContainer");
  rentalCardsContainer.innerHTML = "";

  rentalData.forEach((rental, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="./AssetsHome/car1.png" alt="Car Image">
            <h3>${rental.carModel}</h3>
            <p>Start Date: ${rental.rentStartDate}</p>
            <p>End Date: ${rental.rentEndDate}</p>
            <p>Booked By: ${rental.bookedBy}</p>
            <button onclick="deleteRental(${index})" id="deleteBtn${index}" disabled>Delete</button>
        `;

    rentalCardsContainer.appendChild(card);
  });

  checkAdminCredentials();
}

function saveToLocalStorage(rentalData) {
  localStorage.setItem("rentalData", JSON.stringify(rentalData));
}

function deleteRental(index) {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username === "Admin" && password === "Admin") {
    rentalData.splice(index, 1);
    saveToLocalStorage(rentalData);
    displayRentalCards();
  } else {
    alert("Only Admin can delete rental items.");
  }
}

window.onload = function () {
  displayRentalCards();
  checkAdminCredentials();
};

function checkAdminCredentials() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const isAdmin = username === "Admin" && password === "Admin";

  const deleteButtons = document.querySelectorAll("button[id^='deleteBtn']");

  deleteButtons.forEach((button) => {
    if (isAdmin) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "true");
    }
  });

  const adminSection = document.getElementById("adminSection");
  if (isAdmin) {
    adminSection.style.display = "block";
    populateCarModelDropdown();
  } else {
    adminSection.style.display = "none";
  }
}

document
  .getElementById("addCarModelBtn")
  .addEventListener("click", function () {
    const carModelInput = document.getElementById("carModelInput");
    const newCarModel = carModelInput.value.trim();

    if (newCarModel) {
      carModels.push(newCarModel);
      localStorage.setItem("carModels", JSON.stringify(carModels));
      carModelInput.value = "";
      populateCarModelDropdown();
    } else {
      alert("Please enter a valid car model.");
    }
  });

// Function to populate the car model dropdown
function populateCarModelDropdown() {
  const carModelDropdown = document.getElementById("carModelDropdown");
  carModelDropdown.innerHTML = "";

  carModels.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    carModelDropdown.appendChild(option);
  });
}
