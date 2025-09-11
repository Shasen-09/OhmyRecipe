const Users = require("../models/userModel"); // match your model filename


const getBookmarks = async (req, res) => {
  console.log("GET bookmarks - user:", req.user);

  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await Users.findById(req.user._id).select("bookmarks");
    return res.json(user?.bookmarks || []);
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


const addBookmark = async (req, res) => {
  console.log("POST bookmark - user:", req.user, "body:", req.body);

  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const { id, title, image } = req.body;
  if (!id) return res.status(400).json({ error: "Missing recipe id" });

  try {

    await Users.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { bookmarks: { id: Number(id), title, image } } },
      { new: true }
    );

    const user = await Users.findById(req.user._id).select("bookmarks");
    return res.json(user.bookmarks);
  } catch (err) {
    console.error("Error adding bookmark:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


const removeBookmark = async (req, res) => {
  console.log("DELETE bookmark - user:", req.user, "params:", req.params);

  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const recipeId = Number(req.params.id);
  if (!recipeId) return res.status(400).json({ error: "Invalid recipe id" });

  try {
    await Users.findByIdAndUpdate(
      req.user._id,
      { $pull: { bookmarks: { id: recipeId } } },
      { new: true }
    );

    const user = await Users.findById(req.user._id).select("bookmarks");
    return res.json(user.bookmarks);
  } catch (err) {
    console.error("Error removing bookmark:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
};
