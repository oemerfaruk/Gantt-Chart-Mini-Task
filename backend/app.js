require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Veritabanı Bağlantısı
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// API Endpointler
app.get('/api/schedules', (req, res) => {
  const query = `
    SELECT 
      s.start_time, 
      s.end_time, 
      m.name AS machine_name, 
      wo.order_number, 
      wo.customer 
    FROM schedules s
    JOIN machines m ON s.machine_id = m.id
    JOIN work_orders wo ON s.work_order_id = wo.id
  `;
  db.query(query, (err, results) => res.json(err || results));
});

app.get('/api/search/:orderNumber', (req, res) => {
  const query = `
    SELECT * FROM schedules
    WHERE work_order_id = (
      SELECT id FROM work_orders 
      WHERE order_number = ?
    )
  `;
  db.query(query, [req.params.orderNumber], (err, results) => {
    if (results.length === 0) return res.status(404).json({ error: 'İş emri bulunamadı!' });
    res.json(results);
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server ${process.env.NODE_ENV} modunda ${port} portunda çalışıyor`);
});