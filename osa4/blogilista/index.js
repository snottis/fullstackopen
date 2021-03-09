
const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const blogsRouter = require('./routes/blogs')

app.use(cors())
app.use(express.json())
app.use(blogsRouter)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})