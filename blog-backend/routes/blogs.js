const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/authMiddleware');

// Get all blogs
router.get('/', (req, res) => {
    const query = `
        SELECT blogs.id, blogs.title, blogs.category, blogs.content, blogs.image, blogs.createdAt, users.username as author
        FROM blogs
        JOIN users ON blogs.authorId = users.id
        ORDER BY blogs.createdAt DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(rows);
    });
});

// Get single blog
router.get('/:id', (req, res) => {
    const query = `
        SELECT blogs.id, blogs.title, blogs.category, blogs.content, blogs.image, blogs.createdAt, users.username as author
        FROM blogs
        JOIN users ON blogs.authorId = users.id
        WHERE blogs.id = ?
    `;
    db.get(query, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!row) return res.status(404).json({ message: 'Blog not found' });
        res.json(row);
    });
});

// Create a new blog (protected)
router.post('/', auth, (req, res) => {
    const { title, category, content, image } = req.body;
    const authorId = req.user.id;

    if (!title || !category || !content) {
        return res.status(400).json({ message: 'Title, category, and content are required' });
    }

    db.run(
        'INSERT INTO blogs (title, category, content, image, authorId) VALUES (?, ?, ?, ?, ?)',
        [title, category, content, image || null, authorId],
        function (err) {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(201).json({ message: 'Blog created successfully', id: this.lastID });
        }
    );
});

module.exports = router;
