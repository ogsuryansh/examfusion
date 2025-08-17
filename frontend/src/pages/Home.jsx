import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Award,
  Target,
  Shield,
  Zap,
  ShoppingCart,
  BookMarked,
  FileText,
  Book,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('featured');

  const books = [
    {
      id: 1,
      title: "Zoology medeasy by samapti mam",
      author: "Samapti Sinha Mahapatra",
      category: "MEDEASY BIO",
      description: "Class Notes in Handwritten Format, Updated as per latest NMC NTA Syllabus",
      originalPrice: "₹199",
      currentPrice: "₹19",
      discount: "90% OFF",
      pages: "450",
      format: "Handwritten Notes",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      exam: "NEET",
      class: "Class 12"
    },
    {
      id: 2,
      title: "ZOOLOGY MIND MAPS",
      author: "Bio Mindmap Team",
      category: "BIO MINDMAP",
      description: "Comprehensive mind maps for quick revision and better understanding",
      originalPrice: "₹199",
      currentPrice: "₹19",
      discount: "90% OFF",
      pages: "320",
      format: "Digital PDF",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      exam: "NEET",
      class: "Class 11"
    },
    {
      id: 3,
      title: "Bio question bank By Samapti Mam",
      author: "Samapti Sinha Mahapatra",
      category: "BIO QUESTION BANK",
      description: "Extensive question bank with detailed solutions and explanations",
      originalPrice: "₹199",
      currentPrice: "₹19",
      discount: "90% OFF",
      pages: "680",
      format: "Question Bank",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      exam: "NEET",
      class: "Dropper"
    }
  ];

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

  const stats = [
    { number: '100+', label: 'Books Sold' },
    { number: '95%', label: 'Customer Satisfaction' },
    { number: '15+', label: 'Expert Authors' },
    { number: '50+', label: 'Book Titles' }
  ];

  const features = [
    { icon: Target, title: 'Exam Focused', desc: 'Books specifically designed for competitive exam success' },
    { icon: Shield, title: 'Quality Assured', desc: 'Content verified by subject matter experts and toppers' },
    { icon: Zap, title: 'Quick Delivery', desc: 'Fast digital delivery and physical shipping options' },
    { icon: Award, title: 'Proven Results', desc: 'Thousands of successful students recommend our books' }
  ];

  const renderBookCard = (book) => (
    <motion.div
      key={book.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card p-6 hover:scale-105 transition-transform duration-300"
    >
      <div className="relative mb-4">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        {book.discount && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              {book.discount}
            </span>
          </div>
        )}
        {book.exam && (
          <div className="absolute top-2 right-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
              {book.exam}
            </span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold text-primary-600 mb-2">
          {book.category}
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {book.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <BookMarked className="w-4 h-4 mr-2" />
          By {book.author}
        </div>

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

        {book.class && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            {book.class}
          </div>
        )}

        {book.currentPrice && (
          <div className="mb-6">
            <span className="text-2xl font-bold text-primary-600">{book.currentPrice}</span>
            <span className="text-gray-500 dark:text-gray-400 line-through ml-2">{book.originalPrice}</span>
          </div>
        )}

        {book.currentPrice ? (
          <button className="btn-primary w-full flex items-center justify-center min-h-[44px]">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </button>
        ) : (
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 w-full flex items-center justify-center min-h-[44px]">
            <Book className="w-4 h-4 mr-2" />
            Read Now
          </button>
        )}
      </div>
    </motion.div>
  );

  const renderEmptyState = (category) => (
    <div className="col-span-full text-center py-16">
      <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
        Currently no books available
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        We're working on adding more {category} books. Check back soon!
      </p>
    </div>
  );

  const renderBookSection = (exam, classType) => {
    const filteredBooks = books.filter(book => 
      book.exam === exam && book.class === classType
    );

    return (
      <div key={`${exam}-${classType}`} className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {exam} - {classType}
        </h3>
        {filteredBooks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map(renderBookCard)}
          </div>
        ) : (
          renderEmptyState(`${exam} ${classType}`)
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-primary text-white min-h-screen flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-yellow-300" />
                </div>
                <h2 className="text-sm font-semibold text-blue-100 tracking-wide">
                  PREMIUM STUDY MATERIALS
                </h2>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight px-4"
              >
                Master Your Exams with{' '}
                <span className="text-yellow-300">
                  EXAMFUSION
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed px-6"
              >
                Premium study materials, handwritten notes, and question banks designed by expert educators. 
                Get the best resources to ace your competitive exams.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 px-4"
              >
                <Link 
                  to="#books" 
                  className="group bg-white text-primary-600 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 text-base w-full sm:w-auto min-w-[160px] flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  Browse Books
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/register" 
                  className="group border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 text-base w-full sm:w-auto min-w-[160px] flex items-center justify-center"
                >
                  Start Learning
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 section-padding">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
           {stats.map((stat, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="text-center"
             >
               <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                 {stat.number}
               </div>
               <div className="text-gray-600 dark:text-gray-300">
                 {stat.label}
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>

      <section id="books" className="section-padding">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
           <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Study Materials</h2>
           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             Premium study materials designed by expert educators for competitive exam success
           </p>
         </motion.div>

         <div className="flex justify-center mb-12">
           <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
             <button
               onClick={() => setActiveTab('featured')}
               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                 activeTab === 'featured'
                   ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-md'
                   : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
               }`}
             >
               Featured Books
             </button>
             
             <button
               onClick={() => setActiveTab('neet')}
               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                 activeTab === 'neet'
                   ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-md'
                   : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
               }`}
             >
               NEET
             </button>
             <button
               onClick={() => setActiveTab('jee')}
               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                 activeTab === 'jee'
                   ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-md'
                   : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
               }`}
             >
               JEE
             </button>
           </div>
         </div>

         {activeTab === 'featured' && (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {books.map((book, index) => (
               <motion.div
                 key={book.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
               >
                 {renderBookCard(book)}
               </motion.div>
             ))}
           </div>
         )}

         {activeTab === 'neet' && (
           <div>
             {renderBookSection('NEET', 'Class 11')}
             {renderBookSection('NEET', 'Class 12')}
             {renderBookSection('NEET', 'Dropper')}
           </div>
         )}

         {activeTab === 'jee' && (
           <div>
             {renderBookSection('JEE', 'Class 11')}
             {renderBookSection('JEE', 'Class 12')}
             {renderBookSection('JEE', 'Dropper')}
           </div>
         )}
       </div>
     </section>

      <section className="bg-gray-50 dark:bg-gray-800 section-padding">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
           <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose EXAMFUSION Books?</h2>
           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             We provide the best study materials with expert guidance and proven results
           </p>
         </motion.div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {features.map((feature, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               className="text-center"
             >
               <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                 <feature.icon className="w-8 h-8 text-primary-600" />
               </div>
               <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
               <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
             </motion.div>
           ))}
         </div>
       </div>
     </section>

      <section className="bg-gradient-primary text-white section-padding">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
         >
           <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Exams?</h2>
           <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
             Get access to premium study materials designed by expert educators
           </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-base min-w-[180px] text-center">
                Get Started Today
              </Link>
              <Link to="#books" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-base min-w-[180px] text-center">
                Browse Books
              </Link>
            </div>
         </motion.div>
       </div>
     </section>
   </div>
 );
};

export default Home;
