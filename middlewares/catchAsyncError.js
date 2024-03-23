// This function exports a middleware function that wraps around another function.
// It ensures that asynchronous operations within theFunc are handled properly, 
// forwarding any errors to the Express error handling middleware (next).

module.exports = (theFunc) => (req, res, next) => {

  // Resolving theFunc with the provided request, response, and next middleware.
  Promise
    .resolve(theFunc(req, res, next))
    // Catching any errors that occur during the execution of theFunc and forward them to the Express error handling middleware.
    .catch(next);
    
};
