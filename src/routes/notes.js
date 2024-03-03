const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Category = require("../models/Category")

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single note by ID
router.get("/:id", async (req, res) => {
  // Implement logic to find a single note by its ID
});

// POST a new note
router.post("/post_note", async (req, res) => {
  const { title, content, category: categoryName } = req.body;

  try {
    // Find category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      // return res.status(400).json({ message: "Category not found" });
    }

    const note = await Note.create({ title, content, category: category ? category._id : null });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT/update a note by ID
router.put("/:id", async (req, res) => {
  // Implement logic to update an existing note by its ID
});

// DELETE a note by ID
router.delete("/:id", async (req, res) => {
  // Implement logic to delete a note by its ID
});

module.exports = router;
