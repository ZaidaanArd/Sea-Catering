// ===========================
//        MODULE IMPORT
// ===========================
const express = require('express');
const path = require('path');
const db = require('./db'); // Koneksi MySQL Pool

const app = express();
const port = 3000;

// ===========================
//        MIDDLEWARE
// ===========================
app.use(express.urlencoded({ extended: true })); // Parsing form POST
app.use(express.json()); // Untuk parsing JSON
app.use(express.static(path.join(__dirname, 'public'))); // Static files (CSS, JS, Images)

// ===========================
//        VIEW ENGINE
// ===========================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===========================
//        ROUTES
// ===========================

// Halaman utama
app.get('/', (req, res) => {
  res.render('index');
});

// Menu makanan
app.get('/menu', (req, res) => {
  res.render('menu');
});

// Halaman subscription (form)
app.get('/subscription', (req, res) => {
  res.render('subscription');
});

// Halaman kontak (pastikan variabel untuk EJS selalu ada)
app.get('/contact', (req, res) => {
  res.render('contact', { 
    successMsg: null, 
    errorMsg: null 
  });
});

// Kirim testimonial dari contact page
app.post('/testimonials', async (req, res) => {
  // TODO: Simpan ke DB jika ingin
  res.render('contact', {
    successMsg: "Thank you for your testimonial!",
    errorMsg: null
  });
});

// Halaman sign in
app.get('/signin', (req, res) => {
  res.render('signin');
});

// Halaman sukses setelah subscription
app.get('/subscription-success', (req, res) => {
  res.render('subscription-success');
});

// Handle POST subscription (simpan ke database)
app.post('/subscription', async (req, res) => {
  try {
    const { name, phone, plan, mealType, days, allergies } = req.body;

    // Checkbox bisa array atau string
    const mealTypes = Array.isArray(mealType) ? mealType.join(',') : (mealType || '');
    const deliveryDays = Array.isArray(days) ? days.join(',') : (days || '');

    // Harga plan
    const planPrices = {
      "Diet Plan": 30000,
      "Protein Plan": 40000,
      "Royal Plan": 60000,
    };
    const planPrice = planPrices[plan] || 0;

    // Kalkulasi harga
    const mealTypeCount = mealTypes ? mealTypes.split(',').length : 0;
    const deliveryDaysCount = deliveryDays ? deliveryDays.split(',').length : 0;
    const totalPrice = planPrice * mealTypeCount * deliveryDaysCount * 4.3;

    // Simpan ke database
    const sql = `
      INSERT INTO subscriptions 
        (name, phone, plan, meal_types, delivery_days, allergies, price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(sql, [
      name, phone, plan, mealTypes, deliveryDays, allergies, Math.round(totalPrice)
    ]);

    res.redirect('/subscription-success');
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send('Gagal menyimpan ke database.');
  }
});

// 404 Handler (jika route tidak ada)
app.use((req, res) => {
  res.status(404).render('404', { title: "Page Not Found" });
});

// ===========================
//        SERVER START
// ===========================
app.listen(port, () => {
  console.log(`SEA Catering berjalan di http://localhost:${port}`);
});
