"use strict";
let f = document.querySelector("#nationalites");

function getNationalities() {
	const nationalities = [
		"American",
		"British",
		"Canadian",
		"Chinese",
		"French",
		"German",
		"Indian",
		"Italian",
		"Japanese",
		"Mexican",
		"Russian",
		"Spanish",
		"Other",
	];

	const nationalitiesOptions = nationalities.map((nationality) => {
		return `<option  class="nationality__option" value=${nationality}>${nationality}</option>`;
	});

	f.innerHTML = nationalitiesOptions.join("");
}

export { getNationalities };

const emailInput = document.querySelector(".email__validate");

function handleInput() {
	const inputValue = this.value.trim();

	if (
		/[^\u0000-\u007F]/.test(inputValue) ||
		!inputValue.includes("@") ||
		!inputValue.includes(".")
	) {
		this.classList.add("invalid");
		console.log("err");
	} else {
		this.classList.remove("invalid");
		console.log("noerr");
	}
}

emailInput.addEventListener("input", handleInput);

const passwordInput = document.getElementById("inputPassword4");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");
const passwordError = document.getElementById("password-error");

passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);

function validatePassword() {
	const password = passwordInput.value;
	const confirmPassword = confirmPasswordInput.value;

	// Check password length
	if (password.length < 8) {
		passwordError.innerHTML = "Password must be at least 8 characters long";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// Check for uppercase and lowercase letters
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	if (!hasUpperCase || !hasLowerCase) {
		passwordError.innerHTML =
			"Password must have at least one uppercase letter and one lowercase letter";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// Check for digits
	const hasDigit = /[0-9]/.test(password);
	if (!hasDigit) {
		passwordError.innerHTML = "Password must have at least one digit";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// Check if passwords match
	if (password !== confirmPassword) {
		passwordError.innerHTML = "Passwords do not match";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// Check maximum password length
	if (password.length > 50) {
		passwordError.innerHTML = "Password is too long";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// Clear error message if everything is valid
	passwordError.innerHTML = "";
}

function validateInput(input, errorDiv, errorMessage, invalidClass) {
	const value = input.value;
	const regex = /^[a-zA-Z0-9]+$/;

	if (!regex.test(value)) {
		errorDiv.innerHTML = errorMessage;
		input.classList.add(invalidClass); // добавляем класс невалидного инпута
	} else {
		errorDiv.innerHTML = "";
		input.classList.remove(invalidClass); // удаляем класс невалидного инпута
	}
}

const input = document.querySelector("#validate__name");
const errorDiv = document.getElementById("errorDiv");
const input2 = document.querySelector("#validate__name2");
const errorDiv2 = document.getElementById("errorDiv2");

input.addEventListener("input", () => {
	validateInput(
		input,
		errorDiv,
		"Only letters and numbers are allowed",
		"invalid"
	);
});

input2.addEventListener("input", () => {
	validateInput(
		input2,
		errorDiv2,
		"Only letters and numbers are allowed",
		"invalid"
	);
});
