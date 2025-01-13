let bookButton = document.getElementById("bookbutton");
let closeButton = document.getElementById("times");
let myModalEl = document.getElementById("myModal");

onStartRentDate();
onStartEndDate();

bookButton.addEventListener("click", function () {
  console.log("button Got clicked");
  myModalEl.style.display = "block";
});

closeButton.addEventListener("click", function () {
  myModalEl.style.display = "none";
});
// Start of Script for the Popup form

const rentalForm = document.getElementById("form");

// Taking Values from the pop up form.
rentalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  function saveToLocalStorage() {
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
  }

  let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];

  // Get form data
  const rental = {
    rentalId: document.getElementById("rentalId").value,
    carModel: document.getElementById("carModel").value,
    mfdYear: document.getElementById("mfdYear").value,
    rentStartDate: document.getElementById("rentStartDate").value,
    rentEndDate: document.getElementById("rentEndDate").value,
    customerName: document.getElementById("customerName").value,
    destinationPlace: document.getElementById("destinationPlace").value,
    startPlace: document.getElementById("startPlace").value,
    isSinglePassenger: document.getElementById("isSinglePassenger").checked,
    fuelType: document.getElementById("fuelType").value,
    bookedBy: document.getElementById("bookedBy").value,
  };
  if (
    new Date(rental.rentStartDate) > new Date(rental.rentEndDate) ||
    new Date(rental.rentStartDate) == new Date(rental.rentEndDate)
  ) {
    alert(
      "Start Date and End Date are Same or Start Date is more than End Date"
    );
    return;
  }
  console.log(rental);
  rentalData.push(rental);
  saveToLocalStorage();
  alert("Your Booking is Confirmed, view in Bookings Record Section");
  window.location.href = "./bookingsrecord.html";
  rentalForm.reset();
});

window.onload = function () {
  const username = localStorage.getItem("username");
  document.getElementById("onLoadUserName").innerHTML = `Welcome ${username}`;
  reloadCarModels();
};

function removeCred() {
  // const removeCred = document.getElementById("removeCred");
  window.location.href = "loginpage.html";
  localStorage.removeItem("username");
  localStorage.removeItem("password");
}

function onStartRentDate() {
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;
  document.getElementById("rentStartDate").value = today;
  document.getElementById("rentStartDate").setAttribute("min", today);
}

function onStartEndDate() {
  var date = new Date();

  var day = date.getDate() + 1;
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;
  document.getElementById("rentEndDate").setAttribute("min", today);
}
// --------------------------------------------------------------------------

// function for reloading admin added cars
function reloadCarModels() {
  let selectoption = document.getElementById("carModel");
  let carmodels = JSON.parse(localStorage.getItem("carModels"));
  console.log(carmodels);
  carmodels.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    selectoption.appendChild(option);
  });
}
