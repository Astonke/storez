import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Product, CartItem } from './types';
import { products as initialProducts } from './data/products';
import { Header } from './components/Header/Header';
import { ProductGrid } from './components/Products/ProductGrid';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/Admin/AdminPanel';
import { PaymentPage } from './components/Payment/PaymentPage';
import { saveProducts, loadProducts } from './utils/storage';

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = loadProducts();
    return savedProducts.length > 0 ? savedProducts : initialProducts;
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Save products whenever they change
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeCartItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (id: number, product: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...product, id } : p));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <Routes>
          <Route path="/" element={
            <main className="container mx-auto px-4 py-8">
              <ProductGrid
                products={filteredProducts}
                onAddToCart={addToCart}
              />
            </main>
          } />
          <Route path="/admin" element={
            <AdminPanel
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          } />
          <Route path="/payment" element={
            <PaymentPage
              items={cartItems}
              onPaymentComplete={() => {
                setCartItems([]);
                window.location.href = '/';
              }}
            />
          } />
        </Routes>

        <Cart
          items={cartItems}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeCartItem}
        />
      </div>
    </Router>
  );
}

export default App;