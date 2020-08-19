const { User } = require('../models')
const { decodePassword } = require('../helpers/bcrypt')
const { encodeJWT } = require('../helpers/jwt')

class UserController {

  static register(req, res, next) {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
      .then(result => {
        return res.status(201).json({ message: `Success add user with email ${req.body.email}` })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }


  static login(req, res, next) {
    const emailLogin = req.body.email
    const passwordLogin = req.body.password

    User.findOne({ where: { email: emailLogin } })
      .then(data => {
        let message = {
          name: 'INVALID_EMAIL/PASSWORD'
        }
        if (!data) {
          throw message
        }
        else {
          const comparePassword = decodePassword(passwordLogin, data.password)
          if (!comparePassword) {
            throw message
          }
          else {
            let access_token = encodeJWT({ id: data.id, email: data.email })
            return res.status(200).json({ access_token: access_token })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController