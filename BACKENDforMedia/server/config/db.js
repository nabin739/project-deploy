import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connection events
        mongoose.connection.on('connected', () => {
            console.log('Database connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Database connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Database disconnected');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('Database connection closed due to app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error closing database connection:', err);
                process.exit(1);
            }
        });

        // Validate MongoDB URI
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        const dbName = 'Marketing';
        const mongoURI = process.env.MONGODB_URI.endsWith(dbName) 
            ? process.env.MONGODB_URI 
            : `${process.env.MONGODB_URI}/${dbName}`;

        // Connect with updated options
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Use IPv4
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;