const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { requireAuth } = require('../lib/middleware');

function generateSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/^-+|-+$/g, '');
}

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 }).lean();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', requireAuth, async (req, res) => {
    try {
        const data = req.body;
        if (!data.slug) data.slug = generateSlug(data.name);

        const category = await Category.create(data);
        res.status(201).json({ success: true, category });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: 'Duplicate category' });
        res.status(500).json({ error: error.message });
    }
});

// UPDATE Category
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const data = req.body;
        if (!data.slug && data.name) data.slug = generateSlug(data.name);

        const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json({ success: true, category });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: 'Duplicate category' });
        res.status(500).json({ error: error.message });
    }
});

// DELETE Category
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        // Check if category has posts
        const Post = require('../models/Post');
        const postCount = await Post.countDocuments({ category: req.params.id });
        if (postCount > 0) {
            return res.status(400).json({ error: `Cannot delete category with ${postCount} posts` });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
