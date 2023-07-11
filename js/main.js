const billAmountInput = document.getElementById("bill-amount");

const nbOfPeopleInput = document.getElementById("nb-of-people");
const nbOfPeopleError = document.getElementById("nb-of-people-error");
const nbOfPeopleContainer = document.getElementById("nb-of-people-container");

const tipButtons = document.getElementsByClassName("button--tip");

const tipAmountPerPersonContainer = document.getElementById(
  "tip-amount-per-person"
);
const totalPerPersonContainer = document.getElementById("total-per-person");

billAmountInput.addEventListener("change", checkNbOfPeople);

for (let tipButton of tipButtons) {
  tipButton.addEventListener("click", setTipPercentage);
}

nbOfPeopleInput.addEventListener("change", checkNbOfPeople);

let tipPercentage = 0; // as a number between 0 and 1

function checkNbOfPeople() {
  const billAmount = getBillAmount();
  const nbOfPeople = getNbOfPeople();

  if (isValidAmount(billAmount)) {
    if (isValidNbOfPeople(nbOfPeople)) {
      displayTipAndTotalPerPerson();
    } else {
      nbOfPeopleContainer.classList.add("card__input-field--error");
      nbOfPeopleError.classList.add("show-error");
    }
  }
}

function displayTipAndTotalPerPerson() {
  nbOfPeopleContainer.classList.remove("card__input-field--error");
  nbOfPeopleError.classList.remove("show-error");

  const tipAmountPerPerson = getTipAmountPerPerson();
  const totalPerPerson = getTotalPerPerson();

  tipAmountPerPersonContainer.textContent = `${formatPrice(
    tipAmountPerPerson
  )}`;
  totalPerPersonContainer.textContent = `${formatPrice(totalPerPerson)}`;
}

function setTipPercentage(event) {
  const tipValue = event.target.textContent;

  tipPercentage = parseTipValue(tipValue);

  const nbOfPeople = getNbOfPeople();

  if (isValidNbOfPeople(nbOfPeople)) {
    displayTipAndTotalPerPerson();
  }
}

function parseTipValue(value) {
  if (value === "Custom") {
    return 0;
  }

  return parseFloat(value.replace("%", "")) / 100;
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

function getTipAmountPerPerson() {
  const billAmount = getBillAmount();
  const nbOfPeople = getNbOfPeople();

  return (billAmount * tipPercentage) / nbOfPeople;
}

function getTotalPerPerson() {
  const billAmount = getBillAmount();
  const nbOfPeople = getNbOfPeople();
  const tipAmount = getTipAmountPerPerson();

  return billAmount / nbOfPeople + tipAmount;
}

function formatPrice(price) {
  const strPrice = price.toFixed(2).toString();
  const [integerPart, decimalPart] = strPrice.split(".");

  return `${integerPart}.${decimalPart}`;
}
