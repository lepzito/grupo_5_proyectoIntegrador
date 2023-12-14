export async function getUsers() {
  try {
    let allUsers = [];
    let nextPage = 1;

    do {
      const response = await fetch(
        `http://localhost:3001/api/users?page=${nextPage}`
      );
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("Error al conectarse con la DB");
      }

      allUsers = allUsers.concat(data.users);
      nextPage = data.next ? nextPage + 1 : null;
    } while (nextPage);

    return allUsers;
  } catch (error) {
    console.error(error);
  }
}
