const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {userExtractor} = require('../middlewares/token')


blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/api/blogs', userExtractor, async (request, response) => {
    const user = await User.findById(request.user.id)
    const blog = new Blog({...request.body, user: user._id})
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/api/blogs/:id', userExtractor, async (req, res) => {
    const result = await Blog.findById(req.params.id)
    if(!result)
        res.status(404).json({error: 'invalid blog id'})
    if(result.user.toString() === req.user.id) {
        await result.remove()
        res.status(200).json(result)
    }
    else {
        res.status(401).json({error: 'Unauthorized'})
    }
    
})

blogsRouter.put('/api/blogs/:id', async (req, res) => {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(result)
})

module.exports = blogsRouter