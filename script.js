const output_year = document.querySelector(".output-y");
const output_month = document.querySelector(".output-m");
const output_day = document.querySelector(".output-d");
const submit_btn = document.querySelector(".submit-btn");
const input_year = document.querySelector("#year");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");
const error_day = document.querySelector(".error-d");
const error_month = document.querySelector(".error-m");
const error_year = document.querySelector(".error-y");

submit_btn.addEventListener("click", CalculateDate);

function getCurrentYear() {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

function validateInput(input, errorElement, maxValue, fieldName, required = false) {
  const value = +input.value;
  const labelElement = input.parentElement.querySelector('span'); // Get the label element associated with the input
  
  if (required && value === 0) {
    errorElement.textContent = `This field is required`;
    input.style.borderColor = "red"; // Set input border color to red
    labelElement.style.color = "red"; // Set label text color to red
	input.style.caretColor = "red";
    return false;
  }
  if (fieldName === "Month" && (value < 1 || value > 12 || isNaN(value))) {
    errorElement.textContent = `Must be a valid month`;
    input.style.borderColor = "red"; // Set input border color to red
    labelElement.style.color = "red"; // Set label text color to red
	input.style.caretColor = "red";
    return false;
  }
  if (fieldName === "Year" && (value < 1 || value > getCurrentYear() || isNaN(value))) {
    errorElement.textContent = `Must be in the past`;
    input.style.borderColor = "red"; // Set input border color to red
    labelElement.style.color = "red"; // Set label text color to red
	input.style.caretColor = "red";
    return false;
  }
  if (fieldName === "Day") {
    const monthValue = parseInt(input_month.value);
    const lastDayOfMonth = new Date(
      parseInt(input_year.value),
      monthValue,
      0
    ).getDate();
    if (value < 1 || value > lastDayOfMonth || isNaN(value)) {
      errorElement.textContent = `Must be a valid day`;
      input.style.borderColor = "red"; // Set input border color to red
      labelElement.style.color = "red"; // Set label text color to red
	  input.style.caretColor = "red";
      if (value >= 1 && value <= 31 && (monthValue === 4 || monthValue === 6 || monthValue === 9 || monthValue === 11)) {
        errorElement.textContent = "Must be a valid date";
      } else if (monthValue === 2 && value > 29) {
        errorElement.textContent = "Must be a valid date";
      }
      return false;
    }
  }
  // Clear error message, reset input border color, and reset label text color for the current input
  errorElement.textContent = "";
  input.style.borderColor = ""; // Reset input border color to default
  labelElement.style.color = ""; // Reset label text color to default
  input.style.caretColor = "";
  return true;
}

function isDateValid(year, month, day) {
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  return (
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= lastDayOfMonth &&
    year >= 1
  );
}

function CalculateDate() {
  // Clear previous error messages
  error_year.textContent = "";
  error_month.textContent = "";
  error_day.textContent = "";

  const year = parseInt(input_year.value);
  const month = parseInt(input_month.value);
  const day = parseInt(input_day.value);

  const isValidYear = validateInput(input_year, error_year, getCurrentYear(), "Year", true);
  const isValidMonth = validateInput(input_month, error_month, 12, "Month", true);
  const isValidDay = validateInput(input_day, error_day, 31, "Day", true); // Assuming maximum days in a month is 31

  if (isValidYear && isValidMonth && isValidDay) {
    const birthday = new Date(year, month - 1, day);
    const currentDate = new Date();

    // Calculate the difference in years, months, and days
    let ageYears = currentDate.getFullYear() - birthday.getFullYear();
    let ageMonths = currentDate.getMonth() - birthday.getMonth();
    let ageDays = currentDate.getDate() - birthday.getDate();

    // Adjust for negative values
    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    output_day.textContent = ageDays;
    output_month.textContent = ageMonths;
    output_year.textContent = ageYears;
  }
}


