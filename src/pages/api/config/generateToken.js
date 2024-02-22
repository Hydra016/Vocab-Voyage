const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, 'asdasd', {
        expiresIn: "30d"
    })
}

module.exports = generateToken