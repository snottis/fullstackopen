
const express = require('express')
require('express-async-errors')
const errorHandler = require('./utils/errorHandler')

const app = express()
const cors = require('cors')
const blogsRouter = require('./routes/blogs')

app.use(cors())
app.use(express.json())
app.use(blogsRouter)
app.use(errorHandler)

module.exports = app