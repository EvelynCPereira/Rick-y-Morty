const app = require("../src/app");
const session = require("supertest");
const agent = session(app);
const users = require("../src/utils/users");
const user = users[0];

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const { body } = await agent.get("/rickandmorty/character/1");
      const atributes = [
        "id",
        "name",
        "species",
        "gender",
        "status",
        "origin",
        "image",
      ];
      const keys = Object.keys(body);

      atributes.forEach((atr) => expect(keys).toContain(atr));
    });

    it("Si hay un error responde con status: 500", async () => {
      await agent.get("/rickandmorty/character/900").expect(500);
    });
  });
  describe("GET /rickandmorty/login", () => {
    it("Responde con  success en true si  los datos son validos", async () => {
      const response = await agent.get(`
                /rickandmorty/login?email=${user.email}&password=${user.password}`);
      console.log(response.body);
      expect(response.body).toEqual({
        acceso: true,
      });
    });

    it("Responde con  success en false si los datos son invalidos", async () => {
      const response = await agent.get(
        `/rickandmorty/login?email=cabj&password=a12444`
      );

      expect(response.body).toEqual({
        acceso: false,
      });
    });
  });

  describe("POST rickandmorty/fav", () => {
    const char1 = { id: 1, name: "franco" },
      char2 = { id: 2, name: "cabj" };

    it("El nuevo character favorito debe ser devuelto en un arreglo", async () => {
      const { body } = await agent.post("/rickandmorty/fav").send(char1);
      expect(body).toContainEqual(char1);
    });

    it("Si se agrega otro elemento devuelve un array con el resto de elementos y el nuevo", async () => {
      const { body } = await agent.post("/rickandmorty/fav").send(char2);

      expect(body).toContainEqual(char1);
      expect(body).toContainEqual(char2);
    });
  });
  describe("DELETE /rickandmorty/fav/:id", () => {
    const char1 = { id: 1, name: "franco" },
      char2 = { id: 2, name: "cabj" };

    it("Si se envia un ID incorrecto, se devuelve el mismo array", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/799949");
      expect(body).toContainEqual(char1);
      expect(body).toContainEqual(char2);
    });

    it("Si se envia un ID correcto, se devuelve el array con dicho elemento eliminado", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/1");
      expect(body).not.toContainEqual(char1);
    });
  });
});
