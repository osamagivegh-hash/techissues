const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const { requireAuth } = require('../lib/middleware');

// GET all images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 }).lean();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new image
router.post('/', requireAuth, async (req, res) => {
    try {
        const data = req.body;
        const image = await Image.create(data);
        res.status(201).json({ success: true, image });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE image
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
