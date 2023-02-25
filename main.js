let cardField = document.getElementById("cardNumber");
let cc_name = document.getElementById("name");
let month = document.getElementById("month");
let year = document.getElementById("year");
let cardMonth = document.getElementById("left-month");
let cardYear = document.getElementById("left-year");
let cardName = document.querySelector(".card-name");
let cardNumUpdate = document.querySelector(".card-number");
let cvcNumber = document.getElementById("cvc-back");
let cvc = document.getElementById("cvc");

const defualtValues = {
  cardNameDef: "JANE APPLESEED",
  cardMonthDef: "00",
  cardYearDef: "00",
  cardCvcDef: "000",
  cardNumberDef: "0000 0000 0000 0000",
};

cc_name.addEventListener("input", () => {
  update(cc_name, cardName, "cardNameDef");
});
month.addEventListener("input", () => {
  update(month, cardMonth, "cardMonthDef");
});
year.addEventListener("input", () => {
  update(year, cardYear, "cardYearDef");
});
cardField.addEventListener("input", () => {
  update(cardField, cardNumUpdate, "cardNumberDef");
});
cvc.addEventListener("input", () => {
  update(cvc, cvcNumber, "cardCvcDef");
});

function formatCreditCardOnKey(event) {
  //on keyup, check for backspace to skip processing
  var code = event.which ? event.which : event.keyCode;
  if (code != 8) formatCreditCard();
  else {
    //trim whitespace from end; trimEnd() doesn't work in IE
    document.getElementById("cardNumber").value = document
      .getElementById("cardNumber")
      .value.replace(/\s+$/, "");
  }
}

function formatCreditCard() {
  //remove all non-numeric characters
  var realNumber = cardField.value.replace(/\D/g, "");
  var newNumber = "";
  for (var x = 1; x <= realNumber.length; x++) {
    //make sure input is a digit
    if (isNumeric(realNumber.charAt(x - 1)))
      newNumber += realNumber.charAt(x - 1);
    //add space every 4 numeric digits
    if (x % 4 == 0 && x > 0 && x < 15) newNumber += " ";
  }
  return (cardField.value = newNumber);
}

function isNumeric(char) {
  return "0123456789".indexOf(char) !== -1;
}

function update(element, origin, defaultKey) {
  if (element.value == "") {
    origin.innerHTML = defualtValues[defaultKey];
  } else {
    if (defaultKey == "cardNumberDef") {
      let str = defualtValues[defaultKey];

      str = element.value + str.slice(element.value.length);

      origin.innerHTML = str;
    } else {
      origin.innerHTML = element.value;
    }
  }

  // if (element.value == "") {
  //   origin.innerHTML = defualtValue;
  // }
  // else{
  //   origin.innerHTML = element.value;
  // }
  // for(let i= cardField.length; i <= 19 ; i++){
  //   let j = cardField.value
  //     j.charAt(x-1) = origin.innerHTML[0];
  //   }
}

let button = document.getElementById("continueBtn");
let button2 = document.getElementById("tyBtn");
let afterContinue = document.querySelector(".afterContinue");
let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("input", () => checkField(input));
});
button.addEventListener("click", () => {
  checkFields(inputs);
  verify();
});
button2.addEventListener("click", (e2) => {
  afterContinue.classList.add("hide");
  afterContinue.classList.remove("show");
  form.classList.remove("hide");
  form.reset();
  removeAll(inputs);
  function removeAll(element) {
    element.forEach(remove);
  }
});
function remove(element) {
  element.classList.remove("error");
}
function clearInput(element) {
  element.reset();
}
// check if any input is empty

function checkFields(element) {
  element.forEach(checkField);
}

function checkField(element) {
  if (element.value == "") {
    element.classList.add("error-check");
  } else {
    element.classList.remove("error-check");
  }
}

function verify() {
  let valid = true;
  let nameErr = document.getElementById("nameError");
  let numberErr = document.getElementById("numberError");
  let monthErr = document.getElementById("monthError");
  let yearErr = document.getElementById("yearError");
  let cvcErr = document.getElementById("cvcError");
  let errors = document.querySelectorAll("error");

  if (
    (cc_name.value &&
      cardField.value &&
      month.value &&
      year.value &&
      cvc.value) == ""
  ) {
    errors.forEach((e) => {
      e.classList.add("show");
      e.classList.remove("hide");
    });

    return (valid = false);
  } else if (cardField.value == "" || cardField.value.length < 19) {
    numberErr.classList.add("show");
    numberErr.classList.remove("hide");
    return (valid = false);
  } else if (month.value == "") {
    monthErr.classList.add("show");
    monthErr.classList.remove("hide");
    return (valid = false);
  } else if (year.value == "") {
    yearErr.classList.add("show");
    yearErr.classList.remove("hide");
    return (valid = false);
  } else if (cvc.value == "") {
    cvcErr.classList.add("show");
    cvcErr.classList.remove("hide");
    return (valid = false);
  } else {
    afterContinue.classList.add("show");
    afterContinue.classList.remove("hide");
    form.classList.add("hide");
  }

  console.log(valid);
}

// afterContinue.classList.add("show");
// afterContinue.classList.remove("hide");
// form.classList.add("hide");|| cc_name.value != / \d+ /)
