const express = require('express');
const Review = require('../models/Review');
const Visitor = require('../models/Visitor');
const Attraction = require('../models/Attraction');

const router = express.Router();

// Post a review
router.post('/', async (req, res) => {
    try {
        const { visitorId, attractionId, score, comment } = req.body;

        // Find the visitor
        const visitor = await Visitor.findById(visitorId);

        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }

        // Check if the visitor has visited the attraction
        if (!visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({ error: 'You must visit the attraction before posting a review' });
        }

        // Check if the visitor has already reviewed this attraction
        const existingReview = await Review.findOne({ visitor: visitorId, attraction: attractionId });
        if (existingReview) {
            return res.status(400).json({ error: 'You cannot review the same attraction twice' });
        }

        // Create a new review
        const newReview = new Review({
            visitor: visitorId,
            attraction: attractionId,
            score,
            comment
        });

        await newReview.save();

        // Update the attraction's rating
        const attraction = await Attraction.findById(attractionId);
        const reviews = await Review.find({ attraction: attractionId });
        const averageRating = reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length;
        attraction.rating = averageRating;

        await attraction.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('attraction visitor', 'name location email');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reviews for a specific attraction
router.get('/attraction/:id', async (req, res) => {
    try {
        const reviews = await Review.find({ attraction: req.params.id }).populate('visitor', 'name email');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reviews by a specific visitor
router.get('/visitor/:id', async (req, res) => {
    try {
        const reviews = await Review.find({ visitor: req.params.id }).populate('attraction', 'name location');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
