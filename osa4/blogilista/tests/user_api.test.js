const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUser = {username: 'test', name: 'Testaaja', password: 'sala'}

afterAll(async () => {
    mongoose.connection.close()
})

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany([initialUser])
})

test('POST user with same username', async () => {
    const res = await api.post('/api/users').send(initialUser).expect(400)
    expect(res.body.error).toBeDefined()
})

test('POST user without username', async () => {
    const res = await api.post('/api/users').send({name: 'Test2', password: 'sala'}).expect(400)
    expect(res.body.error).toBeDefined()
})

test('POST user without password', async () => {
    const res = await api.post('/api/users').send({username: 'test2', name: 'Test2'}).expect(400)
    expect(res.body.error).toBeDefined()
})

test('POST user with short password', async () => {
    const res = await api.post('/api/users').send({username: 'test2', name: 'Test2', password: 'sa'}).expect(400)
    expect(res.body.error).toBeDefined()
})