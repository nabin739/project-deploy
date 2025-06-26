import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const { adminToken } = req.cookies;

        if (!adminToken) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);
        
        if (!tokenDecode || !tokenDecode.email) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        req.user = { email: tokenDecode.email };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
}

export default authAdmin;