require('dotenv').config()

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_DB
  : process.env.URL_MONGO_DB

const PORT = process.env.PORT

module.exports = {
  mongoUrl,PORT 
}