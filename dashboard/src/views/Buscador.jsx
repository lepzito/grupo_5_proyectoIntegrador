import React, { useState, useEffect } from "react";
import Card from "../components/ContentRow/Card/Card";
import Input from "../components/Input/Input";
import { getProducts } from "../services/productService";

function Buscador() {
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchProducts = async (title) => {
    setSearched(true);

    if (title.trim() === "") {
      setProducts([]);
      return;
    }

    try {
      const productsData = await getProducts();

      const filteredProducts = productsData.filter((product) =>
        product.nombre.toLowerCase().includes(title.toLowerCase())
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Input handleSearch={searchProducts} />
      {searched && products.length > 0 && (
        <div>
          {products.map((product) => (
            <Card key={product.id} title={product?.nombre}></Card>
          ))}
        </div>
      )}
      {searched && products.length === 0 && (
        <p>No se encontraron productos para la búsqueda ingresada.</p>
      )}
    </>
  );
}

export default Buscador;
