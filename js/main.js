const billAmountInput = document.getElementById("bill-amount");
const nbOfPeopleInput = document.getElementById("nb-of-people");
const nbOfPeopleError = document.getElementById("nb-of-people-error");
const nbOfPeopleContainer = document.getElementById("nb-of-people-container");

billAmountInput.addEventListener("change", checkNbOfPeople);
nbOfPeopleInput.addEventListener("change", checkNbOfPeople);

function checkNbOfPeople() {
  const billAmount = getBillAmount();
  const nbOfPeople = getNbOfPeople();

  if (isValidAmount(billAmount)) {
    if (isValidNbOfPeople(nbOfPeople)) {
      nbOfPeopleContainer.classList.remove("card__input-field--error");
      nbOfPeopleError.classList.remove("show-error");
    } else {
      nbOfPeopleContainer.classList.add("card__input-field--error");
      nbOfPeopleError.classList.add("show-error");
    }
  }
}

function getBillAmount() {
  return Math.round(parseFloat(billAmountInput.value) * 100) / 100;
}

function getNbOfPeople() {
  return parseInt(nbOfPeopleInput.value, 10);
}

function isValidAmount(amount) {
  return !isNaN(amount) && amount >= 0;
}

function isValidNbOfPeople(nbOfPeople) {
  return !isNaN(nbOfPeople) && nbOfPeople > 0;
}
