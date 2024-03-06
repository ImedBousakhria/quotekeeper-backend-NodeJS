const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");

// get all tags
router.get("/all_tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "No tag with that id" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add a new tag
router.post("/add_tag", (req, res) => {
  // create and save a new tag to the database
  Tag.create(req.body)
    .then((tag) => {
      console.log(`New tag created! ${tag}`);

      if (!tag) {
        return res.status(400).json({ message: "Something went wrong!" });
      } else {
        return res.status(201).json(tag);
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

// update Tag
router.put("/update/:id", async (req, res) => {
  let updated = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) {
    res.status(400).json({ Message: "Failed to Update" });
  } else {
    res.status(200).json(updated);
  }
});

// delete a tag by its `id` value
router.delete("/:id", validateTagId, async (req, res) => {
  try {
    await Tag.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Tag has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});
