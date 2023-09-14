const data = require("../utils/users");

function login(req, res) {
  const { email, password } = req.query;

  const coincide = data.find(
    (user) => user.email === email && user.password === password
  );

  let acceso = coincide ? true : false;

  res.status(200).json({ acceso });
}

module.exports = login;
