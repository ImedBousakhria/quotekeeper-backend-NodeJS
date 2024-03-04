const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new category
router.post("/post_category", async (req, res) => {
  const category = new Category({
    name: req.body.name
  });
  try {
    const new_category = await Category.create(category);
    // or :   const newCategory = await category.save();

    res.status(201).json(new_category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT/update a category by ID
router.put("/update/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (req.body.name != null) {
      category.name = req.body.name;
    }
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a category by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.deleteOne({_id: id})
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
