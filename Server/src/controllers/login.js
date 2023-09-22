const User = require("../DB_connection");

const login = async (req, res) => {
  const { email, password } = req.query;
  try {
    if (!email || !password) {
      res.status(400).send("Faltan datos");
    } else {
      const foundUser = await User.findOne({ where: { email: email } });
      if (!foundUser) {
        res.status(404).send("Usuario no encontrado");
      } else if (foundUser.password === password) {
        res.status(200).json({ acces: true });
      } else {
        res.status(403).send("Contraseña incorrecta");
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;
