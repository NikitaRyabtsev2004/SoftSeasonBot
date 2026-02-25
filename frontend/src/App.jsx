import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = '/api';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    axios.get(`${API}/categories`).then(r => setCategories(r.data));
    axios.get(`${API}/products`).then(r => setProducts(r.data));
  }, []);

  const loadByCategory = (cat) => {
    setCurrentCategory(cat);
    axios.get(`${API}/products${cat ? `?category=${cat}` : ''}`)
      .then(r => setProducts(r.data));
  };

  // обработчик покадрового просмотра
  const handleMouseMove = (e, product) => {
    if (!product.img || product.img.length <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const index = Math.floor(percent * product.img.length);
    e.currentTarget.querySelector('img').src = product.img[index];
  };

  const handleMouseLeave = (e, product) => {
    e.currentTarget.querySelector('img').src = product.img[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="sticky top-0 bg-white shadow p-3 text-center font-semibold text-lg">
        Каталог товаров
      </header>

      <div className="flex overflow-x-auto gap-3 py-3">
        <button
          onClick={() => loadByCategory(null)}
          className={`px-3 py-1 rounded-full border ${!currentCategory ? 'bg-blue-600 text-white' : 'bg-white'}`}>
          Все
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => loadByCategory(cat)}
            className={`px-3 py-1 rounded-full border whitespace-nowrap ${currentCategory === cat ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map(prod => (
          <div key={prod.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition relative">
            <div
              className="relative w-full h-98 overflow-hidden cursor-ew-resize"
              onMouseMove={(e) => handleMouseMove(e, prod)}
              onMouseLeave={(e) => handleMouseLeave(e, prod)}
            >
              <img
                src={prod.img?.[0]}
                alt={prod.title}
                className="w-full h-full object-cover transition-transform"
              />

              {prod.imgM && (
                <img
                  src={prod.imgM}
                  className="absolute bottom-2 right-2 w-12 h-12 rounded-full border-2 border-white object-cover opacity-90"
                  alt="Ткань"
                />
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5em]">{prod.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{prod.desc}</p>
              <div className="mt-2 font-bold text-blue-700">{prod.price.toLocaleString()} ₽</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
