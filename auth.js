const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

// =======================
//      REGISTER
// =======================
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validasi
  if (!name || !email || !password) {
    return res.render('signup', { 
      activePage: 'signup',
      errorMsg: 'All fields are required.',
      successMsg: null
    });
  }

  const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (rows.length > 0) {
    return res.render('signup', { 
      activePage: 'signup',
      errorMsg: 'Email already registered.',
      successMsg: null
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  res.redirect('/signin');
});

// =======================
//      LOGIN
// =======================
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.render('signin', { 
        activePage: 'signin',
        errorMsg: 'Email or password is wrong.',
        successMsg: null
      });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.render('signin', { 
        activePage: 'signin',
        errorMsg: 'Email or password is wrong.',
        successMsg: null
      });
    }

    // Login sukses
    return res.redirect('/'); 
  } catch (err) {
    console.error(err);
    return res.render('signin', {
      activePage: 'signin',
      errorMsg: 'Internal server error. Please try again later.',
      successMsg: null
    });
  }
});

module.exports = router;
