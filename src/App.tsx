import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/shared/Navbar';
import Footer from './Components/shared/Footer';
import Book from './Pages/Book';
import BookDetails from './Pages/BookDetails';
import About from './Pages/About';
import Privacy from './Pages/Privacy';
import Contact from './Pages/Contact';

// --- Types ---
type Theme = 'light' | 'dark' | 'system';

function Layout({ theme, setTheme }: { theme: Theme, setTheme: (t: Theme) => void }) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden transition-colors duration-500">
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem('theme', theme);

    const updateTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route index element={<Home />} />
          {/* Add other routes here, e.g. <Route path="books" element={<Books />} /> */}
          <Route path="books" element={<Book />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
