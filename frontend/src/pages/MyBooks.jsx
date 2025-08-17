import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ShoppingCart,
  BookMarked,
  FileText,
  Book,
  GraduationCap,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBooks = () => {
  const purchasedBooks = [
    {
      id: 1,
      title: "Physics Formula Book",
      author: "Dr. Rajesh Kumar",
      category: "PHYSICS FORMULAS",
      description: "Complete physics formulas for JEE Main & Advanced",
      pages: "280",
      format: "Digital PDF",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      exam: "JEE",
      class: "Class 12",
      purchaseDate: "2024-01-15"
    }
  ];

  const renderBookCard = (book) => (
    <motion.div
      key={book.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card p-6 hover:scale-105 transition-transform duration-300"
    >
      {/* Book Image */}
      <div className="relative mb-4">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        {book.exam && (
          <div className="absolute top-2 right-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
              {book.exam}
            </span>
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-primary-600 mb-2">
          {book.category}
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {book.description}
        </p>
        
        {/* Author */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <BookMarked className="w-4 h-4 mr-2" />
          By {book.author}
        </div>

        {/* Book Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            {book.pages} pages
          </span>
          <span className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {book.format}
          </span>
        </div>

        {/* Class Info */}
        {book.class && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            {book.class}
          </div>
        )}

        {/* Purchase Date */}
        {book.purchaseDate && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Purchased: {new Date(book.purchaseDate).toLocaleDateString()}
          </div>
        )}

        {/* Read Button */}
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 w-full flex items-center justify-center min-h-[44px]">
          <Book className="w-4 h-4 mr-2" />
          Read Now
        </button>
      </div>
    </motion.div>
  );

  const renderEmptyState = () => (
    <div className="col-span-full text-center py-16">
      <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
        No books purchased yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Start your learning journey by purchasing your first book
      </p>
      <Link 
        to="/#books" 
        className="btn-primary inline-flex items-center"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Browse Books
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Books
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Your Learning Library
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access all your purchased study materials and continue your learning journey
            </p>
          </motion.div>

          {/* Books Grid */}
          {purchasedBooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedBooks.map(renderBookCard)}
            </div>
          ) : (
            renderEmptyState()
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
