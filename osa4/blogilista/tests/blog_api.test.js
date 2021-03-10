const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }  
]


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

afterAll(() => {
    mongoose.connection.close()
})

test('GET blogs', async () => {
    const res = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(res.body.length).toBe(6)
})

test('if id is defined', async () => {
    const res = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(res.body[0].id).toBeDefined()
})

test('POST blog', async () => {
    const res = await api.post('/api/blogs').send({title: 'new', author: 'new guy', url: 'localhost', likes: 99})
    expect(res.body.title).toBe('new')
    const count = await Blog.countDocuments()
    expect(count).toBe(initialBlogs.length+1)
})

test('Likes get default value 0', async () => {
    const newBlog = {title: 'new', author: 'new guy', url: 'localhost'}
    const res = await api.post('/api/blogs').send(newBlog)
    expect(res.body.likes).toBe(0)
})

test('Require title and url', async () => {
    const newBlog = {author: 'new guy'}
    const res = await api.post('/api/blogs').send(newBlog)
    expect(res.status).toBe(400)
})

test('test delete', async () => {
    const blogs = await Blog.find({})
    const res = await api.delete(`/api/blogs/${blogs[0]._id}`)
    const count = await Blog.countDocuments()
    expect(count).toBe(initialBlogs.length-1)
})

test('test put', async () => {
    const newBlog = {title: 'new', author: 'new guy', url: 'localhost'}
    const blogs = await Blog.find({})
    const res = await api.put(`/api/blogs/${blogs[0]._id}`).send(newBlog)
    const count = await Blog.countDocuments()
    expect(count).toBe(initialBlogs.length)
    expect(res.body.author).toBe('new guy')
})