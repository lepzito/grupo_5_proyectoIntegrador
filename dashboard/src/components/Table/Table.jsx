import React, { useState, useEffect } from "react";
import Row from "./Row";
import { getProductById, getProducts } from "../../services/productService";

const Table = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/?page=${currentPage}`
        );
        const data = await response.json();

        setTotalPages(Math.ceil(data.totalCount / data.count));

        const productDetails = await Promise.all(
          data.products.map((product) => getProductById(product.id))
        );

        setProducts(productDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToHomePage = () => {
    setCurrentPage(1);
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio(ARS)</th>
            <th>Descuento%</th>
            <th>Marca</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product) => (
              <Row key={product.id} product={product} />
            ))}
        </tbody>
      </table>
      <div className=" col-5 d-flex justify-content-between mb-3 ">
        <button
          className="btn btn-primary"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="align-self-center">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
        <button className="btn btn-info" onClick={goToHomePage}>
          Inicio
        </button>
      </div>
    </div>
  );
};

export default Table;
