const Favorite = require("../models/Favorite");

const deleteFav = async (req, res) => {
  const { id } = req.params;
  try {
    await Favorite.destroy({ where: { id: id } });
    const allFav = await Favorite.findAll();
    res.status(200).json(allFav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteFav;
