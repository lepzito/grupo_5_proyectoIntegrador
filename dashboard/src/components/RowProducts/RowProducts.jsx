import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import { getProducts } from "../../services/productService";
import { getUsers } from "../../services/userService";
function RowProducts() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const products = await getProducts();
        setTotalProducts(products.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const users = await getUsers();
        setTotalUsers(users.length);
      } catch (error) {
        console.error(error);
      }
    };

    // Llamadas a ambos servicios
    fetchTotalProducts();
    fetchTotalUsers();
    const countByCategory = {
      Monitores: 1,
      Escritorio: 3,
      Gamer: 1,
      Auriculares: 1,
      "Partes de PC": 1,
      Teclado: 0,
      "PC Armada": 1,
      Celular: 2,
    };

    setTotalCategories(Object.keys(countByCategory).length);
  }, []);

  const listado = [
    {
      titulo: "Total de Productos",
      cifra: totalProducts,
      color: "primary",
      icono: "fas fa-cloud fa-2x",
    },
    {
      titulo: "Total de Usuarios",
      cifra: totalUsers,
      color: "success",
      icono: "fas fa-user fa-2x",
    },
    {
      titulo: "Total de Categorias",
      cifra: totalCategories,
      color: "warning",
      icono: "fas fa-user fa-2x",
    },
  ];

  return (
    <div className="row">
      {Array.isArray(listado) &&
        listado.map((card, i) => (
          <Card
            key={i + card}
            titulo={card.titulo}
            cifra={card.cifra}
            color={card.color}
            icono={card.icono}
            config={card.config}
          />
        ))}
    </div>
  );
}

export default RowProducts;
