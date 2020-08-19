let jwt = require('jsonwebtoken');
let secretKey = 'Storify-app'

function encodeJWT(input){
    let token = jwt.sign(input, secretKey)
    return token
}

function decodeJWT(input){
    let decoded = jwt.verify(input, secretKey);
    return decoded
}


module.exports = {encodeJWT, decodeJWT}