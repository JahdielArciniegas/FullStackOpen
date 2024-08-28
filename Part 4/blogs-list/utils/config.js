require('dotenv').config()

const mongoUrl = process.env.URL_MONGO_DB
const PORT = process.env.PORT

module.exports = {
  mongoUrl,PORT 
}