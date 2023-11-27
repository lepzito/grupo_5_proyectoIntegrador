document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const emailValidation = document.getElementById("emailValidation");
  const passwordValidation = document.getElementById("passwordValidation");
  const loginValidation = document.getElementById("loginValidation");

  function showError(element, message) {
    element.innerText = message;
    element.style.display = "block";
  }

  function hideError(element) {
    element.innerText = "";
    element.style.display = "none";
  }

  function validateEmail(value) {
    if (value === "") {
      showError(emailValidation, "Por favor, ingresa tu correo electrónico.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(emailValidation, "Ingresa un correo electrónico válido.");
      return false;
    }

    hideError(emailValidation);
    return true;
  }

  function validatePassword(value) {
    if (value.trim() === "") {
      showError(passwordValidation, "Por favor, ingresa tu contraseña.");
      return false;
    }

    hideError(passwordValidation);
    return true;
  }

  function validateLoginForm() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    hideError(loginValidation);

    let hasError = false;

    if (!validateEmail(emailValue)) {
      hasError = true;
    }

    if (!validatePassword(passwordValue)) {
      hasError = true;
    }

    return hasError;
  }

  emailInput.addEventListener("blur", function () {
    validateEmail(emailInput.value.trim());
  });

  passwordInput.addEventListener("blur", function () {
    validatePassword(passwordInput.value);
  });

  loginBtn.addEventListener("click", function (event) {
    if (validateLoginForm()) {
      event.preventDefault();
    }
  });
});
