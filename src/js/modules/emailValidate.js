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


