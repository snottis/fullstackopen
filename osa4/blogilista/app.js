
const express = require('express')
require('express-async-errors')
const errorHandler = require('./utils/errorHandler')
const users = require('./controllers/users')
const login = require('./controllers/login')
const token = require('./middlewares/token')




const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

app.use(cors())

app.use(express.json())
app.use(token.tokenExtractor)
app.use('/api/users', users)
app.use(blogsRouter)
app.use('/login', login)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app