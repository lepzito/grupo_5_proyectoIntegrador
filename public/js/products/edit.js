document.addEventListener("DOMContentLoaded", function () {
  const nombreInput = document.getElementById("nombre");
  const nombreValidation = document.getElementById("nombreValidation");

  const precioInput = document.getElementById("precio");
  const precioValidation = document.getElementById("precioValidation");

  const descripcionInput = document.getElementById("descripcion");
  const descripcionValidation = document.getElementById(
    "descripcionValidation"
  );

  const imagenInput = document.getElementById("productImage");
  const imagenValidation = document.getElementById("imagenValidation");

  const form = document.getElementById("productEdit");

  function showError(input, validation, message) {
    validation.innerHTML = message;
    validation.style.display = "block";
  }

  function hideError(validation) {
    validation.innerHTML = "";
    validation.style.display = "none";
  }

  function validateLength(value, minLength) {
    return value.length >= minLength;
  }
  function validateInput(
    input,
    validation,
    minLength,
    requiredMessage,
    lengthMessage
  ) {
    const value = input.value.trim();

    if (value === "") {
      showError(input, validation, requiredMessage);
      return false;
    } else {
      if (!validateLength(value, minLength)) {
        showError(input, validation, lengthMessage);
        return false;
      } else {
        hideError(validation);
        return true;
      }
    }
  }
  function validateImage() {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileName = imagenInput.value.toLowerCase();

    if (fileName && !validateFileExtension(fileName, allowedExtensions)) {
      showError(
        imagenInput,
        imagenValidation,
        "Formato de archivo no válido. Por favor, selecciona un archivo JPG, JPEG, PNG o GIF."
      );
      return false;
    } else {
      hideError(imagenValidation);
      return true;
    }
  }

  function validateFileExtension(fileName, allowedExtensions) {
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }
  nombreInput.addEventListener("blur", function () {
    validateInput(
      nombreInput,
      nombreValidation,
      5,
      "Este campo es obligatorio",
      "El nombre debe tener al menos 5 caracteres"
    );
  });

  precioInput.addEventListener("blur", function () {
    validateInput(
      precioInput,
      precioValidation,
      1,
      "Este campo es obligatorio"
    );
  });

  descripcionInput.addEventListener("blur", function () {
    validateInput(
      descripcionInput,
      descripcionValidation,
      20,
      "Este campo es obligatorio",
      "La descripción debe tener al menos 20 caracteres"
    );
  });

  imagenInput.addEventListener("change", function () {
    validateImage();
  });

  form.addEventListener("submit", function (event) {
    const nombreValid = validateInput(
      nombreInput,
      nombreValidation,
      5,
      "Este campo es obligatorio",
      "El nombre debe tener al menos 5 caracteres"
    );

    const precioValid = validateInput(
      precioInput,
      precioValidation,
      1,
      "Este campo es obligatorio"
    );

    const descripcionValid = validateInput(
      descripcionInput,
      descripcionValidation,
      20,
      "Este campo es obligatorio",
      "La descripción debe tener al menos 20 caracteres"
    );

    const imagenValid = validateImage();

    if (!nombreValid || !precioValid || !descripcionValid || !imagenValid) {
      event.preventDefault();
    }
  });
});
