const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../../controller/categoryController");

const { authenticateToken } = require("../../middleware/authenticateToken");

router.use(authenticateToken);
router.get("/test", (req, res) => {
  res.status(200).send({ message: "working" });
});

router.post("/store", createCategory);
router.get("/get", getAllCategories);
router.post("/getbyid", getCategoryById);
router.post("/update", updateCategory);
router.post("/delete", deleteCategory);

module.exports = router;
