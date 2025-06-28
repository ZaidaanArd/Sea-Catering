// routes/subscription.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET form subscription
router.get('/', (req, res) => {
  res.render('subscription');
});

// ===========================
//        ROUTE POST
// ===========================
app.post('/subscription', (req, res) => {
  // Ambil data dari form
  const { name, phone, plan, mealType, days, allergies } = req.body;

  // Convert array ke string, untuk checkbox (supaya bisa disimpan ke DB)
  const mealTypeStr = Array.isArray(mealType) ? mealType.join(', ') : mealType;
  const daysStr = Array.isArray(days) ? days.join(', ') : days;

  // Query insert
  const query = `INSERT INTO subscriptions (name, phone, plan, meal_type, delivery_days, allergies) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, phone, plan, mealTypeStr, daysStr, allergies], (err, result) => {
    if (err) {
      console.error('Gagal menyimpan data:', err);
      // Kembali ke halaman subscription dengan pesan error (bisa diperbaiki di front-end)
      return res.render('subscription', { error: 'Failed to save data, try again.' });
    }
    // Sukses, redirect/menampilkan pesan sukses
    res.render('subscription', { success: 'Subscription berhasil! Kami akan segera memproses pesanan Anda.' });
  });
});


// POST subscription
router.post('/', async (req, res) => {
  const { name, phone, plan, mealType, days, allergies, price } = req.body;

  try {
    await db.execute(
      'INSERT INTO subscriptions (name, phone, plan, meal_types, delivery_days, allergies, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        phone,
        plan,
        Array.isArray(mealType) ? mealType.join(',') : mealType,
        Array.isArray(days) ? days.join(',') : days,
        allergies,
        price
      ]
    );
    res.redirect('/subscription?success=1');
  } catch (err) {
    console.error(err);
    res.redirect('/subscription?error=1');
  }
});

module.exports = router;
