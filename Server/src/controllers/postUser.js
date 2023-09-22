const User = require("../DB_connection");

const postUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send("Faltan datos");
    } else {
      const newUser = await User.create({ email: email, password: password });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
