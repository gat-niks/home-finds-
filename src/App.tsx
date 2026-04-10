import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Admin from './pages/Admin';
import Strategy from './pages/Strategy';

export default function App() {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/strategy" element={<Strategy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
