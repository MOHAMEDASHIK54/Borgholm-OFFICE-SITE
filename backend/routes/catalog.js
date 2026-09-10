import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Get Products
router.get('/products', async (req, res) => {
  try {
    const result = await query('SELECT * FROM products ORDER BY price ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('[Get Products Error]:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get Projects
router.get('/projects', async (req, res) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY year DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('[Get Projects Error]:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get Blog Posts with Comments
router.get('/posts', async (req, res) => {
  try {
    const postsResult = await query('SELECT * FROM posts ORDER BY id ASC');
    const commentsResult = await query('SELECT * FROM comments ORDER BY created_at DESC');

    const posts = postsResult.rows.map((post) => ({
      ...post,
      comments: commentsResult.rows.filter((c) => c.post_id === post.id)
    }));

    res.json(posts);
  } catch (err) {
    console.error('[Get Posts Error]:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Add Comment to Post
router.post('/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { author_name, text } = req.body;

    if (!author_name || !text) {
      return res.status(400).json({ error: 'Author name and comment text are required' });
    }

    const result = await query(
      `INSERT INTO comments (post_id, author_name, text) 
       VALUES ($1, $2, $3) 
       RETURNING id, post_id, author_name, text, created_at`,
      [id, author_name, text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('[Add Comment Error]:', err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

export default router;
