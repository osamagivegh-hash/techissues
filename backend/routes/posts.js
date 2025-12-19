const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { requireAuth } = require('../lib/middleware');

// Generate Slug Helper
function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/^-+|-+$/g, '');
}

// GET all posts
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            Post.find()
                .populate('category')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Post.countDocuments()
        ]);

        res.json({
            posts,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE Post
router.post('/', requireAuth, async (req, res) => {
    try {
        const data = req.body;
        if (!data.slug) data.slug = generateSlug(data.title);

        // Reading time calculation simplified
        data.readingTime = Math.ceil((data.content?.length || 0) / 500) || 5;

        const post = await Post.create(data);
        const populated = await Post.findById(post._id).populate('category');

        res.status(201).json({ success: true, post: populated });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: 'Duplicate title/slug' });
        res.status(500).json({ error: error.message });
    }
});

// GET single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('category').lean();
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE Post
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const data = req.body;
        if (!data.slug && data.title) data.slug = generateSlug(data.title);
        data.readingTime = Math.ceil((data.content?.length || 0) / 500) || 5;

        const post = await Post.findByIdAndUpdate(req.params.id, data, { new: true }).populate('category');
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json({ success: true, post });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: 'Duplicate title/slug' });
        res.status(500).json({ error: error.message });
    }
});

// DELETE Post
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
