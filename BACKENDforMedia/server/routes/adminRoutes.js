import express from "express";
import multer from "multer";
import { AdminLogin, isAdminAuth, AdminLogout } from "../controllers/AdminController.js";
import { addImageDetails } from "../controllers/imageDetailsController.js";
import authAdmin from "../middleware/authAdmin.js";
import Image from "../models/imageDetails.js";

const adminRouter = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + getFileExtension(file.originalname));
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
    
    if ([...allowedImageTypes, ...allowedVideoTypes].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF, WEBP) and videos (MP4, MOV, AVI, WMV) are allowed.'), false);
    }
};

// Helper function to get file extension
const getFileExtension = (filename) => {
    return filename.substring(filename.lastIndexOf('.'));
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
        files: 5 // Maximum 5 files per upload
    }
}).fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 }
]);

// Routes
adminRouter.post('/login', AdminLogin);
adminRouter.get('/is-auth', authAdmin, isAdminAuth);
adminRouter.post('/logout', authAdmin, AdminLogout);
adminRouter.post('/upload', authAdmin, upload, addImageDetails);

// Get all verticals and their media items
adminRouter.get('/verticals', async (req, res) => {
  try {
    // Get all unique marketing verticals from the database
    const verticals = await Image.distinct('marketingVertical');
    
    // For each vertical, get its media items
    const verticalData = await Promise.all(verticals.map(async (vertical) => {
      const mediaItems = await Image.find({ marketingVertical: vertical })
        .sort({ createdAt: -1 })
        .select('title description media marketingVertical createdAt');
      
      return {
        id: vertical,
        title: vertical.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: `${vertical.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Services`,
        mediaItems: mediaItems.map(item => ({
          id: item._id,
          title: item.title,
          description: item.description,
          media: item.media.map(media => ({
            url: media.url,
            type: media.type,
            format: media.format,
            duration: media.duration,
            thumbnail: media.thumbnail
          })),
          createdAt: item.createdAt
        }))
      };
    }));
    
    res.json({
      success: true,
      data: verticalData
    });
  } catch (error) {
    console.error('Error fetching verticals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch verticals'
    });
  }
});

// Get media items by vertical
adminRouter.get('/media/:vertical', async (req, res) => {
  try {
    const { vertical } = req.params;
    
    const mediaItems = await Image.find({ marketingVertical: vertical })
      .sort({ createdAt: -1 })
      .select('title description media marketingVertical createdAt');
    
    // Transform the response to match frontend expectations
    const transformedItems = mediaItems.map(item => ({
      id: item._id,
      title: item.title,
      description: item.description,
      media: item.media.map(media => ({
        url: media.url,
        type: media.type,
        format: media.format,
        duration: media.duration,
        thumbnail: media.thumbnail
      })),
      marketingVertical: item.marketingVertical,
      createdAt: item.createdAt
    }));
    
    res.json({
      success: true,
      data: transformedItems
    });
  } catch (error) {
    console.error('Error fetching media items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media items'
    });
  }
});

// Get all media items
adminRouter.get('/media', async (req, res) => {
  try {
    const mediaItems = await Image.find()
      .sort({ createdAt: -1 })
      .select('title description media marketingVertical createdAt');
    
    // Transform the response to match frontend expectations
    const transformedItems = mediaItems.map(item => ({
      id: item._id,
      title: item.title,
      description: item.description,
      url: item.media[0]?.url || '', // Get the first media item's URL
      type: item.media[0]?.type || 'image', // Get the first media item's type
      thumbnail: item.media[0]?.thumbnail || null,
      category: item.marketingVertical,
      createdAt: item.createdAt
    }));
    
    res.json({
      success: true,
      data: transformedItems
    });
  } catch (error) {
    console.error('Error fetching all media items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media items'
    });
  }
});

export default adminRouter;