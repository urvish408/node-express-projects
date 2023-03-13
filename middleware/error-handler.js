const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')


const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
