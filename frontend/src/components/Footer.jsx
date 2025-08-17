import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient text-primary-600">EXAMFUSION</span>
          </Link>
          
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Premium study materials designed by expert educators for competitive exam success.
          </p>
          
          <div className="text-gray-400 text-sm">
            © {currentYear} EXAMFUSION. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
