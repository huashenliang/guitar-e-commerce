let admin = (req, res, next) => {
    if(req.user.role === 0) {
        return res.send('Not allowed')
    }
    next()
}

module.exports= {admin}