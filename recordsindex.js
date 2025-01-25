let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];
console.log(rentalData);
// ------------------------------------------saving to Local Storage(working)
function saveToLocalStorage(rentalData) {
  localStorage.setItem("rentalData", JSON.stringify(rentalData));
}
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
  viewModal.style.display = "block";
  document.getElementById("main-container").style.filter = "blur(8px)";
  document.getElementById("main-container").style.pointerEvents = "none";
  let details = `<div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:70px; text-wrap-mode: nowrap;">Rental ID:</span> <span>${
    rental.rentalId
  }</span></div>
                  <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:62px;text-wrap-mode: nowrap;">Car Model: </span> <span>${
                    rental.carModel
                  }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:64px;text-wrap-mode: nowrap;">Start Date:</span> <span>${
                     rental.rentStartDate
                   }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:69px;text-wrap-mode: nowrap;">End Date:</span> <span>${
                     rental.rentEndDate
                   }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:20px;text-wrap-mode: nowrap;">Customer Name:</span> <span>${
                     rental.customerName
                   }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:57px;text-wrap-mode: nowrap;">Destination:</span> <spa>${
                     rental.destinationPlace
                   }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:60px;text-wrap-mode: nowrap;">Start Place:</span><span> ${
                     rental.startPlace
                   }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:63px;text-wrap-mode: nowrap;">Passenger:</span><span> ${
                     rental.isSinglePassenger ? "Yes" : "No"
                   }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:70px;text-wrap-mode: nowrap;">Fuel Type:</span> <span>${
                     rental.fuelType
                   }</span></div>
                   <div style="display:flex; flex-direction:row;  padding: 6px;"><span style="margin-right:62px;text-wrap-mode: nowrap;">Booked By:</span> <span>${
                     rental.bookedBy
                   }</span></div>`;
  viewDetails.innerHTML = details;
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
                <button style="cursor:pointer;    padding: 4px;
    border-radius: 7px;
    height: 36px;
    background: black;
    color: white;
    width:70px;
    margin:5px;
    font-weight: 600;" onclick="editRental(rentalData[${index}], ${index})">Edit</button>
                <button style="cursor:pointer     padding: 4px;
    border-radius: 7px;
    height: 36px;
      width:70px;
    margin:5px;
    background: black;
    color: white;
    font-weight: 600;" onclick="deleteRental(${index})">Delete</button>
                <button style="cursor:pointer;     padding: 4px;
    border-radius: 7px;
    height: 36px;
      width:70px;
    margin:5px;
    background: black;
    color: white;
    font-weight: 600;" onclick="openViewModal(rentalData[${index}])">View</button>
            </td>
        `;
    rentalTable.appendChild(row);
  });
}
// Popup functions
times2.addEventListener("click", function () {
  myModal2.style.display = "none";
  document.getElementById("main-container").style.filter = "none";
  document.getElementById("main-container").style.pointerEvents = "auto";
});

function openModal() {
  myModal2.style.display = "block";
  document.getElementById("main-container").style.filter = "blur(8px)";
  document.getElementById("main-container").style.pointerEvents = "none";
}

// Close view modal
viewClose.onclick = function () {
  viewModal.style.display = "none";
  document.getElementById("main-container").style.filter = "none";
  document.getElementById("main-container").style.pointerEvents = "auto";
};

// Delete rental(working)
function deleteRental(index) {
  rentalData.splice(index, 1);
  saveToLocalStorage(rentalData);
  window.location.reload();
  displayTable();
}

// Editing function.
function editRental(index, indexValue) {
  let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];
  openModal();
  document.getElementById("rentalId2").value = index.rentalId;
  document.getElementById("rentalId2").disabled = true;
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
    displayTable(rentalData);
    myModal2.style.display = "none";
    window.location.reload();
  };
}

window.onload = function () {
  reloadCarModels();
  if (rentalData.length > 0) {
    displayTable(rentalData);
  } else {
    rentalTable.innerHTML = `<h1 style="text-align:center;">No Records To Display</h1>`;
  }
};

// pop up code for the add(+) button -------------------------------------------------------------------------------------//
let bookButton = document.getElementById("bookButton");
let closeButton = document.getElementById("times1");
let myModalEl = document.getElementById("myModal1");

bookButton.addEventListener("click", function () {
  console.log("button Got clicked");
  document.getElementById("main-container").style.filter = "blur(8px)";
  document.getElementById("main-container").style.pointerEvents = "none";
  myModalEl.style.display = "block";
});

closeButton.addEventListener("click", function () {
  console.log("closed pop up");
  document.getElementById("main-container").style.filter = "none";
  document.getElementById("main-container").style.pointerEvents = "auto";
  myModalEl.style.display = "none";
});
// ---------------------------------Add form.
const rentalForm1 = document.getElementById("rentalForm1");

rentalForm1.addEventListener("submit", function (e) {
  e.preventDefault();

  function saveToLocalStorage() {
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
  }

  let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];

  function generateUniqueRentalId(rentalIdInput) {
    let highestId = 0;
    let rentalIdExists = false;

    rentalData.forEach((rental) => {
      const rentalId = parseInt(rental.rentalId, 10); //
      if (rentalId > highestId) {
        highestId = rentalId; //
      }
      if (rental.rentalId === rentalIdInput) {
        rentalIdExists = true;
      }
    });

    if (!rentalIdExists) {
      return rentalIdInput.padStart(3, "0"); //
    } else {
      return (highestId + 1).toString().padStart(3, "0"); //
    }
  }

  const rentalIdInput = document.getElementById("rentalId").value;
  const rental = {
    rentalId: generateUniqueRentalId(rentalIdInput),
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

  window.location.reload();
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
    window.location.reload();
    displayTable(rentalData);
  } else {
    const filteredData = rentalData.filter(
      (rental) => rental.rentalId == searchValue
    );
    console.log(filteredData, searchValue);
    displayTable(filteredData);
  }
});
//End of Search Button--------------------------------------

// -------------------
function addCarModel(newModel) {
  let carmodels = JSON.parse(localStorage.getItem("carModels")) || [];

  if (!carmodels.includes(newModel)) {
    carmodels.push(newModel);
    localStorage.setItem("carModels", JSON.stringify(carmodels));
  } else {
    alert("This car model already exists.");
  }
}

function reloadCarModels() {
  let selectoption = document.getElementById("carModel");
  let carmodels = JSON.parse(localStorage.getItem("carModels")) || [];
  console.log(carmodels);

  carmodels.forEach((model) => {
    if (![...selectoption.options].some((option) => option.value === model)) {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      selectoption.appendChild(option);
    }
  });
}

function reloadCarModelsEdit() {
  let selectoption = document.getElementById("carModel2");
  let carmodels = JSON.parse(localStorage.getItem("carModels")) || [];
  console.log(carmodels);

  selectoption.innerHTML = "";
  carmodels.forEach((model) => {
    if (![...selectoption.options].some((option) => option.value === model)) {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      selectoption.appendChild(option);
    }
  });
}
