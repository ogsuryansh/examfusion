const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  avatar: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  enrolledCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedLessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    certificates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certificate'
    }],
    lastAccessed: {
      type: Date,
      default: Date.now
    }
  }],
  savedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  stats: {
    totalStudyHours: {
      type: Number,
      default: 0
    },
    completedCourses: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'enrolledCourses.course': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for total enrolled courses
userSchema.virtual('totalEnrolledCourses').get(function() {
  return this.enrolledCourses.length;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user profile (without sensitive data)
userSchema.methods.getProfile = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    avatar: this.avatar,
    role: this.role,
    fullName: this.fullName,
    isEmailVerified: this.isEmailVerified,
    preferences: this.preferences,
    stats: this.stats,
    totalEnrolledCourses: this.totalEnrolledCourses,
    createdAt: this.createdAt
  };
};

// Method to update study stats
userSchema.methods.updateStudyStats = function(studyHours, score) {
  this.stats.totalStudyHours += studyHours;
  
  if (score) {
    const currentTotal = this.stats.averageScore * this.stats.completedCourses;
    this.stats.completedCourses += 1;
    this.stats.averageScore = (currentTotal + score) / this.stats.completedCourses;
  }
  
  return this.save();
};

// Method to enroll in a course
userSchema.methods.enrollInCourse = function(courseId) {
  const isAlreadyEnrolled = this.enrolledCourses.some(
    enrollment => enrollment.course.toString() === courseId.toString()
  );
  
  if (!isAlreadyEnrolled) {
    this.enrolledCourses.push({
      course: courseId,
      enrolledAt: new Date()
    });
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Method to update course progress
userSchema.methods.updateCourseProgress = function(courseId, progress, lessonId = null) {
  const enrollment = this.enrolledCourses.find(
    enrollment => enrollment.course.toString() === courseId.toString()
  );
  
  if (enrollment) {
    enrollment.progress = progress;
    enrollment.lastAccessed = new Date();
    
    if (lessonId && !enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }
    
    return this.save();
  }
  
  return Promise.reject(new Error('Course not found in enrollments'));
};

module.exports = mongoose.model('User', userSchema);
