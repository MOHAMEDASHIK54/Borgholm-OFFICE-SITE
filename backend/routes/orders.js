import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Place Order from Cart Drawer
router.post('/', async (req, res) => {
  try {
    const { userId, customerEmail, items, subtotal, shipping, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const result = await query(
      `INSERT INTO orders (user_id, customer_email, items_json, subtotal, shipping, total)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, customer_email, items_json, subtotal, shipping, total, status, created_at`,
      [
        userId || null,
        customerEmail || 'guest@borgholm.com',
        JSON.stringify(items),
        subtotal || 0,
        shipping || 0,
        total || 0
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Order confirmed and registered in Borgholm system',
      order: result.rows[0]
    });
  } catch (err) {
    console.error('[Create Order Error]:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Get Orders for User
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});

// List all orders (for admin / studio inspection)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
