const errorHandler = (err, req, res, next) => {
    if(err.name == 'ValidationError')
        res.status(400).end()
    else
        res.status(400).end()
}

module.exports = errorHandler