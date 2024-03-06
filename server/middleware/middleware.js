require("dotenv").config(); //loads env file
const jwt = require("jsonwebtoken"); //requires jwt from node modules
const { SECRET } = process.env; // destructures my secret from env file


module.exports = {
  isAuthenticated: (req, res, next) => {
    //function that checks whether the client's authentication is valid
    const headerToken = req.get("Authorization"); //captures the clients authorization token in 'headerToken'

    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    } // checks if an authorization token was passed in to headerToken and logs an error if headerToken is undefined.

    let token; // creates undefined token variable

    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    } // verifies client token against server side token and throws a an error if .verify fails

    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    } // throws code if token is not authorized
    next(); // tells sercer to move onto next line of code
  },
};
