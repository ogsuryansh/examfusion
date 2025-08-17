const express = require('express');
// const cloudinary = require('cloudinary').v2;
const { auth, authorizeInstructor } = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary (temporarily disabled for development)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// @route   POST /api/uploads/image
// @desc    Upload image to Cloudinary
// @access  Private
router.post('/image', auth, async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    const file = req.files.image;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid image file (JPEG, PNG, GIF, WebP)'
      });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 5MB'
      });
    }

    // Mock upload response (Cloudinary temporarily disabled)
    const mockResult = {
      secure_url: `https://via.placeholder.com/800x600/0066cc/ffffff?text=Uploaded+Image`,
      public_id: `examfusion/images/${Date.now()}`,
      width: 800,
      height: 600,
      format: 'jpeg',
      bytes: file.size
    };

    res.status(200).json({
      success: true,
      data: {
        url: mockResult.secure_url,
        public_id: mockResult.public_id,
        width: mockResult.width,
        height: mockResult.height,
        format: mockResult.format,
        size: mockResult.bytes
      }
    });

  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during image upload'
    });
  }
});

// @route   POST /api/uploads/pdf
// @desc    Upload PDF to Cloudinary
// @access  Private
router.post('/pdf', auth, async (req, res) => {
  try {
    if (!req.files || !req.files.pdf) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF file'
      });
    }

    const file = req.files.pdf;

    // Validate file type
    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid PDF file'
      });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 10MB'
      });
    }

    // Mock upload response (Cloudinary temporarily disabled)
    const mockResult = {
      secure_url: `https://via.placeholder.com/800x600/ff6600/ffffff?text=Uploaded+PDF`,
      public_id: `examfusion/pdfs/${Date.now()}`,
      format: 'pdf',
      bytes: file.size
    };

    res.status(200).json({
      success: true,
      data: {
        url: mockResult.secure_url,
        public_id: mockResult.public_id,
        format: mockResult.format,
        size: mockResult.bytes
      }
    });

  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during PDF upload'
    });
  }
});

// @route   POST /api/uploads/video
// @desc    Upload video to Cloudinary
// @access  Private (Instructor/Admin)
router.post('/video', authorizeInstructor, async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a video file'
      });
    }

    const file = req.files.video;

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/wmv', 'video/flv'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid video file (MP4, MOV, AVI, WMV, FLV)'
      });
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 100MB'
      });
    }

    // Mock upload response (Cloudinary temporarily disabled)
    const mockResult = {
      secure_url: `https://via.placeholder.com/800x600/00cc66/ffffff?text=Uploaded+Video`,
      public_id: `examfusion/videos/${Date.now()}`,
      duration: 120,
      format: 'mp4',
      bytes: file.size,
      width: 1280,
      height: 720
    };

    res.status(200).json({
      success: true,
      data: {
        url: mockResult.secure_url,
        public_id: mockResult.public_id,
        duration: mockResult.duration,
        format: mockResult.format,
        size: mockResult.bytes,
        width: mockResult.width,
        height: mockResult.height
      }
    });

  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during video upload'
    });
  }
});

// @route   POST /api/uploads/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/avatar', auth, async (req, res) => {
  try {
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an avatar image'
      });
    }

    const file = req.files.avatar;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid image file (JPEG, PNG, GIF)'
      });
    }

    // Validate file size (2MB limit)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 2MB'
      });
    }

    // Mock upload response (Cloudinary temporarily disabled)
    const mockResult = {
      secure_url: `https://via.placeholder.com/200x200/0066cc/ffffff?text=Avatar`,
      public_id: `examfusion/avatars/${Date.now()}`,
      width: 200,
      height: 200
    };

    // Update user avatar in database
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user.id, {
      avatar: mockResult.secure_url
    });

    res.status(200).json({
      success: true,
      data: {
        url: mockResult.secure_url,
        public_id: mockResult.public_id,
        width: mockResult.width,
        height: mockResult.height
      }
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during avatar upload'
    });
  }
});

// @route   DELETE /api/uploads/:public_id
// @desc    Delete file from Cloudinary
// @access  Private
router.delete('/:public_id', auth, async (req, res) => {
  try {
    const { public_id } = req.params;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    // Mock delete response (Cloudinary temporarily disabled)
    res.status(200).json({
      success: true,
      message: 'File deleted successfully (mock)'
    });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during file deletion'
    });
  }
});

// @route   POST /api/uploads/bulk
// @desc    Upload multiple files
// @access  Private (Instructor/Admin)
router.post('/bulk', authorizeInstructor, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one file'
      });
    }

    const uploadedFiles = [];
    const errors = [];

    // Process each file
    for (const [fieldName, file] of Object.entries(req.files)) {
      try {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
          errors.push(`${file.name}: Invalid file type`);
          continue;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          errors.push(`${file.name}: File too large`);
          continue;
        }

        // Determine folder based on file type
        const folder = file.mimetype === 'application/pdf' ? 'examfusion/pdfs' : 'examfusion/images';

        // Mock upload response (Cloudinary temporarily disabled)
        const mockUrl = file.mimetype === 'application/pdf' 
          ? `https://via.placeholder.com/800x600/ff6600/ffffff?text=Uploaded+PDF`
          : `https://via.placeholder.com/800x600/0066cc/ffffff?text=Uploaded+Image`;

        uploadedFiles.push({
          fieldName,
          originalName: file.name,
          url: mockUrl,
          public_id: `${folder}/${Date.now()}`,
          format: file.mimetype === 'application/pdf' ? 'pdf' : 'jpeg',
          size: file.size
        });

      } catch (error) {
        errors.push(`${file.name}: Upload failed`);
      }
    }

    res.status(200).json({
      success: true,
      data: {
        uploaded: uploadedFiles,
        errors: errors.length > 0 ? errors : undefined
      }
    });

  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during bulk upload'
    });
  }
});

module.exports = router;
