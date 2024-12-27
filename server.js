const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tourism', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Import Routes
const attractionRoutes = require('./routes/attractions');
const visitorRoutes = require('./routes/visitors');
const reviewRoutes = require('./routes/reviews');

// Use Routes
app.use('/attractions', attractionRoutes);
app.use('/visitors', visitorRoutes);
app.use('/reviews', reviewRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Tourism Management API');
});
// Get total visitors
app.get('/dashboard/total-visitors', async (req, res) => {
    try {
        const visitorsCount = await Visitor.countDocuments();
        res.status(200).json({ totalVisitors: visitorsCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total attractions
app.get('/dashboard/total-attractions', async (req, res) => {
    try {
        const attractionsCount = await Attraction.countDocuments();
        res.status(200).json({ totalAttractions: attractionsCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get the most reviewed attraction
app.get('/dashboard/most-reviewed', async (req, res) => {
    try {
        const mostReviewed = await Attraction.aggregate([
            { $lookup: { from: 'reviews', localField: '_id', foreignField: 'attraction', as: 'reviews' } },
            { $project: { name: 1, reviewsCount: { $size: '$reviews' } } },
            { $sort: { reviewsCount: -1 } },
            { $limit: 1 }
        ]);
        res.status(200).json(mostReviewed[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get top-rated attractions
app.get('/dashboard/top-rated', async (req, res) => {
    try {
        const topRated = await Attraction.find().sort({ rating: -1 }).limit(5);
        res.status(200).json(topRated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
