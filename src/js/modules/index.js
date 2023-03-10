"use strict";
let f = document.querySelector("#nationalites");

function getNationalities() { //национальности для селекта
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

const day = document.querySelector(".day");

function getDay() { //день для селекта
	const dayOptions = [];

	for (let i = 1; i <= 31; i++) {
		dayOptions.push(`<option class="day__option" value=${i}>${i}</option>`);
	}

	day.innerHTML = dayOptions.join("");
}

let mounth = document.querySelector(".mounth");

function getMounth() { //месяц для селекта
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

const year = document.querySelector(".year");

function getYear() { //год для селекта
	const yearOptions = [];

	let today = new Date();
	let fillYear = today.getFullYear();

	for (let i = fillYear; i >= 1920; i--) {
		yearOptions.push(`<option class="year__option" value=${i}>${i}</option>`);
	}

	year.innerHTML = yearOptions.join("");
}

export { getNationalities, getDay, getMounth, getYear }; //экспортируем

const emailInput = document.querySelector(".email__validate");

function handleInput() {
	const inputValue = this.value.trim();

	if (
		/[^\u0000-\u007F]/.test(inputValue) ||
		!inputValue.includes("@") || //проверка на наличие собачки
		!inputValue.includes(".") //проверка на наличие точки
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

	// проверка на количество знаков больше 8
	if (password.length < 8) {
		passwordError.innerHTML = "Password must be at least 8 characters long";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// проверка на наличие больших и маленьких букв
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	if (!hasUpperCase || !hasLowerCase) {
		passwordError.innerHTML =
			"Password must have at least one uppercase letter and one lowercase letter";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// проверка на наличие чисел
	const hasDigit = /[0-9]/.test(password);
	if (!hasDigit) {
		passwordError.innerHTML = "Password must have at least one digit";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// сверяем пароль и повтор пароля
	if (password !== confirmPassword) {
		passwordError.innerHTML = "Passwords do not match";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// ограничиваем длинну пароля
	if (password.length > 30) {
		passwordError.innerHTML = "Password is too long";
		passwordInput.classList.add("invalid"); // добавляем класс невалидного инпута
		return;
	}

	// убираем сообщение если все правильно
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

input.addEventListener("input", () => { //валидация имени
	validateInput(
		input,
		errorDiv,
		"Only letters and numbers are allowed",
		"invalid"
	);
});

input2.addEventListener("input", () => { //валидация фамилии
	validateInput(
		input2,
		errorDiv2,
		"Only letters and numbers are allowed",
		"invalid"
	);
});

const submitButton = document.querySelector(".form__button");
let xhr = new XMLHttpRequest();

// добавляем обработчик события нажатия на кнопку
submitButton.addEventListener("click", function (event) {
	event.preventDefault(); // отменяем стандартное поведение браузера при отправке формы
	sendFormData(); // отправляем данные формы на сервер
});

function sendFormData() {
	const formData = { //собираем значения формы
		firstName: document.querySelector("#validate__name").value,
		lastName: document.querySelector("#validate__name2").value,
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
	alert(res.result); //функция для отображения
}

function handleResponse() {
	if (xhr.readyState != 4) return;

	if (xhr.status != 200) {
		xhr.open("GET", "json/server-err.json", true); //адрес отрицательного запроса
		xhr.send(null);
		let result = JSON.parse(xhr.responseText);
		showResult(result);
	} else {
		let result = JSON.parse(xhr.responseText);
		showResult(result);
	}
}

xhr.onreadystatechange = handleResponse;
