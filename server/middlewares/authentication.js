const {User} = require('../models')
const {decodeJWT} = require('../helpers/jwt')

let authentication = function (req, res, next){
    
    const data = req.headers.access_token
    const decodeData = decodeJWT(data)
    req.userData = decodeData.id
    User.findOne({where:{email: decodeData.email}})
        .then(result =>{
            if(!data){
                throw {name: 'ValidationError'}
            }
            else{
                next()
            }
        })

        .catch(err =>{
            next(err)
        })
}






module.exports = {authentication}