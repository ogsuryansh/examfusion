import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  Play,
  CheckCircle,
  Star,
  Download,
  Share2,
  Settings,
  User,
  Bell,
  Search,
  Filter,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    totalCourses: 5,
    completedCourses: 2,
    totalHours: 48,
    averageScore: 87,
    streak: 12,
    certificates: 3
  };

  const enrolledCourses = [
    {
      id: 1,
      title: 'JEE Main & Advanced Complete Course',
      instructor: 'Dr. Rajesh Kumar',
      progress: 75,
      totalLessons: 120,
      completedLessons: 90,
      nextLesson: 'Advanced Calculus - Integration Techniques',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      lastAccessed: '2 hours ago'
    },
    {
      id: 2,
      title: 'NEET Preparation Program',
      instructor: 'Dr. Priya Sharma',
      progress: 45,
      totalLessons: 150,
      completedLessons: 67,
      nextLesson: 'Human Anatomy - Nervous System',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      lastAccessed: '1 day ago'
    },
    {
      id: 3,
      title: 'CAT & MBA Entrance Preparation',
      instructor: 'Prof. Amit Kumar',
      progress: 20,
      totalLessons: 80,
      completedLessons: 16,
      nextLesson: 'Quantitative Aptitude - Number Series',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      lastAccessed: '3 days ago'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Completed lesson: Integration Techniques',
      course: 'JEE Main & Advanced',
      time: '2 hours ago',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'quiz_taken',
      title: 'Scored 85% in Physics Quiz',
      course: 'JEE Main & Advanced',
      time: '1 day ago',
      icon: Award
    },
    {
      id: 3,
      type: 'course_enrolled',
      title: 'Enrolled in CAT Preparation',
      course: 'CAT & MBA Entrance',
      time: '3 days ago',
      icon: BookOpen
    },
    {
      id: 4,
      type: 'certificate_earned',
      title: 'Earned certificate: Basic Mathematics',
      course: 'JEE Main & Advanced',
      time: '1 week ago',
      icon: Award
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Live Class: Advanced Calculus',
      instructor: 'Dr. Rajesh Kumar',
      time: 'Today, 3:00 PM',
      duration: '2 hours',
      type: 'live'
    },
    {
      id: 2,
      title: 'Mock Test: Physics Section',
      instructor: 'Dr. Priya Sharma',
      time: 'Tomorrow, 10:00 AM',
      duration: '3 hours',
      type: 'test'
    },
    {
      id: 3,
      title: 'Doubt Clearing Session',
      instructor: 'Prof. Amit Kumar',
      time: 'Wednesday, 6:00 PM',
      duration: '1 hour',
      type: 'doubt'
    }
  ];

  const performanceData = [
    { subject: 'Mathematics', score: 92, target: 95 },
    { subject: 'Physics', score: 88, target: 90 },
    { subject: 'Chemistry', score: 85, target: 88 },
    { subject: 'Biology', score: 78, target: 85 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span>Welcome back,</span>
                <span className="font-medium text-primary-600">John Doe</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {[
            { icon: BookOpen, label: 'Total Courses', value: userStats.totalCourses, color: 'blue' },
            { icon: CheckCircle, label: 'Completed', value: userStats.completedCourses, color: 'green' },
            { icon: Clock, label: 'Study Hours', value: userStats.totalHours, color: 'purple' },
            { icon: Award, label: 'Avg Score', value: `${userStats.averageScore}%`, color: 'yellow' },
            { icon: Zap, label: 'Streak', value: `${userStats.streak} days`, color: 'red' },
            { icon: Award, label: 'Certificates', value: userStats.certificates, color: 'indigo' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Enrolled Courses */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {enrolledCourses.map((course, index) => (
                  <div key={course.id} className="flex space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {course.instructor} • {course.completedLessons}/{course.totalLessons} lessons
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Next: {course.nextLesson}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Last accessed: {course.lastAccessed}
                        </span>
                        <button className="btn-primary text-sm px-4 py-2">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Performance Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Analytics</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {performanceData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.subject}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {item.score}% / {item.target}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(item.score / item.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
              </div>
              
              <div className="p-6 space-y-3">
                {[
                  { icon: Play, label: 'Continue Learning', color: 'primary' },
                  { icon: Download, label: 'Download Materials', color: 'green' },
                  { icon: Share2, label: 'Share Progress', color: 'blue' },
                  { icon: Target, label: 'Set Goals', color: 'purple' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    <div className={`w-8 h-8 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-full flex items-center justify-center`}>
                      <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Sessions</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={session.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      session.type === 'live' ? 'bg-red-500' :
                      session.type === 'test' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {session.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {session.instructor} • {session.time}
                      </p>
                      <p className="text-xs text-gray-500">
                        Duration: {session.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {activity.course} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
