// Login Admin

import jwt from "jsonwebtoken";

export const AdminLogin = async (req, res) => {
    try {
        // Validate request body exists
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Validate credentials with timing-safe comparison
        const isEmailValid = email === process.env.ADMIN_EMAIL;
        const isPasswordValid = password === process.env.ADMIN_PASSWORD  ;

        const isEmailValid1 = email === process.env.ADMIN_EMAIL1;
        const isPasswordValid1 = password === process.env.ADMIN_PASSWORD1;

        // const isPersonValid = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
        // const isPerson1Valid = email === process.env.ADMIN_EMAIL1 && password === process.env.ADMIN_PASSWORD1;

        if (isEmailValid && isPasswordValid || isEmailValid1 && isPasswordValid1) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { 
                expiresIn: '7d',
                algorithm: 'HS256'
            });

            res.cookie('adminToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            return res.status(200).json({ 
                success: true, 
                message: "Logged in successfully",
                user: {
                    email: process.env.ADMIN_EMAIL || process.env.ADMIN_EMAIL1,
                    role: 'admin'
                }
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error"
        });
    }
};

// Check Auth
export const isAdminAuth = async (req, res) => {
    try {
        // Since this is called after authAdmin middleware, we know the user is authenticated
        return res.status(200).json({ 
            success: true,
            user: {
                email: req.user.email,
                role: 'admin'
            }
        });
    } catch (error) {
        console.error('Auth check error:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error"
        });
    }
};

// Logout Admin
export const AdminLogout = async (req, res) => {
    try {
        // Clear the adminToken cookie
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error('Logout error:', error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};