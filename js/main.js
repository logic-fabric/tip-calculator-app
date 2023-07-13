const billAmountInput = document.getElementById("bill-amount");

const nbOfPeopleInput = document.getElementById("nb-of-people");
const nbOfPeopleError = document.getElementById("nb-of-people-error");
const nbOfPeopleContainer = document.getElementById("nb-of-people-container");

const tipButtons = document.getElementsByClassName("button--tip");
const customTipButton = document.getElementById("custom-tip-button");

const tipAmountPerPersonContainer = document.getElementById(
  "tip-amount-per-person"
);
const totalPerPersonContainer = document.getElementById("total-per-person");

billAmountInput.addEventListener("change", checkNbOfPeople);
nbOfPeopleInput.addEventListener("change", checkNbOfPeople);

for (let tipButton of tipButtons) {
  tipButton.addEventListener("click", setTipPercentage);
}

customTipButton.addEventListener("click", setTipPercentage);

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

function getTipAmountPerPerson() {
  const billAmount = getBillAmount();
  const nbOfPeople = getNbOfPeople();

  const tipAmountByPerson = (billAmount * tipPercentage) / nbOfPeople;

  return tipAmountByPerson ? tipAmountByPerson : 0;
}

function getTotalPerPerson() {
  const billAmount = getBillAmount();
  const nbOfPeople = getNbOfPeople();
  const tipAmount = getTipAmountPerPerson();

  const totalPerPerson = billAmount / nbOfPeople + tipAmount;

  return totalPerPerson ? totalPerPerson : 0;
}

function formatPrice(price) {
  const strPrice = price.toFixed(2).toString();
  const [integerPart, decimalPart] = strPrice.split(".");

  return `$${integerPart}.${decimalPart}`;
}

function setTipPercentage(event) {
  const tipValue = event.target.textContent;

  if (tipValue === "Custom") {
    replaceCustomTipButtonByInput();
  } else {
    replaceCustomTipInputByButton();

    tipPercentage = parseTipValue(tipValue);
  }

  showActiveTipButton(event);

  const nbOfPeople = getNbOfPeople();

  if (isValidNbOfPeople(nbOfPeople)) {
    displayTipAndTotalPerPerson();
  }
}

function replaceCustomTipButtonByInput() {
  const customTipContainer = document.getElementById("custom-tip-container");

  customTipContainer.innerHTML = `
    <input
      id="custom-tip-input"
      type="number"
      placeholder="0"
      defaultValue="0"
      min="0"
    />`;

  const customTipInput = document.getElementById("custom-tip-input");

  customTipInput.addEventListener("change", setCustomTipPercentage);
}

function setCustomTipPercentage(event) {
  const customTipInputValue = event.target.value;

  if (customTipInputValue) {
    tipPercentage = parseInt(customTipInputValue) / 100;
  }

  displayTipAndTotalPerPerson();
}

function replaceCustomTipInputByButton() {
  const customTipContainer = document.getElementById("custom-tip-container");

  customTipContainer.innerHTML = `
    <button
      id="custom-tip-button"
      class="button--tip"
      type="button"
    >Custom</button>`;

  const customTipButton = document.getElementById("custom-tip-button");

  customTipButton.addEventListener("click", setTipPercentage);
}

function parseTipValue(value) {
  return parseFloat(value.replace("%", "")) / 100;
}

function showActiveTipButton(event) {
  const tipButtons = document.getElementsByClassName("button--tip");

  for (let tipButton of tipButtons) {
    tipButton.classList.remove("active");
  }

  event.target.classList.add("active");
}
