const jwt = require('jsonwebtoken')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    else
        req.token = null
    next()
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if(!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    req.user = decodedToken
    next()
}

module.exports = {tokenExtractor, userExtractor}