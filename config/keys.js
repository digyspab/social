mongoDB = process.env.DB_MONGO_NAME
module.exports = {
    mongoURI: mongoDB,
    PORT: process.env.PORT || 5000
}