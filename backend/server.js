require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Database = require('better-sqlite3');
const { Telegraf } = require('telegraf');
const path = require('path');

const app = express();
const db = new Database('shop.db');
const PORT = process.env.PORT || 3000;

// ✅ ПРОВЕРКА ТОКЕНА
if (!process.env.BOT_TOKEN) {
    console.error('❌ BOT_TOKEN не найден в .env!');
    process.exit(1);
}

console.log('✅ BOT_TOKEN загружен');

// ✅ Инициализация БД + МОКИ
db.exec(`
  CREATE TABLE IF NOT EXISTS promotions (id INTEGER PRIMARY KEY, title TEXT, image TEXT);
  CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT, image TEXT);
  CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, image TEXT, category_id INTEGER);
`);

// ✅ ВСТАВЛЯЕМ ДАННЫЕ ПРЯМО (без prepare)
db.exec(`
  INSERT OR IGNORE INTO promotions VALUES 
  (1,'🔥 Скидка 50% на смартфоны!','https://via.placeholder.com/350x160/ff6b6b/ffffff?text=СКИДКА+50%'),
  (2,'🚚 Бесплатная доставка!','https://via.placeholder.com/350x160/4ecdc4/ffffff?text=БЕСПЛАТНАЯ+ДОСТАВКА'),
  (3,'⭐ Новинки недели','https://via.placeholder.com/350x160/45b7d1/ffffff?text=НОВИНКИ')
`);

db.exec(`
  INSERT OR IGNORE INTO categories VALUES 
  (1,'📱 Смартфоны','https://via.placeholder.com/80x80/f39c12/ffffff?text=📱'),
  (2,'💻 Ноутбуки','https://via.placeholder.com/80x80/e74c3c/ffffff?text=💻'),
  (3,'🎧 Аудио','https://via.placeholder.com/80x80/9b59b6/ffffff?text=🎧'),
  (4,'⌚ Часы','https://via.placeholder.com/80x80/1abc9c/ffffff?text=⌚')
`);

db.exec(`
  INSERT OR IGNORE INTO products VALUES
  (1,'iPhone 15 Pro Max',99990,'https://via.placeholder.com/160x160/2c3e50/ffffff?text=iPhone+15',1),
  (2,'Samsung Galaxy S24 Ultra',89990,'https://via.placeholder.com/160x160/3498db/ffffff?text=S24+Ultra',1),
  (3,'MacBook Pro M3',199990,'https://via.placeholder.com/160x160/e67e22/ffffff?text=MacBook',2),
  (4,'Sony WH-1000XM5',39990,'https://via.placeholder.com/160x160/8e44ad/ffffff?text=WH-1000',3),
  (5,'Apple Watch Ultra',79990,'https://via.placeholder.com/160x160/f1c40f/ffffff?text=Watch',4),
  (6,'Xiaomi 14 Pro',69990,'https://via.placeholder.com/160x160/27ae60/ffffff?text=Xiaomi',1),
  (7,'Dell XPS 13',129990,'https://via.placeholder.com/160x160/34495e/ffffff?text=XPS',2),
  (8,'AirPods Pro 2',24990,'https://via.placeholder.com/160x160/95a5a6/ffffff?text=AirPods',3),
  (9,'Samsung Watch 6',34990,'https://via.placeholder.com/160x160/e74c3c/ffffff?text=Watch6',4),
  (10,'Google Pixel 8 Pro',79990,'https://via.placeholder.com/160x160/1abc9c/ffffff?text=Pixel',1),
  (11,'Lenovo ThinkPad X1',159990,'https://via.placeholder.com/160x160/9b59b6/ffffff?text=ThinkPad',2),
  (12,'JBL Tune 760NC',12990,'https://via.placeholder.com/160x160/f39c12/ffffff?text=JBL',3)
`);

console.log('✅ База данных готова!');

// 🛒 БОТ
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
    ctx.reply('🛒 Добро пожаловать!', {
        reply_markup: {
            inline_keyboard: [[{
                text: '🛍️ Открыть магазин',
                web_app: { url: `http://localhost:${PORT}` }
            }]]
        }
    });
});
bot.launch().then(() => console.log('🤖 Бот запущен'));

// ✅ Middleware
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ✅ Логирование
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
});

// ✅ API — ГЛАВНОЕ! ПЕРЕД статикой
app.get('/api/promotions', (req, res) => {
    try {
        const promos = db.prepare('SELECT * FROM promotions').all();
        console.log('📦 Promotions OK:', promos.length);
        res.json({ success: true, data: promos });
    } catch (e) {
        console.error('❌ Promotions ERROR:', e);
        res.json({ success: false, data: [] });
    }
});

app.get('/api/categories', (req, res) => {
    try {
        const categories = db.prepare(`
            SELECT c.*, COUNT(p.id) as product_count 
            FROM categories c LEFT JOIN products p ON c.id = p.category_id 
            GROUP BY c.id
        `).all();
        console.log('📂 Categories OK:', categories.length);
        res.json({ success: true, data: categories });
    } catch (e) {
        console.error('❌ Categories ERROR:', e);
        res.json({ success: false, data: [] });
    }
});

app.get('/api/products', (req, res) => {
    try {
        const { page = 1, category } = req.query;
        const offset = (parseInt(page) - 1) * 12;

        let sql = `SELECT p.*, c.name as category_name FROM products p 
                   LEFT JOIN categories c ON p.category_id = c.id`;
        let params = [];

        if (category) {
            sql += ' WHERE p.category_id = ?';
            params.push(category);
        }
        sql += ' ORDER BY p.id LIMIT 12 OFFSET ?';
        params.push(offset);

        const products = db.prepare(sql).all(params);
        const total = db.prepare(
            `SELECT COUNT(*) as count FROM products ${category ? 'WHERE category_id = ?' : ''}`
        ).get(category ? [category] : []);

        console.log('🛍️ Products OK:', products.length);
        res.json({
            success: true,
            data: {
                products,
                pagination: {
                    page: parseInt(page),
                    totalPages: Math.ceil((total?.count || 0) / 12),
                    total: total?.count || 0
                }
            }
        });
    } catch (e) {
        console.error('❌ Products ERROR:', e);
        res.json({ success: false, data: { products: [], pagination: { page: 1, totalPages: 1, total: 0 } } });
    }
});

// ✅ SPA главная
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}`);
    console.log(`✅ Тест API: http://localhost:${PORT}/api/promotions`);
});
