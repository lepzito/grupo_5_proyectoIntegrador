document.addEventListener("DOMContentLoaded", function () {
  const nombreUsuarioInput = document.getElementById("nombreUsuario");
  const nombreUsuarioValidation = document.getElementById(
    "nombreUsuarioValidation"
  );

  const apellidoUsuarioInput = document.getElementById("apellidoUsuario");
  const apellidoUsuarioValidation = document.getElementById(
    "apellidoUsuarioValidation"
  );

  const emailInput = document.getElementById("email");
  const emailValidation = document.getElementById("emailValidation");

  const passwordInput = document.getElementById("password");
  const passwordValidation = document.getElementById("passwordValidation");

  const imageInput = document.getElementById("profile-image");
  const imageValidation = document.getElementById("imageValidation");
  const imagenPrevia = document.getElementById("imagenPrevia");

  // Función para previsualizar la imagen
  function previsualizarImagen() {
    if (imageInput.files && imageInput.files[0]) {
      const lector = new FileReader();

      lector.onload = function (e) {
        imagenPrevia.src = e.target.result;
        imagenPrevia.style.display = "block";
      };

      lector.readAsDataURL(imageInput.files[0]);
    }
  }

  const form = document.getElementById("register");

  function showError(input, validation, message) {
    validation.innerHTML = message;
    validation.style.display = "block";
  }

  function hideError(input, validation) {
    validation.innerHTML = "";
    validation.style.display = "none";
    input.classList.remove("input-error");
  }

  function validateLength(value, minLength) {
    return value.length >= minLength;
  }

  function validateLetters(value) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
  }

  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function validatePassword(value) {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const errorMessages = [];

    if (value.length < minLength) {
      errorMessages.push("-La contraseña debe tener al menos 8 caracteres.");
    }

    if (!uppercaseRegex.test(value)) {
      errorMessages.push("-Debe contener al menos una letra mayúscula.");
    }

    if (!lowercaseRegex.test(value)) {
      errorMessages.push("-Debe contener al menos una letra minúscula.");
    }

    if (!digitRegex.test(value)) {
      errorMessages.push("-Debe contener al menos un número.");
    }

    if (!specialCharacterRegex.test(value)) {
      errorMessages.push(
        `-Debe contener al menos un carácter especial: ${specialCharacterRegex}`
      );
    }

    return errorMessages;
  }

  function validateInput(
    input,
    validation,
    minLength,
    requiredMessage,
    lengthMessage,
    lettersMessage
  ) {
    const value = input.value.trim();

    if (value === "") {
      showError(input, validation, requiredMessage);
      return false;
    }

    if (!validateLength(value, minLength)) {
      showError(input, validation, lengthMessage);
      return false;
    }

    // Las siguientes validaciones son específicas para algunos campos
    if (
      (input === nombreUsuarioInput || input === apellidoUsuarioInput) &&
      !validateLetters(value)
    ) {
      showError(input, validation, lettersMessage);
      return false;
    }

    if (input === emailInput && !validateEmail(value)) {
      showError(input, validation, "Correo electrónico no válido");
      return false;
    }

    if (input === passwordInput) {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        showError(input, validation, passwordErrors.join("<br/>"));
        return false;
      }
    }

    // Si todas las validaciones pasan, ocultar los errores y retornar true
    hideError(input, validation);
    return true;
  }

  nombreUsuarioInput.addEventListener("blur", function () {
    validateInput(
      nombreUsuarioInput,
      nombreUsuarioValidation,
      2,
      "Este campo es obligatorio",
      "El nombre debe tener al menos 2 caracteres",
      "Ingrese solo letras"
    );
  });

  apellidoUsuarioInput.addEventListener("blur", function () {
    validateInput(
      apellidoUsuarioInput,
      apellidoUsuarioValidation,
      2,
      "Este campo es obligatorio",
      "El apellido debe tener al menos 2 caracteres",
      "Ingrese solo letras"
    );
  });

  emailInput.addEventListener("blur", function () {
    validateInput(emailInput, emailValidation, 1, "Este campo es obligatorio");
  });

  passwordInput.addEventListener("blur", function () {
    const errorMessages = validatePassword(passwordInput.value.trim());

    if (errorMessages.length > 0) {
      showError(passwordInput, passwordValidation, errorMessages.join("<br/>"));
    } else {
      hideError(passwordInput, passwordValidation);
    }
  });
  imageInput.addEventListener("input", function () {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileName = this.value.toLowerCase();
    const fileExtension = fileName.split(".").pop();

    if (!allowedExtensions.includes(fileExtension)) {
      imageValidation.innerText =
        "Formato de archivo no válido. Por favor, selecciona un archivo JPG, JPEG, PNG o GIF.";
      imageValidation.style.display = "block";
    } else {
      imageValidation.innerText = "";
      imageValidation.style.display = "none";
      // Previsualizar la imagen seleccionada
      previsualizarImagen();
    }
  });

  form.addEventListener("submit", function (event) {
    // Realiza la validación para cada campo antes de enviar el formulario
    const nombreUsuarioValid = validateInput(
      nombreUsuarioInput,
      nombreUsuarioValidation,
      2,
      "Este campo es obligatorio",
      "El nombre debe tener al menos 2 caracteres",
      "Ingrese solo letras"
    );

    const apellidoUsuarioValid = validateInput(
      apellidoUsuarioInput,
      apellidoUsuarioValidation,
      2,
      "Este campo es obligatorio",
      "El apellido debe tener al menos 2 caracteres",
      "Ingrese solo letras"
    );

    const emailValid = validateInput(
      emailInput,
      emailValidation,
      1,
      "Este campo es obligatorio"
    );

    const passwordValid = validatePassword(passwordInput.value.trim());

    const imageValid = (() => {
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileName = imageInput.value.toLowerCase();
      const fileExtension = fileName.split(".").pop();
      return allowedExtensions.includes(fileExtension);
    })();

    if (
      !nombreUsuarioValid ||
      !apellidoUsuarioValid ||
      !emailValid ||
      passwordValid.length > 0 ||
      !imageValid
    ) {
      event.preventDefault();

      validateInput(
        nombreUsuarioInput,
        nombreUsuarioValidation,
        2,
        "Este campo es obligatorio",
        "El nombre debe tener al menos 2 caracteres",
        "Ingrese solo letras"
      );

      validateInput(
        apellidoUsuarioInput,
        apellidoUsuarioValidation,
        2,
        "Este campo es obligatorio",
        "El apellido debe tener al menos 2 caracteres",
        "Ingrese solo letras"
      );

      validateInput(
        emailInput,
        emailValidation,
        1,
        "Este campo es obligatorio"
      );

      const passwordErrors = validatePassword(passwordInput.value.trim());
      if (passwordErrors.length > 0) {
        showError(
          passwordInput,
          passwordValidation,
          passwordErrors.join("<br/>")
        );
      }

      if (!imageValid) {
        imageValidation.innerText =
          "Formato de archivo no válido. Por favor, selecciona un archivo JPG, JPEG, PNG o GIF.";
        imageValidation.style.display = "block";
      }
    }
  });
});
