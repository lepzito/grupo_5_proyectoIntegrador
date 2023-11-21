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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function validatePassword(value) {
    return value.trim() !== "";
  }

  function validateLoginForm() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    hideError(emailValidation);
    hideError(passwordValidation);
    hideError(loginValidation);

    let hasError = false;

    if (!validateEmail(emailValue)) {
      showError(emailValidation, "Ingresa un correo electrónico válido.");
      hasError = true;
    }

    if (!validatePassword(passwordValue)) {
      showError(passwordValidation, "Ingresa una contraseña.");
      hasError = true;
    }

    return hasError;
  }

  loginBtn.addEventListener("click", function (event) {
    if (validateLoginForm()) {
      event.preventDefault();
    }
  });

  emailInput.addEventListener("blur", function () {
    validateLoginForm();
  });

  passwordInput.addEventListener("blur", function () {
    validateLoginForm();
  });
});
