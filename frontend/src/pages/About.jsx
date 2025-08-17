import { motion } from 'framer-motion';
import { 
  Target, 
  Award, 
  Users, 
  BookOpen, 
  Star,
  CheckCircle,
  GraduationCap,
  Heart,
  Shield,
  Zap,
  Globe,
  TrendingUp
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: '50,000+', label: 'Students Enrolled', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Award },
    { number: '200+', label: 'Expert Teachers', icon: BookOpen },
    { number: '1000+', label: 'Mock Tests', icon: Target }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from content quality to student support.'
    },
    {
      icon: Heart,
      title: 'Student-Centric',
      description: 'Every decision we make is focused on maximizing student success and learning outcomes.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest standards of integrity and transparency in all our operations.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate our teaching methods and technology to stay ahead.'
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Former IIT professor with 15+ years of experience in education technology.',
      linkedin: '#'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Academic Officer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: 'Education expert with PhD in Educational Psychology and 12+ years in curriculum development.',
      linkedin: '#'
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Tech leader with experience at Google and Microsoft, specializing in EdTech solutions.',
      linkedin: '#'
    },
    {
      name: 'Anjali Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Operations expert with 10+ years managing large-scale educational programs.',
      linkedin: '#'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Founded',
      description: 'EXAMFUSION was founded with a vision to democratize quality education.'
    },
    {
      year: '2019',
      title: 'First 1000 Students',
      description: 'Reached our first milestone of 1000 enrolled students across various courses.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our comprehensive online learning platform with live classes.'
    },
    {
      year: '2021',
      title: '10,000+ Students',
      description: 'Crossed 10,000 student milestone with 90% success rate.'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Introduced AI-powered adaptive learning and personalized study plans.'
    },
    {
      year: '2023',
      title: '50,000+ Students',
      description: 'Reached 50,000 students with 95% success rate and expanded course offerings.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About EXAMFUSION</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We are on a mission to transform the way students prepare for competitive exams, 
              making quality education accessible to everyone through innovative technology and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                To democratize quality education by providing comprehensive, affordable, and accessible 
                exam preparation solutions that empower students to achieve their dreams and unlock their potential.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Make quality education accessible to students from all backgrounds
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Provide personalized learning experiences through technology
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Maintain the highest standards of academic excellence
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-primary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-blue-100 mb-6">
                  To become the most trusted and comprehensive online learning platform for competitive 
                  exam preparation, helping millions of students achieve their career goals.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">1M+</div>
                    <div className="text-blue-100 text-sm">Students by 2025</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">98%</div>
                    <div className="text-blue-100 text-sm">Success Rate Target</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-800 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
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

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape our culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 dark:bg-gray-800 section-padding" id="team">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our leadership team brings together decades of experience in education, technology, and business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center p-6"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  View Profile
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey/Milestones */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From a small startup to a leading education platform - our growth story
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 dark:bg-gray-700 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card p-6">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Be part of the revolution in online education and help us empower millions of students
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/careers" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Join Our Team
              </a>
              <a href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
