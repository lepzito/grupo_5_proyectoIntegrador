import React from "react";

const Row = ({ product }) => {
  return (
    <tr className="text-dark">
      <td className="bg-warning">{product.nombre}</td>
      <td className="bg-light">{product.precio}</td>
      <td className="bg-light">
        {product.descuento ? product.descuento : "No"}
      </td>
      <td className="bg-light">{product.marca.nombre}</td>
      <td className="bg-light">{product.tipo.nombre}</td>
    </tr>
  );
};

export default Row;
