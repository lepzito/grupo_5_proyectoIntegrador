import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import CategoryCard from "./CategoryCard/CategoryCard";

const ContentRow = () => {
  const [countByCategory, setCountByCategory] = useState({});
  const [latestProduct, setLatestProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la cantidad total de productos y calcular la última página
        const response = await fetch("http://localhost:3001/api/products");
        const data = await response.json();
        const totalPages = Math.ceil(data.totalCount / data.count);

        // Hacer una solicitud a la última página para obtener el último producto
        const lastPageResponse = await fetch(
          `http://localhost:3001/api/products/?page=${totalPages}`
        );
        const lastPageData = await lastPageResponse.json();

        // Obtener el último producto de la última página
        const lastProduct =
          lastPageData.products[lastPageData.products.length - 1];

        // Obtener la URL de la imagen del detalle
        const detailResponse = await fetch(
          `http://localhost:3001${lastProduct.detalle}`
        );
        const detailData = await detailResponse.json();
        const imageUrl = `http://localhost:3001${detailData.img}`;

        setCountByCategory(data.countByCategory);
        setLatestProduct({
          ...lastProduct,
          img: imageUrl,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <Card title={"Ultimo Producto Agregado en la Base de Datos"}>
        <div className="text-center">
          <p>{latestProduct.nombre}</p>
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: "20rem" }}
            src={latestProduct.img}
            alt={latestProduct.nombre}
          />
        </div>
        <p>{latestProduct.descripcion}</p>
        <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
          Ver detalles del producto
        </a>
      </Card>

      <Card title={"Total de Productos por Categoria"}>
        <div className="row">
          {Object.entries(countByCategory).map(([category, total]) => (
            <CategoryCard key={category} category={category} total={total} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ContentRow;
