const jwt = require("jsonwebtoken");
const APIError = require("../utils/APIError");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new APIError("Authentication required", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new APIError("Invalid or expired token", 401));
    }
};

const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new APIError("Authentication required", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new APIError("Access denied: insufficient permissions", 403));
        }
        next();
    };
};

module.exports = { authenticate, restrictTo };
