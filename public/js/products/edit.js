document.addEventListener("DOMContentLoaded", function () {
  const nombreInput = document.getElementById("nombre");
  const nombreValidation = document.getElementById("nombreValidation");

  const precioInput = document.getElementById("precio");
  const precioValidation = document.getElementById("precioValidation");

  const categoriaInput = document.getElementById("tipo");
  const categoriaValidation = document.getElementById("categoriaValidation");

  const seccionInput = document.getElementById("seccion");
  const seccionValidation = document.getElementById("seccionValidation");

  const marcaInput = document.getElementById("marca");
  const marcaValidation = document.getElementById("marcaValidation");

  const descripcionInput = document.getElementById("descripcion");
  const descripcionValidation = document.getElementById(
    "descripcionValidation"
  );

  const imageInput = document.getElementById("img");
  const imageValidation = document.getElementById("imagenValidation");

  const form = document.getElementById("product-form");

  let isNewImageSelected = false;

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

  function validateSelect(value) {
    return value !== "";
  }

  function validateFileExtension(fileName, allowedExtensions) {
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  function validateInput(
    input,
    validation,
    minLength,
    requiredMessage,
    lengthMessage,
    selectMessage,
    fileMessage,
    allowedExtensions
  ) {
    const value = input.value.trim();

    if (value === "") {
      showError(input, validation, requiredMessage);
    } else {
      if (!validateLength(value, minLength)) {
        showError(input, validation, lengthMessage);
      } else {
        if (
          input === categoriaInput ||
          input === seccionInput ||
          input === marcaInput
        ) {
          if (!validateSelect(value)) {
            showError(input, validation, selectMessage);
          } else {
            hideError(validation);
          }
        } else if (input === imageInput) {
          if (isNewImageSelected) {
            const fileName = value.toLowerCase();
            if (!validateFileExtension(fileName, allowedExtensions)) {
              showError(input, validation, fileMessage);
            } else {
              hideError(validation);
            }
          } else {
            // No es necesario validar si no se ha seleccionado una nueva imagen
            hideError(validation);
          }
        } else {
          hideError(validation);
        }
      }
    }
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

  categoriaInput.addEventListener("blur", function () {
    validateInput(
      categoriaInput,
      categoriaValidation,
      1,
      "Selecciona una categoría"
    );
  });

  seccionInput.addEventListener("blur", function () {
    validateInput(seccionInput, seccionValidation, 1, "Selecciona una sección");
  });

  marcaInput.addEventListener("blur", function () {
    validateInput(marcaInput, marcaValidation, 1, "Selecciona una marca");
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

  imageInput.addEventListener("change", function () {
    isNewImageSelected = true;
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileName = this.value.toLowerCase();
    const fileExtension = fileName.split(".").pop();

    if (!validateFileExtension(fileName, allowedExtensions)) {
      showError(
        imageInput,
        imageValidation,
        "Formato de archivo no válido. Por favor, selecciona un archivo JPG, JPEG, PNG o GIF."
      );
    } else {
      hideError(imageValidation);
    }
  });

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

    const categoriaValid = validateInput(
      categoriaInput,
      categoriaValidation,
      1,
      "Selecciona una categoría"
    );

    const seccionValid = validateInput(
      seccionInput,
      seccionValidation,
      1,
      "Selecciona una sección"
    );

    const marcaValid = validateInput(
      marcaInput,
      marcaValidation,
      1,
      "Selecciona una marca"
    );

    const descripcionValid = validateInput(
      descripcionInput,
      descripcionValidation,
      20,
      "Este campo es obligatorio",
      "La descripción debe tener al menos 20 caracteres"
    );

    const imageValid = validateFileExtension(imageInput.value.toLowerCase(), [
      "jpg",
      "jpeg",
      "png",
      "gif",
    ]);

    // Validar si se ha seleccionado una imagen (solo si se ha seleccionado una nueva imagen)
    if (isNewImageSelected && imageInput.files.length === 0) {
      showError(imageInput, imageValidation, "Agrega una imagen");
    } else {
      hideError(imageValidation);
    }

    if (
      !nombreValid ||
      !precioValid ||
      !categoriaValid ||
      !seccionValid ||
      !marcaValid ||
      !descripcionValid ||
      (isNewImageSelected && !imageValid)
    ) {
      event.preventDefault();
    }
  });
});
