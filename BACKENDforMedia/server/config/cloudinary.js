import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () =>{
    try {
        // Check for required environment variables
        const requiredEnvVars = [
            'CLOUDINARY_CLOUD_NAME',
            'CLOUDINARY_API_KEY',
            'CLOUDINARY_API_SECRET'
        ];

        const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
        if (missingEnvVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
        }

        // Configure Cloudinary
        cloudinary.config({  
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   
            api_key: process.env.CLOUDINARY_API_KEY,    
            secure: true,
            api_secret: process.env.CLOUDINARY_API_SECRET   
        })   

        // Verify connection by making a test API call
        await cloudinary.api.ping();
        console.log('Cloudinary connected successfully');
    } catch (error) {
        console.error('Cloudinary configuration error:', error.message);
        throw error; // Re-throw to handle in the main application
    }
}
    
export default connectCloudinary;