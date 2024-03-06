const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: { type: String, index: true },
    quotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' }],
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
