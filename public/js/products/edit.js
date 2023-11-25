document.addEventListener("DOMContentLoaded", function () {
  const nombreInput = document.getElementById("nombre");
  const nombreValidation = document.getElementById("nombreValidation");

  const precioInput = document.getElementById("precio");
  const precioValidation = document.getElementById("precioValidation");

  const descripcionInput = document.getElementById("descripcion");
  const descripcionValidation = document.getElementById(
    "descripcionValidation"
  );

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

  form.addEventListener("submit", function (event) {
    // Realiza la validación para cada campo antes de enviar el formulario
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

    if (!nombreValid || !precioValid || !descripcionValid) {
      event.preventDefault();
    } else {
      console.log("Formulario válido, permitiendo el envío.");
    }
  });
});
