let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];
console.log(rentalData);
// ---------------------------------------------------------------------------------saving to Local Storage(working)
function saveToLocalStorage(rentalData) {
  localStorage.setItem("rentalData", JSON.stringify(rentalData));
}
// Date Validation Code
onStartRentDate();
onStartEndDate();
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

const rentalTable = document
  .getElementById("rentalTable")
  .getElementsByTagName("tbody")[0];
const noRecordMessage = document.getElementById("noRecord");
const viewModal = document.getElementById("viewModal");
const viewClose = document.getElementById("viewClose");
const viewDetails = document.getElementById("viewDetails");
const myModal2 = document.getElementById("myModal2");
const times2 = document.getElementById("times2");

// Open view modal (working when clicked in view Details)
function openViewModal(rental) {
  let details = `<div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Rental ID:</span> <span>${
    rental.rentalId
  }</span></div>
                  <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Car Model: </span> <span>${
                    rental.carModel
                  }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Start Date:</span> <span>${
                     rental.rentStartDate
                   }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>End Date:</span> <span>${
                     rental.rentEndDate
                   }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Customer Name:</span> <span>${
                     rental.customerName
                   }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Destination:</span> <span>${
                     rental.destinationPlace
                   }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Start Place:</span><span> ${
                     rental.startPlace
                   }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Passenger:</span><span> ${
                     rental.isSinglePassenger ? "Yes" : "No"
                   }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Fuel Type:</span> <span>${
                     rental.fuelType
                   }</span></div>
                   <div style="display:flex; flex-direction:row; justify-content: space-between; padding: 6px;"><span>Booked By:</span> <span>${
                     rental.bookedBy
                   }</span></div>`;
  viewDetails.innerHTML = details;
  viewModal.style.display = "block";
}

// ---------------------------------------------------------------------------------Main Function for Edit,

// Display table functionality(working)
function displayTable(rentalData) {
  rentalTable.innerHTML = "";

  rentalData.forEach((rental, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${rental.rentalId}</td>
            <td>${rental.carModel}</td>
            <td>${rental.fuelType}</td>
            <td>${rental.bookedBy}</td>
            <td>${rental.rentStartDate}</td>
            <td>${rental.rentEndDate}</td>
            <td>${rental.customerName}</td>
            <td>
                <button style="cursor:pointer;" onclick="editRental(rentalData[${index}], ${index})">Edit</button>
                <button style="cursor:pointer;" onclick="deleteRental(${index})">Delete</button>
                <button style="cursor:pointer;" onclick="openViewModal(rentalData[${index}])">View</button>
            </td>
        `;
    rentalTable.appendChild(row);
  });
}
// Popup functions
times2.addEventListener("click", function () {
  myModal2.style.display = "none";
});

function openModal() {
  myModal2.style.display = "block";
}

// Close view modal
viewClose.onclick = function () {
  viewModal.style.display = "none";
};

// Delete rental(working)
function deleteRental(index) {
  rentalData.splice(index, 1);
  saveToLocalStorage(rentalData);
  window.location.reload();
  displayTable();
}

// Close modal when clicking outside of the modal NOt working, work on it
// window.onclick = function (event) {
//   if (event.target == myModal) {
//     closeModal();
//   }
//   if (event.target == viewModal) {
//     viewModal.style.display = "none";
//   }
// };

// Editing function.
function editRental(index, indexValue) {
  let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];
  openModal();

  // Fill the form with existing values
  document.getElementById("rentalId2").value = index.rentalId;
  document.getElementById("rentalId2").disabled = true; // Disabling Editing of rental ID
  document.getElementById("carModel2").value = index.carModel;
  document.getElementById("mfdYear2").value = index.mfdYear;
  document.getElementById("rentStartDate2").value = index.rentStartDate;
  document.getElementById("rentEndDate2").value = index.rentEndDate;
  document.getElementById("customerName2").value = index.customerName;
  document.getElementById("destinationPlace2").value = index.destinationPlace;
  document.getElementById("startPlace2").value = index.startPlace;
  document.getElementById("isSinglePassenger2").checked =
    index.isSinglePassenger;
  document.getElementById("fuelType2").value = index.fuelType;
  document.getElementById("bookedBy2").value = index.bookedBy;

  // Update the rental data on form submission
  const rentalForm2 = document.getElementById("rentalForm2");
  reloadCarModelsEdit();
  rentalForm2.onsubmit = function (e) {
    e.preventDefault();

    // Create the updated rental object
    const updatedRental = {
      rentalId: document.getElementById("rentalId2").value,
      carModel: document.getElementById("carModel2").value,
      mfdYear: document.getElementById("mfdYear2").value,
      rentStartDate: document.getElementById("rentStartDate2").value,
      rentEndDate: document.getElementById("rentEndDate2").value,
      customerName: document.getElementById("customerName2").value,
      destinationPlace: document.getElementById("destinationPlace2").value,
      startPlace: document.getElementById("startPlace2").value,
      isSinglePassenger: document.getElementById("isSinglePassenger2").checked,
      fuelType: document.getElementById("fuelType2").value,
      bookedBy: document.getElementById("bookedBy2").value,
    };

    if (
      new Date(updatedRental.rentStartDate) >
      new Date(updatedRental.rentEndDate)
    ) {
      alert("Start date cannot be after the end date.");
      return;
    }

    // Update the rental data
    rentalData[indexValue] = updatedRental;
    saveToLocalStorage(rentalData);
    displayTable(rentalData); // Refresh the table
    myModal2.style.display = "none"; // Close the modal
  };
}

// Loading initial data in tables from local storage
window.onload = function () {
  reloadCarModels();
  if (rentalData.length > 0) {
    displayTable(rentalData);
  } else {
    // displayTable(rentalData);
    rentalTable.innerHTML = `<h1 style="text-align:center;">No Records To Display</h1>`; // function used for displaying mock data previosly
  }
};

// pop up code for the add(+) button -------------------------------------------------------------------------------------//
let bookButton = document.getElementById("bookButton");
let closeButton = document.getElementById("times1");
let myModalEl = document.getElementById("myModal1");

bookButton.addEventListener("click", function () {
  console.log("button Got clicked");
  myModalEl.style.display = "block";
});

closeButton.addEventListener("click", function () {
  console.log("closed pop up");
  myModalEl.style.display = "none";
});

const rentalForm1 = document.getElementById("rentalForm1");

//getting values from the form
rentalForm1.addEventListener("submit", function (e) {
  e.preventDefault();

  function saveToLocalStorage() {
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
  }

  let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];

  //
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
  if (new Date(rental.rentStartDate) > new Date(rental.rentEndDate)) {
    alert("Start date cannot be after the end date.");
    return;
  }

  console.log(rental);
  rentalData.push(rental);
  console.log(rentalData);
  saveToLocalStorage();
  alert("Your Booking is Confirmed, view in Bookings Record Section");
  window.location.href = "./bookingsrecord.html";
  rentalForm1.reset();
});
// end of pop add button ----------------------------------------

// Search Button Functionality-----------------------------------
const searchIcon = document.getElementById("searchIconButton");
searchIcon.addEventListener("click", function () {
  console.log("search icon working");
  let searchValue = document.getElementById("rentalIdValue").value;

  searchValue = searchValue.trim();
  console.log(searchValue);
  if (searchValue === "") {
    displayTable(rentalData);
  } else {
    const filteredData = rentalData.filter(
      (rental) => rental.rentalId == searchValue
    );
    console.log(filteredData, searchValue);
    displayTable(filteredData);
  }
});

// -------------------------------Reload Car Models
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

function reloadCarModelsEdit() {
  let selectoption = document.getElementById("carModel2");
  let carmodels = JSON.parse(localStorage.getItem("carModels"));
  console.log(carmodels);
  selectoption.innerHTML = "";
  carmodels.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    selectoption.appendChild(option);
  });
}

//End of Seach Button--------------------------------------
