const mongoose = require('mongoose');
const { Schema } = mongoose;

// Visitor Schema
const visitorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    visitedAttractions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attraction' }],
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
