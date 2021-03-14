const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')


router.post('/reset', async (req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    const newUser = new User({username: 'test', name: 'Testaaja', passwordHash: await bcrypt.hash('sala', 1)})
    await newUser.save()
    res.status(200).send('reset success')
})

module.exports = router