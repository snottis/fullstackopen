
const express = require('express')
require('express-async-errors')
const errorHandler = require('./utils/errorHandler')
const users = require('./routes/users')


const app = express()
const cors = require('cors')
const blogsRouter = require('./routes/blogs')

app.use(cors())

app.use(express.json())
app.use('/api/users', users)
app.use(blogsRouter)
app.use(errorHandler)

module.exports = app