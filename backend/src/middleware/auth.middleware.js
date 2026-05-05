const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'No authentication token provided',
      });
    }

    const decoded = verifyToken(token);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      statusCode: 403,
      message: 'Admin access required',
    });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
