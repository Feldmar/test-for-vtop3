'use strict'
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
		this.classList.add("invalid-email");
		console.log("err");
	} else {
		this.classList.remove("invalid-email");
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
		return;
	}

	// Check for uppercase and lowercase letters
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	if (!hasUpperCase || !hasLowerCase) {
		passwordError.innerHTML =
			"Password must have at least one uppercase letter and one lowercase letter";
		return;
	}

	// Check if passwords match
	if (password !== confirmPassword) {
		passwordError.innerHTML = "Passwords do not match";
		return;
	}

	// Clear error message if everything is valid
	passwordError.innerHTML = "";
}

const input = document.querySelectorAll("#validate__name");
const errorDiv = document.getElementById("errorDiv");

function validateInput() {
	const value = input.value;
	const regex = /^[a-zA-Z0-9]+$/;

	if (!regex.test(value)) {
		errorDiv.innerHTML = "Only letters and numbers are allowed";
	} else {
		errorDiv.innerHTML = "";
	}
}

input.addEventListener("input", validateInput);
