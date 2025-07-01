// ===========================
//        MODULE IMPORT
// ===========================
const express = require('express');
const path = require('path');
const db = require('./db'); // Koneksi MySQL Pool
const authRouter = require('./auth'); // Tambah router auth

const app = express();
const port = 3000;

// ===========================
//        MIDDLEWARE
// ===========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===========================
//        VIEW ENGINE
// ===========================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===========================
//        ROUTES
// ===========================

// Gunakan authRouter untuk POST /signup dan /signin
app.use('/', authRouter);

// Halaman utama
app.get('/', (req, res) => {
  res.render('index', { activePage: 'home' });
});

// Menu makanan
app.get('/menu', (req, res) => {
  res.render('menu', { activePage: 'menu' });
});

// Halaman subscription (form)
app.get('/subscription', (req, res) => {
  res.render('subscription', { activePage: 'subscription' });
});

// Halaman kontak (pastikan variabel untuk EJS selalu ada)
app.get('/contact', (req, res) => {
  res.render('contact', { 
    activePage: 'contact',
    successMsg: null, 
    errorMsg: null 
  });
});

// Kirim testimonial dari contact page
app.post('/testimonials', async (req, res) => {
  res.render('contact', {
    activePage: 'contact',
    successMsg: "Thank you for your testimonial!",
    errorMsg: null
  });
});

// GET Signin/Signup SELALU render errorMsg & successMsg supaya ga error EJS
app.get('/signin', (req, res) => {
  res.render('signin', { activePage: 'signin', errorMsg: null, successMsg: null });
});

app.get('/signup', (req, res) => {
  res.render('signup', { activePage: 'signup', errorMsg: null, successMsg: null }); 
});

// Halaman sukses setelah subscription
app.get('/subscription-success', (req, res) => {
  res.render('subscription-success', { activePage: '' });
});

// Handle POST subscription (simpan ke database)
app.post('/subscription', async (req, res) => {
  try {
    const { name, phone, plan, mealType, days, allergies } = req.body;
    const mealTypes = Array.isArray(mealType) ? mealType.join(',') : (mealType || '');
    const deliveryDays = Array.isArray(days) ? days.join(',') : (days || '');
    const planPrices = {
      "Diet Plan": 30000,
      "Protein Plan": 40000,
      "Royal Plan": 60000,
    };
    const planPrice = planPrices[plan] || 0;
    const mealTypeCount = mealTypes ? mealTypes.split(',').length : 0;
    const deliveryDaysCount = deliveryDays ? deliveryDays.split(',').length : 0;
    const totalPrice = planPrice * mealTypeCount * deliveryDaysCount * 4.3;

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
if (require.main === module) {
  app.listen(port, () => {
    console.log(`SEA Catering berjalan di http://localhost:${port}`);
  });
}

module.exports = app;
