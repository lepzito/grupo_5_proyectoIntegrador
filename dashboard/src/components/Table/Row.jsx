import React from "react";

const Row = ({ product }) => {
  return (
    <tr>
      <td>{product.nombre}</td>
      <td>{product.precio}</td>
      <td>{product.descuento ? product.descuento : "No"}</td>
      <td>{product.marca.nombre}</td>
      <td>{product.tipo.nombre}</td>
    </tr>
  );
};

export default Row;
