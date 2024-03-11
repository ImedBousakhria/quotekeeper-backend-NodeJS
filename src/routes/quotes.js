const express = require("express");
const router = express.Router();
const quote = require("../models/quote");
const Category = require("../models/Category")

// GET all quotes
router.get("/", async (req, res) => {
  try {
    const quotes = await quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single quote by ID
router.get("/:id", async (req, res) => {
  try {
    const quote = await quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "No quote with that id" });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new quote
router.post("/post_quote", async (req, res) => {
  const { title, content, category: categoryName } = req.body;

  try {
    // Find category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      // return res.status(400).json({ message: "Category not found" });
    }

    const quote = await quote.create({ title, content, category: category ? category._id : null });
    res.status(201).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT/ update a quote
router.put("/update_quote/:id", async (req, res) => {
  const updates = req.body;
  const id = req.params.id;

  try {
    const quote = await quote.findByIdAndUpdate(id, updates, { new: true });
    if (!quote) return res.status(404).json({ message: "No quote with this id!" });
    res.json(quote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /quotes/delete_quote/:id - delete a quote based on the given id
router.delete('/delete_quote/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const quoteData = await quote.findById(id);
    if(!quoteData){
      return res.status(404).json({message:"No quote with this id!"})
    }
    
    await quote.deleteOne({_id: id});
    res.status(200).json({message:'Deleted the quote'});
  }catch{
    res.status(500).json({message: 'Failed to delete the quote.'})
  }
  
});

module.exports = router;
