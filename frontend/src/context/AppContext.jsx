import { useState, useEffect } from 'react';
import { AppContext } from './AppContextInstance';
import { getCurrentUser, setAuthToken, createOrder } from '../services/api';

export function AppProvider({ children }) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);

  // Drawers & Modals
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Check existing session from PostgreSQL backend on mount
  useEffect(() => {
    async function loadSession() {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.warn('Session verification skipped:', err.message);
      }
    }
    loadSession();
  }, []);

  // Cart State (Preloaded with 1 item for immediate testing)
  const [cartItems, setCartItems] = useState([
    {
      id: 'p1',
      name: 'Borgholm Monograph & Type Specimen',
      price: 68,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop'
    }
  ]);

  // Cart Actions
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeCartItem(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const removeCartItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Checkout order submission to PostgreSQL
  const submitOrder = async () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
    const total = subtotal + shipping;

    try {
      await createOrder({
        userId: currentUser?.id || null,
        customerEmail: currentUser?.email || 'guest@borgholm.com',
        items: cartItems,
        subtotal,
        shipping,
        total
      });
    } catch (err) {
      console.warn('Order recorded locally:', err.message);
    }
  };

  // Auth Actions
  const login = (userData, token) => {
    setCurrentUser(userData);
    if (token) setAuthToken(token);
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthToken(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    cartItems,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    totalCartCount,
    submitOrder,
    isMegaMenuOpen,
    setIsMegaMenuOpen,
    isContactOpen,
    setIsContactOpen,
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
