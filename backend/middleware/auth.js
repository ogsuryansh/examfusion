const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user not found.'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated. Please contact support.'
        });
      }

      // Add user to request object
      req.user = user;
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Optional auth middleware (doesn't require token but adds user if present)
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but we don't throw error for optional auth
        console.log('Invalid token in optional auth:', error.message);
      }
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Instructor authorization middleware
const authorizeInstructor = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Instructor privileges required.'
      });
    }

    next();

  } catch (error) {
    console.error('Instructor auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Admin authorization middleware
const authorizeAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    next();

  } catch (error) {
    console.error('Admin auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Course ownership middleware
const authorizeCourseOwner = async (req, res, next) => {
  try {
    const courseId = req.params.courseId || req.body.courseId;
    
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required.'
      });
    }

    const Course = require('../models/Course');
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.'
      });
    }

    // Allow if user is admin or course instructor
    if (req.user.role === 'admin' || course.instructor.toString() === req.user._id.toString()) {
      req.course = course;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only modify your own courses.'
      });
    }

  } catch (error) {
    console.error('Course ownership middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  auth,
  optionalAuth,
  authorize,
  authorizeInstructor,
  authorizeAdmin,
  authorizeCourseOwner
};
