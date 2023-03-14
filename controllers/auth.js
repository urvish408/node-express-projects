const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../../../05-JWT-Basics/final/errors');



const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, password: { password: user.password }, token })
}


const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide an valid email address and password')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError("Invalid Crediantials")
    }

    const isPassword = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Crediantials')
    }


    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}


module.exports = {
    register, login
}