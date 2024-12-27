const express = require('express');
const Visitor = require('../models/Visitor');
const Review = require('../models/Review');

const router = express.Router();

// Register a new visitor
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const visitor = new Visitor({ name, email });
        await visitor.save();
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get visitor activity
router.get('/activity', async (req, res) => {
    try {
        const visitors = await Visitor.find()
            .populate('visitedAttractions')
            .lean();
        const result = visitors.map(visitor => ({
            name: visitor.name,
            email: visitor.email,
            reviewsCount: visitor.visitedAttractions.length,
        }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all visitors
router.get('/', async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific visitor by ID
router.get('/:id', async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id).populate('visitedAttractions', 'name location');
        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        res.json(visitor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get visitor activity (count of reviews)
router.get('/:id/activity', async (req, res) => {
    try {
        const reviewCount = await Review.countDocuments({ visitor: req.params.id });
        res.json({ visitorId: req.params.id, reviews: reviewCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
