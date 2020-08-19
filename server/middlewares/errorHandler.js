module.exports = function (err, _, res, _) {
  let statusCode = 500
  let message = "Internal Server Error"

  switch (err.name) {
    case "SequelizeValidationError":
      message = []
      err.errors.forEach(error => {
        message.push(error.message)
      })
      statusCode = 400
      break
    case "SequelizeUniqueConstraintError":
      message = []
      err.errors.forEach(error => {
        message.push(error.message)
      })
      statusCode = 400
      break
    case "ValidationError":
      message = "Token not Found"
      statusCode = 401
      break
    case "JsonWebTokenError":
      message = "Token is invalid"
      statusCode = 401
      break
    case "PLEASE_LOGIN_FIRST":
      message = "Please Login First"
      statusCode = 400
      break
    case "FORBIDDEN_ACCESS":
      message = "Forbidden Access"
      statusCode = 403
      break
    case "INVALID_EMAIL/PASSWORD":
      message = "Invalid Email/Password"
      statusCode = 400
      break
    case "EMAIL_ALREADY_EXIST":
      message = "Email Already Exist"
      statusCode = 400
      break
    case "ERROR_NOT_FOUND":
      message = "Error not found"
      statusCode = 404
      break
    case "COSTUM_ERROR":
      message = error.message
      statusCode = error.statusCode
      break
  }
  return res.status(statusCode).json({ message: message })
}
