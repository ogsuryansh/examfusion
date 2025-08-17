const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required']
  },
  videoUrl: {
    type: String
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  order: {
    type: Number,
    required: true
  },
  isFree: {
    type: Boolean,
    default: false
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number
  }],
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Course title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['engineering', 'medical', 'management', 'civil-services', 'banking', 'defense', 'other']
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  discount: {
    type: Number,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  thumbnail: {
    type: String,
    required: [true, 'Course thumbnail is required']
  },
  banner: {
    type: String
  },
  lessons: [lessonSchema],
  totalLessons: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number, // in minutes
    default: 0
  },
  requirements: [{
    type: String,
    trim: true
  }],
  learningOutcomes: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  language: {
    type: String,
    default: 'English'
  },
  certificate: {
    included: {
      type: Boolean,
      default: true
    },
    template: {
      type: String
    }
  },
  enrollment: {
    total: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    },
    completed: {
      type: Number,
      default: 0
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  access: {
    type: String,
    enum: ['lifetime', 'subscription', 'limited'],
    default: 'lifetime'
  },
  accessDuration: {
    type: Number, // in days, for limited access
    default: null
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  relatedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    uniqueViews: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ isFeatured: 1, isPopular: 1 });
courseSchema.index({ 'ratings.average': -1 });
courseSchema.index({ 'enrollment.total': -1 });

// Pre-save middleware to generate slug and update totals
courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  // Update total lessons and duration
  this.totalLessons = this.lessons.length;
  this.totalDuration = this.lessons.reduce((total, lesson) => total + lesson.duration, 0);
  
  next();
});

// Virtual for discounted price
courseSchema.virtual('discountedPrice').get(function() {
  if (this.discount && this.discount > 0) {
    return this.price - (this.price * this.discount / 100);
  }
  return this.price;
});

// Virtual for is discounted
courseSchema.virtual('isDiscounted').get(function() {
  return this.discount && this.discount > 0;
});

// Method to calculate average rating
courseSchema.methods.calculateAverageRating = function() {
  const totalRatings = Object.values(this.ratings.distribution).reduce((sum, count) => sum + count, 0);
  
  if (totalRatings === 0) {
    this.ratings.average = 0;
  } else {
    const weightedSum = Object.entries(this.ratings.distribution).reduce((sum, [rating, count]) => {
      return sum + (parseInt(rating) * count);
    }, 0);
    this.ratings.average = weightedSum / totalRatings;
  }
  
  this.ratings.count = totalRatings;
  return this.save();
};

// Method to add review
courseSchema.methods.addReview = function(userId, rating, comment) {
  // Remove existing review by this user
  this.reviews = this.reviews.filter(review => review.user.toString() !== userId.toString());
  
  // Add new review
  this.reviews.push({
    user: userId,
    rating,
    comment
  });
  
  // Update rating distribution
  this.ratings.distribution[rating]++;
  
  // Calculate new average
  this.calculateAverageRating();
  
  return this.save();
};

// Method to update enrollment count
courseSchema.methods.updateEnrollmentCount = function(type = 'total') {
  if (type === 'total') {
    this.enrollment.total++;
  } else if (type === 'active') {
    this.enrollment.active++;
  } else if (type === 'completed') {
    this.enrollment.completed++;
  }
  
  return this.save();
};

// Static method to get featured courses
courseSchema.statics.getFeaturedCourses = function(limit = 6) {
  return this.find({ 
    status: 'published', 
    isFeatured: true 
  })
  .populate('instructor', 'firstName lastName avatar')
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Static method to get popular courses
courseSchema.statics.getPopularCourses = function(limit = 6) {
  return this.find({ 
    status: 'published' 
  })
  .populate('instructor', 'firstName lastName avatar')
  .sort({ 'enrollment.total': -1, 'ratings.average': -1 })
  .limit(limit);
};

// Static method to search courses
courseSchema.statics.searchCourses = function(query, filters = {}) {
  const searchQuery = {
    status: 'published',
    $text: { $search: query }
  };
  
  if (filters.category) {
    searchQuery.category = filters.category;
  }
  
  if (filters.level) {
    searchQuery.level = filters.level;
  }
  
  if (filters.priceRange) {
    searchQuery.price = {
      $gte: filters.priceRange.min,
      $lte: filters.priceRange.max
    };
  }
  
  return this.find(searchQuery)
    .populate('instructor', 'firstName lastName avatar')
    .sort({ score: { $meta: 'textScore' } });
};

module.exports = mongoose.model('Course', courseSchema);
