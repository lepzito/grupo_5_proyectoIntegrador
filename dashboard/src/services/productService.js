export async function getProducts() {
  try {
    let allProducts = [];
    let nextPage = 1;

    do {
      const response = await fetch(
        `http://localhost:3001/api/products?page=${nextPage}`
      );
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("Error al conectarse con la DB");
      }

      allProducts = allProducts.concat(data.products);
      nextPage = data.next ? nextPage + 1 : null;
    } while (nextPage);

    return allProducts;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`http://localhost:3001/api/products/${id}`);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error("Error al obtener el producto");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
