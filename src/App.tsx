import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Home from './Pages/Home';
import About from './Pages/About';
import Authors from './Pages/Authors';
import Community from './Pages/Community';
import Login from './Pages/Login';
import Register from './Pages/Register';
import BookDetails from './Pages/BookDetails';
import Privacy from './Pages/Privacy';
import Contact from './Pages/Contact';
import Dashboard from './Pages/Dashboard';
import { useAuth, AuthProvider } from './Context/AuthContext';
import Navbar from './Components/shared/Navbar';
import Footer from './Components/shared/Footer';
import ScrollToTop from './Components/shared/ScrollToTop';
import Books from './Pages/Book';
import { FeedbackProvider } from './Components/UI/Feedback';

// --- Protected Route ---
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) return null; // Or a loading spinner
  if (!accessToken) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

// --- Layout ---
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
    <AuthProvider>
      <FeedbackProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout theme={theme} setTheme={setTheme} />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="books" element={<Books />} />
              <Route path="authors" element={<Authors />} />
              <Route path="community" element={<Community />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="books/:id" element={<BookDetails />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard theme={theme} setTheme={setTheme} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </FeedbackProvider>
    </AuthProvider>
  );
}
