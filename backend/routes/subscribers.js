import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Newsletter Subscribe
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email is required' });
    }

    const result = await query(
      `INSERT INTO subscribers (email) 
       VALUES ($1) 
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email 
       RETURNING id, email, created_at`,
      [email.toLowerCase().trim()]
    );

    res.status(201).json({
      success: true,
      message: 'Subscribed to Borgholm Studio Gazette',
      subscriber: result.rows[0]
    });
  } catch (err) {
    console.error('[Newsletter Subscribe Error]:', err);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// List subscribers
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM subscribers ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

export default router;
