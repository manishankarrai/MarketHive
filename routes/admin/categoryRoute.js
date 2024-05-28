const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../../controller/categoryController");
const { authenticateAdminToken } = require("../../middleware/authenticateToken");

router.get("/test", (req, res) => {
  res.status(200).send({ message: "working" });
});

router.post("/store", authenticateAdminToken ,createCategory);
router.get("/get", getAllCategories);
router.post("/getbyid",  getCategoryById);
router.post("/update", authenticateAdminToken , updateCategory);
router.post("/delete", authenticateAdminToken , deleteCategory);

module.exports = router;
