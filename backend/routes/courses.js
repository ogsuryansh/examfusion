const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Course = require('../models/Course');
const { auth, authorizeInstructor, authorizeCourseOwner } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isIn(['engineering', 'medical', 'management', 'civil-services', 'banking', 'defense', 'other']),
  query('level').optional().isIn(['beginner', 'intermediate', 'advanced']),
  query('search').optional().trim(),
  query('sort').optional().isIn(['price', '-price', 'rating', '-rating', 'createdAt', '-createdAt', 'enrollment', '-enrollment']),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 12,
      category,
      level,
      search,
      sort = '-createdAt',
      minPrice,
      maxPrice
    } = req.query;

    // Build query
    const query = { status: 'published' };

    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$text = { $search: search };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const courses = await Course.find(query)
      .populate('instructor', 'firstName lastName avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-lessons -reviews');

    // Get total count for pagination
    const total = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: courses
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
});

// @route   GET /api/courses/featured
// @desc    Get featured courses
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const courses = await Course.getFeaturedCourses(parseInt(limit));

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured courses'
    });
  }
});

// @route   GET /api/courses/popular
// @desc    Get popular courses
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const courses = await Course.getPopularCourses(parseInt(limit));

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('Get popular courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching popular courses'
    });
  }
});

// @route   GET /api/courses/search
// @desc    Search courses
// @access  Public
router.get('/search', [
  query('q').notEmpty().withMessage('Search query is required'),
  query('category').optional().isIn(['engineering', 'medical', 'management', 'civil-services', 'banking', 'defense', 'other']),
  query('level').optional().isIn(['beginner', 'intermediate', 'advanced'])
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { q, category, level } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (level) filters.level = level;

    const courses = await Course.searchCourses(q, filters);

    res.status(200).json({
      success: true,
      count: courses.length,
      query: q,
      data: courses
    });

  } catch (error) {
    console.error('Search courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching courses'
    });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName avatar bio')
      .populate('prerequisites', 'title thumbnail')
      .populate('relatedCourses', 'title thumbnail instructor');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Increment view count
    course.analytics.views += 1;
    await course.save();

    res.status(200).json({
      success: true,
      data: course
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
});

// @route   POST /api/courses
// @desc    Create new course
// @access  Private (Instructor/Admin)
router.post('/', authorizeInstructor, [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters'),
  body('category')
    .isIn(['engineering', 'medical', 'management', 'civil-services', 'banking', 'defense', 'other'])
    .withMessage('Invalid category'),
  body('level')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid level'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('thumbnail')
    .notEmpty()
    .withMessage('Thumbnail is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const courseData = {
      ...req.body,
      instructor: req.user.id
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      success: true,
      data: course
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating course'
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Course Owner/Admin)
router.put('/:id', authorizeCourseOwner, [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters'),
  body('category')
    .optional()
    .isIn(['engineering', 'medical', 'management', 'civil-services', 'banking', 'defense', 'other'])
    .withMessage('Invalid category'),
  body('level')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid level'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('instructor', 'firstName lastName avatar');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating course'
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Course Owner/Admin)
router.delete('/:id', authorizeCourseOwner, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting course'
    });
  }
});

// @route   POST /api/courses/:id/reviews
// @desc    Add review to course
// @access  Private
router.post('/:id/reviews', auth, [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is enrolled in the course
    const isEnrolled = course.enrollment.total > 0; // This is a simplified check
    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'You must be enrolled in the course to leave a review'
      });
    }

    const { rating, comment } = req.body;
    await course.addReview(req.user.id, rating, comment);

    res.status(200).json({
      success: true,
      message: 'Review added successfully'
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in course
// @access  Private
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.status !== 'published') {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    // Enroll user in course
    await req.user.enrollInCourse(course._id);
    
    // Update course enrollment count
    await course.updateEnrollmentCount('total');

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course'
    });

  } catch (error) {
    console.error('Enroll in course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while enrolling in course'
    });
  }
});

module.exports = router;
