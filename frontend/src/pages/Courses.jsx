import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Clock, 
  BookOpen,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Target,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'medical', name: 'Medical' },
    { id: 'management', name: 'Management' },
    { id: 'civil-services', name: 'Civil Services' },
    { id: 'banking', name: 'Banking' },
    { id: 'defense', name: 'Defense' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const courses = [
    {
      id: 1,
      title: 'JEE Main & Advanced Complete Course',
      description: 'Comprehensive preparation for engineering entrance exams with live classes, mock tests, and personalized guidance.',
      category: 'engineering',
      level: 'advanced',
      duration: '12 months',
      students: '2,500+',
      rating: 4.8,
      reviews: 1247,
      price: '₹15,999',
      originalPrice: '₹25,999',
      discount: '38%',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      features: ['Live Classes', 'Mock Tests', 'Study Material', 'Doubt Support', 'Personal Mentor'],
      instructor: 'Dr. Rajesh Kumar',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      tags: ['JEE Main', 'JEE Advanced', 'IIT', 'Engineering']
    },
    {
      id: 2,
      title: 'NEET Preparation Program',
      description: 'Complete medical entrance exam preparation with comprehensive study material and expert guidance.',
      category: 'medical',
      level: 'advanced',
      duration: '12 months',
      students: '1,800+',
      rating: 4.9,
      reviews: 892,
      price: '₹18,999',
      originalPrice: '₹28,999',
      discount: '34%',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      features: ['Live Classes', 'Mock Tests', 'Study Material', 'Doubt Support', 'Personal Mentor'],
      instructor: 'Dr. Priya Sharma',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      tags: ['NEET', 'Medical', 'MBBS', 'AIIMS']
    },
    {
      id: 3,
      title: 'CAT & MBA Entrance Preparation',
      description: 'Ace your management entrance exams with our comprehensive CAT preparation program.',
      category: 'management',
      level: 'intermediate',
      duration: '8 months',
      students: '1,200+',
      rating: 4.7,
      reviews: 634,
      price: '₹12,999',
      originalPrice: '₹19,999',
      discount: '35%',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      features: ['Live Classes', 'Mock Tests', 'Study Material', 'Doubt Support'],
      instructor: 'Prof. Amit Kumar',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      tags: ['CAT', 'MBA', 'Management', 'IIM']
    },
    {
      id: 4,
      title: 'UPSC Civil Services Complete Course',
      description: 'Comprehensive preparation for UPSC Civil Services Examination with expert guidance.',
      category: 'civil-services',
      level: 'advanced',
      duration: '18 months',
      students: '800+',
      rating: 4.6,
      reviews: 445,
      price: '₹22,999',
      originalPrice: '₹35,999',
      discount: '36%',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop',
      features: ['Live Classes', 'Mock Tests', 'Study Material', 'Doubt Support', 'Personal Mentor'],
      instructor: 'Dr. Sanjay Verma',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      tags: ['UPSC', 'Civil Services', 'IAS', 'IPS']
    },
    {
      id: 5,
      title: 'Banking Exams Preparation',
      description: 'Complete preparation for IBPS, SBI, and other banking examinations.',
      category: 'banking',
      level: 'intermediate',
      duration: '6 months',
      students: '1,500+',
      rating: 4.5,
      reviews: 723,
      price: '₹8,999',
      originalPrice: '₹14,999',
      discount: '40%',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      features: ['Live Classes', 'Mock Tests', 'Study Material', 'Doubt Support'],
      instructor: 'Ms. Anjali Patel',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      tags: ['Banking', 'IBPS', 'SBI', 'PO', 'Clerk']
    },
    {
      id: 6,
      title: 'NDA & CDS Defense Exams',
      description: 'Complete preparation for National Defence Academy and Combined Defence Services examinations.',
      category: 'defense',
      level: 'intermediate',
      duration: '10 months',
      students: '600+',
      rating: 4.4,
      reviews: 312,
      price: '₹11,999',
      originalPrice: '₹18,999',
      discount: '37%',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
      features: ['Live Classes', 'Mock Tests', 'Study Material', 'Doubt Support'],
      instructor: 'Col. Rajesh Singh',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      tags: ['NDA', 'CDS', 'Defense', 'Army', 'Air Force']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Explore Our Courses</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Choose from our comprehensive range of exam preparation courses designed by industry experts and successful candidates
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, topics, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-gray-600 dark:text-gray-300">
              {filteredCourses.length} courses found
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card overflow-hidden hover:scale-105"
                >
                  {/* Course Image */}
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        {course.discount} OFF
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Instructor */}
                    <div className="flex items-center mb-4">
                      <img
                        src={course.instructorImage}
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {course.instructor}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{course.rating}</span>
                        <span className="ml-1 text-gray-400">({course.reviews})</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {course.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                          >
                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary-600">
                          {course.price}
                        </span>
                        <span className="text-gray-500 line-through ml-2">
                          {course.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {course.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/courses/${course.id}`}
                      className="btn-primary w-full text-center flex items-center justify-center"
                    >
                      View Course
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-gray-800 section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our course advisors to get personalized recommendations based on your goals and requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Advisor
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
