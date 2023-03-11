"use strict";
let nationality = document.querySelector("#nationalites");
let emailInvalid = document.querySelector(".invalid__email");
const input = document.querySelector("#validate__name");
const errorDiv = document.querySelector("#name_invalid");
const input2 = document.querySelector("#last-name_invalid");
const errorDiv2 = document.querySelector("#errorDiv2");
const day = document.querySelector(".day");
let mounth = document.querySelector(".mounth");
const year = document.querySelector(".year");
const emailInput = document.querySelector(".email__validate");
const submitButton = document.querySelector(".form__button");
const passwordInput = document.querySelector("#inputPassword4");
const confirmPasswordInput = document.querySelector("#confirmPasswordInput");
const passwordError = document.querySelector("#password-error");

function getNationalities() {
	//национальности для селекта
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

	nationality.innerHTML = nationalitiesOptions.join("");
}

function getDay() {
	//день для селекта
	const dayOptions = [];

	for (let i = 1; i <= 31; i++) {
		dayOptions.push(`<option class="day__option" value=${i}>${i}</option>`);
	}

	day.innerHTML = dayOptions.join("");
}

function getMounth() {
	//месяц для селекта
	const mounths = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const mounthsOptions = mounths.map((mounths) => {
		return `<option  class="mounths__option" value=${mounths}>${mounths}</option>`;
	});

	mounth.innerHTML = mounthsOptions.join("");
}

function getYear() {
	//год для селекта
	const yearOptions = [];

	let today = new Date();
	let fillYear = today.getFullYear();

	for (let i = fillYear; i >= 1920; i--) {
		yearOptions.push(`<option class="year__option" value=${i}>${i}</option>`);
	}

	year.innerHTML = yearOptions.join("");
}

export { getNationalities, getDay, getMounth, getYear }; //экспортируем

function handleEmail() {
	const inputValue = this.value.trim();

	if (
		!/^[a-zA-Z0-9._@]+$/.test(inputValue) ||
		!inputValue.includes("@") || //проверка на наличие собачки
		!inputValue.includes(".") //проверка на наличие точки
	) {
		this.classList.add("invalid");
		this.classList.remove("valid");
		emailInvalid.innerHTML =
			"Email only include: latin letters, numbers, at, dot, and underscores";
	} else {
		this.classList.remove("invalid");
		this.classList.add("valid");
		emailInvalid.innerHTML = "";
	}

	// check if any input field has the invalid class
	if (document.querySelector(".invalid")) {
		submitButton.disabled = true;
	} else {
		submitButton.disabled = false;
	}
}

emailInput.addEventListener("input", handleEmail);

passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);

function validatePassword() {
	const password = passwordInput.value;
	const confirmPassword = confirmPasswordInput.value;

	// проверка на количество знаков больше 8
	if (password.length < 8) {
		passwordError.innerHTML = "Password must be at least 8 characters long";
		passwordInput.classList.add("invalid");
		submitButton.disabled = true;
		cancelSend(); // добавляем класс невалидного инпута
		return;
	}

	// проверка на наличие больших и маленьких букв
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	if (!hasUpperCase || !hasLowerCase) {
		passwordError.innerHTML =
			"Password must have at least one uppercase letter and one lowercase letter";
		passwordInput.classList.add("invalid");
		submitButton.disabled = true; // добавляем класс невалидного инпута
		return;
	}

	// проверка на наличие чисел
	const hasDigit = /[0-9]/.test(password);
	if (!hasDigit) {
		passwordError.innerHTML = "Password must have at least one digit";
		passwordInput.classList.add("invalid");
		submitButton.disabled = true; // добавляем класс невалидного инпута
		return;
	}

	// сверяем пароль и повтор пароля
	if (password !== confirmPassword) {
		passwordError.innerHTML = "Passwords do not match";
		passwordInput.classList.add("invalid");
		submitButton.disabled = true; // добавляем класс невалидного инпута
		return;
	}

	// ограничиваем длинну пароля
	if (password.length > 30) {
		passwordError.innerHTML = "Password is too long";
		passwordInput.classList.add("invalid");
		submitButton.disabled = true; // добавляем класс невалидного инпута
		return;
	}

	// убираем сообщение если все правильно
	passwordError.innerHTML = "";
	submitButton.disabled = false;
	passwordInput.classList.remove("invalid");
}

function handleNames(input, errorDiv, errorMessage, invalidClass) {
	const value = input.value;
	const regex = /^[a-zA-Z0-9]+$/;

	if (!regex.test(value)) {
		errorDiv.innerHTML = errorMessage;
		input.classList.add(invalidClass);
		submitButton.disabled = true; // добавляем класс невалидного инпута
	} else {
		errorDiv.innerHTML = "";
		input.classList.remove(invalidClass);
		submitButton.disabled = false; // удаляем класс невалидного инпута
	}
}

input.addEventListener("input", () => {
	//валидация имени
	handleNames(
		input,
		errorDiv,
		"Only letters and numbers are allowed",
		"invalid"
	);
});

input2.addEventListener("input", () => {
	//валидация фамилии
	handleNames(
		input2,
		errorDiv2,
		"Only letters and numbers are allowed",
		"invalid"
	);
});

let xhr = new XMLHttpRequest();

// добавляем обработчик события нажатия на кнопку
submitButton.addEventListener("click", function (event) {
	event.preventDefault(); // отменяем стандартное поведение браузера при отправке формы
	sendFormData(); // отправляем данные формы на сервер
});

function sendFormData() {
	const formData = {
		//собираем значения формы
		firstName: document.querySelector("#validate__name").value,
		lastName: document.querySelector("#last-name_invalid").value,
		nationality: document.querySelector("#nationalites").value,
		email: document.querySelector(".email__validate").value,
		day: document.querySelector(".day").value,
		mounth: document.querySelector(".mounth").value,
		year: document.querySelector(".year").value,
		gender: document.querySelector('input[name="exampleRadios"]:checked').value,
		confirmPassword: document.querySelector("#confirmPasswordInput").value,
	};

	xhr.open("GET", "json/server-ok.json", true); //адрес положительного запроса
	xhr.send(formData);
}

function showResult(res) {
	if (res.result === "err") {
		animateError();
	} else {
		alert(res.result);

		document.querySelector("#validate__name").value = "";
		document.querySelector("#last-name_invalid").value = "";
		document.querySelector("#nationalites").value = "";
		document.querySelector(".email__validate").value = "";
		document.querySelector(".day").value = "1";
		document.querySelector(".mounth").value = "January";
		document.querySelector(".year").value = "2023";
		document.querySelector('input[name="exampleRadios"]:checked').value =
			"male";
		document.querySelector("#confirmPasswordInput").value = "";
	}
}

function handleResponse() {
	if (xhr.readyState != 4) return;

	if (xhr.status != 200) {
		xhr.open("GET", "json/server-err.json", true); //адрес отрицательного запроса
		xhr.send(null);
	} else {
		//да, это костыль, без понятия почему это работает, но работает
		let result = JSON.parse(xhr.responseText);
		showResult(result);
	}
}

function animateError() {
	submitButton.animate(
		[
			// keyframes
			{ transform: "translateX(-10px)" },
			{ transform: "translateX(0)" },
			{ transform: "translateX(10px)" },
			{ transform: "translateX(0)" },
			{ transform: "translateX(-10px)" },
			{ transform: "translateX(0)" },
			{ transform: "translateX(10px)" },
			{ transform: "translateX(0)" },
			{ transform: "translateX(-10px)" },
			{ transform: "translateX(0)" },
			{ transform: "translateX(10px)" },
			{ transform: "translateX(0)" },
		],
		{
			// timing options
			duration: 700,
			iterations: 1,
		}
	);
}
xhr.onreadystatechange = handleResponse;
