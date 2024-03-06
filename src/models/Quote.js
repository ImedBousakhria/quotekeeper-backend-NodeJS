const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    author: String,
    quote_text: { type: String, index: true },
    created_at: { type: Date, default: Date.now },
    image_url: String,
    bookmarked: { type: Boolean, default: false },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
