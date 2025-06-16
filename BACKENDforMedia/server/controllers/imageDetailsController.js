import { v2 as cloudinary } from "cloudinary"
import Image from "../models/imageDetails.js"
import fs from 'fs/promises'

// Helper function to determine resource type
const getResourceType = (file) => {
    const videoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
    return videoTypes.includes(file.mimetype) ? 'video' : 'image';
};

// Add Media Details: 
export const addImageDetails = async (req, res) => {
    try {
        // For testing purposes, we'll skip authentication temporarily
        // if (!req.user) {
        //     return res.status(401).json({ success: false, message: "Authentication required" });
        // }

        // Validate request body
        if (!req.body.imageData) {
            return res.status(400).json({ success: false, message: "Media data is required" });
        }

        // Validate files
        if (!req.files || ((!req.files.images || req.files.images.length === 0) && 
            (!req.files.videos || req.files.videos.length === 0))) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        let imageData;
        try {
            // Handle both string and object formats
            imageData = typeof req.body.imageData === 'string' 
                ? JSON.parse(req.body.imageData)
                : req.body.imageData;
        } catch (error) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid media data format. Must be valid JSON" 
            });
        }

        // Validate required fields
        const requiredFields = ['title', 'description', 'marketingVertical'];
        const missingFields = requiredFields.filter(field => !imageData[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        const uploadedFiles = [];
        const allFiles = [
            ...(req.files.images || []),
            ...(req.files.videos || [])
        ];

        try {
            // Upload files to Cloudinary
            const mediaUrls = await Promise.all(
                allFiles.map(async (file) => {
                    const resourceType = getResourceType(file);
                    const uploadOptions = {
                        resource_type: resourceType,
                        folder: resourceType === 'video' ? 'marketing-videos' : 'marketing-images',
                        quality: 'auto'
                    };

                    // Add video-specific options
                    if (resourceType === 'video') {
                        uploadOptions.chunk_size = 6000000; // 6MB chunks
                        uploadOptions.eager = [
                            { format: 'mp4', quality: 'auto' }
                        ];
                    }

                    const result = await cloudinary.uploader.upload(file.path, uploadOptions);
                    uploadedFiles.push(file.path);

                    return {
                        url: result.secure_url,
                        type: resourceType,
                        format: result.format,
                        duration: result.duration || null, // For videos
                        thumbnail: resourceType === 'video' ? result.thumbnail_url : null
                    };
                })
            );

            // Create media record in database
            const newMedia = await Image.create({ 
                title: imageData.title,
                description: imageData.description,
                marketingVertical: imageData.marketingVertical,
                media: mediaUrls,
                // For testing, we'll use a dummy userId
                userId: "dummy_user_id"
            });

            // Cleanup uploaded files
            await Promise.all(
                uploadedFiles.map(filePath => 
                    fs.unlink(filePath).catch(err => 
                        console.error(`Failed to delete file ${filePath}:`, err)
                    )
                )
            );

            return res.status(201).json({ 
                success: true, 
                message: "Media files uploaded successfully",
                data: newMedia
            });
        } catch (error) {
            // Cleanup files if upload fails
            await Promise.all(
                uploadedFiles.map(filePath => 
                    fs.unlink(filePath).catch(err => 
                        console.error(`Failed to delete file ${filePath}:`, err)
                    )
                )
            );
            throw error;
        }
    } catch (error) {
        console.error('Media upload error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to upload media files",
            error: error.message
        });
    }
}