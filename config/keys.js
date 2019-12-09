mongoDB = 'mongodb://localhost:27017/social'
module.exports = {
    mongoURI: mongoDB,
    PORT: process.env.PORT || 5000
}