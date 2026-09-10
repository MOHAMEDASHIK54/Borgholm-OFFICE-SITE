import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Submit an inquiry from ContactDrawer
router.post('/', async (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const result = await query(
      `INSERT INTO inquiries (name, email, service, budget, message) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, service, budget, message, status, created_at`,
      [name, email, service || 'General Inquiry', budget || '$25k - $50k', message]
    );

    res.status(201).json({
      success: true,
      message: 'Inquiry received by Stockholm studio',
      inquiry: result.rows[0]
    });
  } catch (err) {
    console.error('[Inquiry Submit Error]:', err);
    res.status(500).json({ error: 'Failed to record inquiry' });
  }
});

// List inquiries (for dashboard / admin review)
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

export default router;
