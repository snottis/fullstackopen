const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 1
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})