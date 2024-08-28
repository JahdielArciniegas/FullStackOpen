const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

mongoose.connect(config.mongoUrl).then(() => {
  logger.info('connected to MongoDb')
}).catch((error) => {
  logger.error('error connection MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app