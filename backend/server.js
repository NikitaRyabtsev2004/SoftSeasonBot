const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Папка, где хранятся изображения
const IMAGES_DIR = path.join(__dirname, 'images');
app.use('/images', express.static(IMAGES_DIR));

// Подключаем БД
const db = new sqlite3.Database(path.join(__dirname, 'products.db'), err => {
    if (err) console.error('Ошибка подключения к базе:', err.message);
    else console.log('✅ Подключено к products.db');
});

// Получить список категорий
app.get('/api/categories', (req, res) => {
    db.all('SELECT DISTINCT category FROM products', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const categories = rows.map(r => r.category).filter(Boolean);
        res.json(categories);
    });
});

// Получить товары
app.get('/api/products', (req, res) => {
    const category = req.query.category || null;
    const sqlBase = `SELECT * FROM products ${category ? 'WHERE category = ?' : ''} ORDER BY id ASC`;
    const params = category ? [category] : [];

    db.all(sqlBase, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // парсим строки JSON для img и imgM, формируем URL
        const products = rows.map(item => {
            let imgs = [];
            let imgsM = [];
            try { imgs = JSON.parse(item.img.replace(/'/g, '"')); } catch { }
            try { imgsM = JSON.parse(item.imgM.replace(/'/g, '"')); } catch { }
            const imgUrls = imgs.map(f => `/images/${f}`);
            const imgMUrls = imgsM.map(f => `/images/${f}`);

            return {
                ...item,
                img: imgUrls,
                imgM: imgMUrls?.[0] || null
            };
        });

        res.json(products);
    });
});

app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
