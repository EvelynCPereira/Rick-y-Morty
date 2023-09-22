const Favorite = require("../models/Favorite");

const postFav = async (req, res) => {
  const { name, origin, status, image, species, gender } = req.body;
  try {
    if (!name || !origin || !status || !image || !species || !gender) {
      res.status(401).send("Faltan datos");
    } else {
      await User.create({ name, origin, status, image, species, gender });
      const allChar = await Favorite.findAll();
      res.status(200).json(allChar);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postFav;
