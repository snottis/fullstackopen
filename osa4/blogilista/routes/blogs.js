const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/api/blogs/:id', async (req, res) => {
    console.log('param', req.params.id)
    const result = await Blog.findByIdAndRemove(req.params.id)
    console.log(result)
    res.status(200).json(result)
})

blogsRouter.put('/api/blogs/:id', async (req, res) => {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(result)
})

module.exports = blogsRouter