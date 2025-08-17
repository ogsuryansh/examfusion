import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  BookOpen, 
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'My Books', path: '/my-books' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
                         <span className="text-2xl font-bold text-gradient text-accessible">EXAMFUSION</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {isDark ? <Sun className="w-5 h-5 text-gray-700 dark:text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
            </button>

            <Link to="/login" className="btn-secondary flex items-center justify-center px-6 py-3">
              <User className="w-4 h-4 mr-2" />
              Login
            </Link>
            <Link to="/register" className="btn-primary px-6 py-3">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ml-4"
          >
            {isOpen ? <X className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
          </button>
        </div>

        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-30"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-20 right-0 w-80 h-screen bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-40"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 font-medium transition-colors duration-300 ${
                      isActive(item.path)
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Theme
                    </span>
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      {isDark ? <Sun className="w-5 h-5 text-gray-700 dark:text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center btn-secondary flex items-center justify-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center btn-primary"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
