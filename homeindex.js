let bookButton = document.getElementById("bookbutton");
let closeButton = document.getElementById("times");
let myModalEl = document.getElementById("myModal");

bookButton.addEventListener("click", function () {
  console.log("button Got clicked");
  myModalEl.style.display = "block";
});

closeButton.addEventListener("click", function () {
  myModalEl.style.display = "none";
});
// Start of Script for the Popup form

const rentalForm = document.getElementById("form");

// Handle form submission
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
};

function removeCred() {
  // const removeCred = document.getElementById("removeCred");
  window.location.href = "loginpage.html";
  localStorage.removeItem("username");
  localStorage.removeItem("password");
}
