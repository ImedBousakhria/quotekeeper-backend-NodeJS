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
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "No note with that id" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

// PUT/ update a note
router.put("/update_note/:id", async (req, res) => {
  const updates = req.body;
  const id = req.params.id;

  try {
    const note = await Note.findByIdAndUpdate(id, updates, { new: true });
    if (!note) return res.status(404).json({ message: "No note with this id!" });
    res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/notes/:id - delete a note based on the given id
router.delete('/delete_note/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const noteData = await Note.findById(id);
    if(!noteData){
      return res.status(404).json({message:"No note with this id!"})
    }
    
    await Note.remove({_id: id});
    res.status(200).json({message:'Deleted the note'});
  }catch{
    res.status(500).json({message: 'Failed to delete the note.'})
  }
  
});

module.exports = router;
