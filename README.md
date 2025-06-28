# SEA Catering 🍽️

SEA Catering adalah aplikasi meal plan & subscription berbasis web untuk pemesanan makanan sehat sesuai kebutuhan pelanggan. Proyek ini dibuat untuk submission Software Engineering Academy COMPfest.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS Templates, HTML5, CSS3
- **Database:** MySQL
- **UI:** Responsive CSS, Flexbox

---

## ⚙️ Setup & Installation

1. **Clone this repo**
    ```bash
    git clone https://github.com/ZaidaanArd/Sea-Catering.git
    cd Sea-Catering
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Setup Database**
    - Pastikan MySQL sudah jalan di XAMPP/Laragon.
    - Buat database dengan nama: `sea-catering`
    - Import file SQL (jika tersedia):  
      ```
      -- Contoh tabel subscriptions
      CREATE TABLE subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        phone VARCHAR(32),
        plan VARCHAR(64),
        meal_types VARCHAR(128),
        delivery_days VARCHAR(128),
        allergies TEXT,
        price INT
      );
      ```

4. **Konfigurasi koneksi DB**
    - Edit file `db.js` jika user/password MySQL berbeda.

5. **Run Application**
    ```bash
    node app.js
    ```
    atau (jika pakai nodemon)
    ```bash
    npx nodemon app.js
    ```
    - Akses di [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

sea-catering/
│
├── public/ # Static assets (CSS, images)
├── views/ # EJS views/templates
│ ├── partials/ # Header, footer
│ └── ...
├── routes/ # (jika menggunakan routing terpisah)
├── app.js # Main Express server
├── db.js # Database connection config
├── package.json
└── README.md


---

## ✨ Features

- Custom meal plan (Diet, Protein, Royal)
- Responsive UI, mobile friendly
- Hitung total harga otomatis
- Form subscription & testimoni pelanggan
- Data subscription tersimpan di MySQL
- Validasi form & friendly error

---

## 🙋‍♂️ Author

- Muhammad Zaidaan Ardiyansyah  
  [github.com/ZaidaanArd](https://github.com/ZaidaanArd)