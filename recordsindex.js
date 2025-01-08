let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];
console.log(rentalData);

const rentalTable = document
  .getElementById("rentalTable")
  .getElementsByTagName("tbody")[0];
const noRecordMessage = document.getElementById("noRecord");
const viewModal = document.getElementById("viewModal");
const viewClose = document.getElementById("viewClose");
const viewDetails = document.getElementById("viewDetails");
const myModal = document.getElementById("myModal");
const times = document.getElementById("times");

function closeModal() {
  myModal.style.display = "none";
}

function openModal() {
  myModal1.style.display = "block";
}
// Open view modal (working when clicked in vew Details)
function openViewModal(rental) {
  let details = `<p><strong>Rental ID:</strong> ${rental.rentalId}</p>
                   <p><strong>Car Model:</strong> ${rental.carModel}</p>
                   <p><strong>Start Date:</strong> ${rental.rentStartDate}</p>
                   <p><strong>End Date:</strong> ${rental.rentEndDate}</p>
                   <p><strong>Customer Name:</strong> ${rental.customerName}</p>
                   <p><strong>Destination:</strong> ${
                     rental.destinationPlace
                   }</p>
                   <p><strong>Start Place:</strong> ${rental.startPlace}</p>
                   <p><strong>Passenger:</strong> ${
                     rental.isSinglePassenger ? "Yes" : "No"
                   }</p>
                   <p><strong>Fuel Type:</strong> ${rental.fuelType}</p>
                   <p><strong>Booked By:</strong> ${rental.bookedBy}</p>`;
  viewDetails.innerHTML = details;
  viewModal.style.display = "block";
}
// ---------------------------------------------------------------------------------saving to Local Storage(working)
function saveToLocalStorage() {
  localStorage.setItem("rentalData", JSON.stringify(rentalData));
}
// ---------------------------------------------------------------------------------Main Function for Edit,

// Display table functionality(working)
function displayTable(rentalData) {
  rentalTable.innerHTML = "";
  if (rentalData == []) {
    noRecordMessage.innerHTML = `<h1>No Records To Display</h1>`;
  }
  rentalData.forEach((rental, index) => {
    const row = document.createElement("tr");
    // let row = rentalTable.insertRow();
    row.innerHTML = `
            <td>${rental.rentalId}</td>
            <td>${rental.carModel}</td>
            <td>${rental.fuelType}</td>
            <td>${rental.bookedBy}</td>
            <td>${rental.rentStartDate}</td>
            <td>${rental.rentEndDate}</td>
            <td>${rental.customerName}</td>
            <td>
                <button onclick="editRental(${index})">Edit</button>
                <button onclick="deleteRental(${index})">Delete</button>
                <button onclick="openViewModal(rentalData[${index}])">View</button>
            </td>
        `;
    rentalTable.appendChild(row);
  });
}

// Delete rental(working)
function deleteRental(index) {
  rentalData.splice(index, 1);
  saveToLocalStorage();
  displayTable();
}

// Close view modal
viewClose.onclick = function () {
  viewModal.style.display = "none";
};

// Close modal when clicking outside of the modal NOt working, work on it
window.onclick = function (event) {
  if (event.target == myModal) {
    closeModal();
  }
  if (event.target == viewModal) {
    viewModal.style.display = "none";
  }
};

// Editing function.
function editRental(index) {
  const rental = rentalData[index];

  //  form gets filled with previous values.
  document.getElementById("rentalId").value = rental.rentalId;
  document.getElementById("carModel").value = rental.carModel;
  document.getElementById("mfdYear").value = rental.mfdYear;
  document.getElementById("rentStartDate").value = rental.rentStartDate;
  document.getElementById("rentEndDate").value = rental.rentEndDate;
  document.getElementById("customerName").value = rental.customerName;
  document.getElementById("destinationPlace").value = rental.destinationPlace;
  document.getElementById("startPlace").value = rental.startPlace;
  document.getElementById("isSinglePassenger").checked =
    rental.isSinglePassenger;
  document.getElementById("fuelType").value = rental.fuelType;
  document.getElementById("bookedBy").value = rental.bookedBy;
  rentalData.splice(index, 1);
  saveToLocalStorage();
  openModal();
}

// Loading initial data in tables from local storage
window.onload = function () {
  if (rentalData.length > 0) {
    displayTable(rentalData);
  } else {
    displayTable(rentalData); // function used for displaying mock data previosly written
    closeModal();
    openModal();
  }
};

// pop up code for the add(+) button -------------------------------------------------------------------------------------//
let bookButton = document.getElementById("bookButton");
let closeButton = document.getElementById("times2");
let myModalEl = document.getElementById("myModal1");

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
// end of pop add button ------------------------------------------------------------------------

// Search Button Functionality-------------------------------------------------
const searchIcon = document.getElementById("searchIconButton");
searchIcon.addEventListener("click", function () {
  console.log("search icon working");
  let searchValue = document.getElementById("rentalIdValue").value;

  searchValue = searchValue.trim(); // Trimming extra spaces
  console.log(searchValue);
  if (searchValue === "") {
    // If the search input is empty, show all rentals
    displayTable(rentalData);
  } else {
    const filteredData = rentalData.filter(
      (rental) => rental.rentalId === searchValue
      // Filter rentals by rentalId (or any other field)
      // const filteredData = rentalData.find((rental) =>
      //   rental.searchValue
    );
    console.log(filteredData, searchValue);
    // Update the table with the filtered data but not changing original table in the local storage
    displayTable(filteredData);
  }
});

//End of Seach Button--------------------------------------
