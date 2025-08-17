const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');
const { auth, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses.course', 'title thumbnail instructor category level')
      .populate('savedCourses', 'title thumbnail instructor category level');

    res.status(200).json({
      success: true,
      data: user.getProfile()
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
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

    const { firstName, lastName, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone },
      { new: true, runValidators: true }
    ).populate('enrolledCourses.course', 'title thumbnail instructor category level');

    res.status(200).json({
      success: true,
      data: user.getProfile()
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', auth, [
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto'),
  body('language')
    .optional()
    .isLength({ min: 2, max: 5 })
    .withMessage('Language code must be between 2 and 5 characters'),
  body('notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notifications must be a boolean'),
  body('notifications.push')
    .optional()
    .isBoolean()
    .withMessage('Push notifications must be a boolean'),
  body('notifications.sms')
    .optional()
    .isBoolean()
    .withMessage('SMS notifications must be a boolean')
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

    const { theme, language, notifications } = req.body;

    const updateData = {};
    if (theme) updateData['preferences.theme'] = theme;
    if (language) updateData['preferences.language'] = language;
    if (notifications) {
      if (notifications.email !== undefined) updateData['preferences.notifications.email'] = notifications.email;
      if (notifications.push !== undefined) updateData['preferences.notifications.push'] = notifications.push;
      if (notifications.sms !== undefined) updateData['preferences.notifications.sms'] = notifications.sms;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user.preferences
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating preferences'
    });
  }
});

// @route   GET /api/users/enrolled-courses
// @desc    Get user's enrolled courses
// @access  Private
router.get('/enrolled-courses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'enrolledCourses.course',
        select: 'title description thumbnail instructor category level price totalLessons totalDuration',
        populate: {
          path: 'instructor',
          select: 'firstName lastName avatar'
        }
      });

    res.status(200).json({
      success: true,
      count: user.enrolledCourses.length,
      data: user.enrolledCourses
    });

  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enrolled courses'
    });
  }
});

// @route   POST /api/users/enroll/:courseId
// @desc    Enroll in a course
// @access  Private
router.post('/enroll/:courseId', auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Check if course exists
    const course = await Course.findById(courseId);
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
    await req.user.enrollInCourse(courseId);
    
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

// @route   PUT /api/users/course-progress/:courseId
// @desc    Update course progress
// @access  Private
router.put('/course-progress/:courseId', auth, [
  body('progress')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100'),
  body('lessonId')
    .optional()
    .isMongoId()
    .withMessage('Invalid lesson ID')
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

    const { courseId } = req.params;
    const { progress, lessonId } = req.body;

    // Update course progress
    await req.user.updateCourseProgress(courseId, progress, lessonId);

    res.status(200).json({
      success: true,
      message: 'Course progress updated successfully'
    });

  } catch (error) {
    console.error('Update course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating course progress'
    });
  }
});

// @route   POST /api/users/save-course/:courseId
// @desc    Save course to user's list
// @access  Private
router.post('/save-course/:courseId', auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already saved
    const isAlreadySaved = req.user.savedCourses.includes(courseId);
    if (isAlreadySaved) {
      return res.status(400).json({
        success: false,
        message: 'Course is already saved'
      });
    }

    // Add to saved courses
    req.user.savedCourses.push(courseId);
    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'Course saved successfully'
    });

  } catch (error) {
    console.error('Save course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving course'
    });
  }
});

// @route   DELETE /api/users/save-course/:courseId
// @desc    Remove course from user's saved list
// @access  Private
router.delete('/save-course/:courseId', auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Remove from saved courses
    req.user.savedCourses = req.user.savedCourses.filter(
      id => id.toString() !== courseId
    );
    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'Course removed from saved list'
    });

  } catch (error) {
    console.error('Remove saved course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing saved course'
    });
  }
});

// @route   GET /api/users/saved-courses
// @desc    Get user's saved courses
// @access  Private
router.get('/saved-courses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedCourses',
        select: 'title description thumbnail instructor category level price',
        populate: {
          path: 'instructor',
          select: 'firstName lastName avatar'
        }
      });

    res.status(200).json({
      success: true,
      count: user.savedCourses.length,
      data: user.savedCourses
    });

  } catch (error) {
    console.error('Get saved courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching saved courses'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user's learning statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses.course', 'title category level');

    // Calculate additional stats
    const totalCourses = user.enrolledCourses.length;
    const completedCourses = user.enrolledCourses.filter(
      enrollment => enrollment.progress === 100
    ).length;
    const averageProgress = totalCourses > 0 
      ? user.enrolledCourses.reduce((sum, enrollment) => sum + enrollment.progress, 0) / totalCourses
      : 0;

    const stats = {
      ...user.stats,
      totalCourses,
      completedCourses,
      averageProgress: Math.round(averageProgress * 100) / 100,
      inProgressCourses: totalCourses - completedCourses
    };

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user statistics'
    });
  }
});

// @route   PUT /api/users/update-stats
// @desc    Update user's study statistics
// @access  Private
router.put('/update-stats', auth, [
  body('studyHours')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Study hours must be a positive number'),
  body('score')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100')
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

    const { studyHours, score } = req.body;

    // Update study stats
    await req.user.updateStudyStats(studyHours || 0, score);

    res.status(200).json({
      success: true,
      message: 'Study statistics updated successfully'
    });

  } catch (error) {
    console.error('Update study stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating study statistics'
    });
  }
});

// @route   GET /api/users (Admin only)
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/', authorizeAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    // Build query
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

module.exports = router;
