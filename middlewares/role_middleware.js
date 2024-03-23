// Defining the role-based authorization middleware
const authorizeRole = (role) => {

    return (req, res, next) => {

        // Check if the user's role matches the required role
        if (req.user && req.user.role === role) {
            // If the user's role matches, proceed to the next middleware
            next();
        } else {

            // If the user's role doesn't match, return an error response
            return res.status(403).json({ message: "You are not admin (authorized) to access this resource." });
            
        }
    };
};

module.exports=authorizeRole