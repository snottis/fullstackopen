const errorHandler = (err, req, res, next) => {
    console.log(err)
    if(err.name == 'ValidationError')
        res.status(400).end()
    else
        res.status(400).end()
}

module.exports = errorHandler