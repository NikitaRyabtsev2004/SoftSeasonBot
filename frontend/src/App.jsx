import { useEffect, useState, useCallback } from 'react';
import { Menu, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import './App.css';

function App() {
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [promoIndex, setPromoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const tg = window.Telegram?.WebApp;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [promosRes, catsRes] = await Promise.all([
        axios.get('/api/promotions'),
        axios.get('/api/categories')
      ]);

      // ✅ БЕЗОПАСНО!
      setPromotions(Array.isArray(promosRes.data?.data) ? promosRes.data.data : []);
      setCategories(Array.isArray(catsRes.data?.data) ? catsRes.data.data : []);
    } catch (error) {
      console.error('❌ Load data error:', error);
      setPromotions([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      const params = { page };
      if (selectedCategory) params.category = selectedCategory;

      const res = await axios.get('/api/products', { params });
      setProducts(Array.isArray(res.data?.data?.products) ? res.data.data.products : []);
      setTotalPages(res.data?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error('❌ Load products error:', error);
      setProducts([]);
      setTotalPages(1);
    }
  }, [page, selectedCategory]);

  useEffect(() => {
    if (tg) {
      tg.MainButton.setText('🛒 Оформить').show();
      tg.expand();
    }
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loading) {
    return (
      <div className="app loading-screen">
        <div className="spinner">⏳ Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <Menu size={24} />
        <h1>🛒 Магазин</h1>
        <div className="cart">🛒 0</div>
      </header>

      {/* ✅ ПОЛНАЯ ЗАЩИТА ОТ .map() */}
      {Array.isArray(promotions) && promotions.length > 0 && (
        <section className="promotions">
          <div className="carousel">
            <div className="slides" style={{ transform: `translateX(-${promoIndex * 100}%)` }}>
              {promotions.map(promo => (
                <div key={promo.id} className="slide">
                  <img src={promo.image} alt={promo.title} />
                  <div className="slide-text">{promo.title}</div>
                </div>
              ))}
            </div>
            <button
              className="nav left"
              onClick={() => setPromoIndex(Math.max(0, promoIndex - 1))}
            >
              <ChevronLeft />
            </button>
            <button
              className="nav right"
              onClick={() => setPromoIndex(Math.min(promotions.length - 1, promoIndex + 1))}
            >
              <ChevronRight />
            </button>
          </div>
        </section>
      )}

      {Array.isArray(categories) && categories.length > 0 && (
        <section className="categories">
          <h2>Категории</h2>
          <div className="category-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={selectedCategory === category.id ? 'active' : ''}
                onClick={() => {
                  setSelectedCategory(selectedCategory === category.id ? null : category.id);
                  setPage(1);
                }}
              >
                {category.name}
                <span>{category.product_count}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="products">
        <div className="product-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="price">{product.price?.toLocaleString()}₽</div>
                  <button>В корзину</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">Товары загрузятся через секунду...</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              ← Назад
            </button>
            <span>{page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              Вперед →
            </button>
          </div>
        )}
      </section>

      <footer>© 2026 Мой магазин</footer>
    </div>
  );
}

export default App;
