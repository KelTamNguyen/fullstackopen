const dotenv = require('dotenv').config();

const {PORT, MONGODB_URI, TEST_MONGODB_URI} = process.env;

module.exports = {
    PORT,
    MONGODB_URI,
    TEST_MONGODB_URI
}