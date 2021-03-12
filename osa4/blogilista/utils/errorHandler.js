const errorHandler = (err, req, res, next) => {
    if(err.name == 'ValidationError')
        res.status(400).json({error: err.message})
    else if(err.name == 'JsonWebTokenError')
        res.status(401).json({error: err.message})
    else
        res.status(400).json({error: err.message})
}

module.exports = errorHandler