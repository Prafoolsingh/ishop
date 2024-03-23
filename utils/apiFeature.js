// This class implements various features for API handling such as search, filter, and pagination

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query; // The MongoDB query object
        this.queryStr = queryStr; // The query string parameters
    }

    // Search method: Implements search functionality based on a keyword provided in the query string.

    search() {
        
        // Extracting the keyword from the query string parameters
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword, // Perform a regular expression search for the keyword
                    $options: "i", // Case insensitive option
                },
            }
            : {}; // If no keyword provided, empty object

        // console.log(keyword); 

        // Applying the search filter to the query
        this.query = this.query.find({ ...keyword });

        return this; // Returning the object instance for method chaining
    }

    // Filter method: Implements filtering functionality based on query parameters.
    filter() {

        // Copying the query string parameters
        const filterQuery = { ...this.queryStr };


        // Removing some fields not intended for filtering that are used in search() and pagination()
        const removeFields = ["keyword", "page", "limit"];

        // console.log(filterQuery);

        // Removing unwanted fields from the filter query
        removeFields.forEach((key) => delete filterQuery[key]);

        // console.log(filterQuery);


        // Filtering For Price and Rating: Convert query parameters to MongoDB query format
        let queryStr = JSON.stringify(filterQuery);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // Applying the filter to the query
        this.query = this.query.find(JSON.parse(queryStr));

        // console.log(queryStr);

        // Returning the object instance for method chaining
        return this; 
    }

    // Pagination method: Implements pagination functionality based on the provided resultPerPage value and current page number.

    pagination(resultPerPage) {

        // Getting the current page number from the query string, if not provided any page number then the currentPage=1
        const currentPage = Number(this.queryStr.page) || 1;

         // Calculating the number of documents to skip
        const skip = resultPerPage * (currentPage - 1);

        // Applying pagination to the query
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this; 
    }
}
module.exports = ApiFeatures; 
