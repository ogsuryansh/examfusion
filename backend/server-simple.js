const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes for testing
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'EXAMFUSION Backend Server is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      test: '/test'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test endpoint working!',
    data: {
      test: true,
      timestamp: new Date().toISOString()
    }
  });
});

// Mock API endpoints
app.get('/api/courses', (req, res) => {
  res.json({
    success: true,
    count: 6,
    data: [
      {
        id: '1',
        title: 'JEE Main Complete Course',
        description: 'Comprehensive preparation for JEE Main examination',
        instructor: 'Dr. Rajesh Kumar',
        category: 'Engineering',
        level: 'Advanced',
        price: 9999,
        thumbnail: 'https://via.placeholder.com/400x300/0066cc/ffffff?text=JEE+Main',
        rating: 4.8,
        enrolledStudents: 1250
      },
      {
        id: '2',
        title: 'NEET Biology Masterclass',
        description: 'Complete NEET Biology preparation with expert guidance',
        instructor: 'Dr. Priya Sharma',
        category: 'Medical',
        level: 'Advanced',
        price: 8999,
        thumbnail: 'https://via.placeholder.com/400x300/00cc66/ffffff?text=NEET+Biology',
        rating: 4.9,
        enrolledStudents: 980
      }
    ]
  });
});

app.get('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    data: {
      id,
      title: 'Sample Course',
      description: 'This is a sample course description',
      instructor: 'Sample Instructor',
      category: 'Sample Category',
      level: 'Intermediate',
      price: 4999,
      thumbnail: 'https://via.placeholder.com/400x300/0066cc/ffffff?text=Sample+Course',
      rating: 4.5,
      enrolledStudents: 500
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 EXAMFUSION Backend Server running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
  console.log(`📚 Courses API: http://localhost:${PORT}/api/courses`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
