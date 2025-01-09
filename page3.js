let rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];

// display cards.
function displayRentalCards() {
  const rentalCardsContainer = document.getElementById("rentalCardsContainer");
  rentalCardsContainer.innerHTML = "";

  // Retrieve rental data from local storage
  const rentalData = JSON.parse(localStorage.getItem("rentalData")) || [];

  rentalData.forEach((rental, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="./AssetsHome/car1.png" alt="Car Image">
      <h3>${rental.carModel}</h3>
      <p>Start Date: ${rental.rentStartDate}</p>
      <p>End Date: ${rental.rentEndDate}</p>
      <p>Booked By: ${rental.bookedBy}</p>
      <button onclick="deleteRental(${index})">Delete</button>
    `;

    rentalCardsContainer.appendChild(card);
  });
}

function saveToLocalStorage(rentalData) {
  localStorage.setItem("rentalData", JSON.stringify(rentalData));
}
// Function to delete a rental item
function deleteRental(index) {
  // Ask for admin credentials
  //   const username = prompt("Enter Admin Username:");
  //   const password = prompt("Enter Admin Password:");

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  // Checking if the credentials are correct
  if (username === "Admin" && password === "Admin") {
    const modifiedRentalData =
      JSON.parse(localStorage.getItem("rentalData")) || [];
    modifiedRentalData.splice(index, 1); // working
    console.log(modifiedRentalData);
    // Saveing to  local storage
    saveToLocalStorage(modifiedRentalData);
    displayRentalCards();
  } else {
    alert("Only Admin can delete rental items.");
  }
}

displayRentalCards();
