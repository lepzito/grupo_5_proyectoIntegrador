import React, { useRef } from "react";

function Input(props) {
  const { handleSearch = () => {} } = props;
  const inputRef = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let title = inputRef.current.value.trim();
      if (title !== "") {
        handleSearch(title);
      } else {
        alert("Por favor, ingresa un texto para buscar productos.");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-left ml-3">
      <label className="mr-2" htmlFor="buscador">
        Introducir título de la película:
      </label>
      <input
        type="text"
        id="buscador"
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </div>
  );
}

export default Input;
