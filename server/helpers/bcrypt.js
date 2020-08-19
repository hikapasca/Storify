const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(passwordRegister){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(passwordRegister, salt);
    return hash
}

function decodePassword(passwordLogin, passwordDatabase){
 return bcrypt.compareSync(passwordLogin, passwordDatabase);
}


module.exports = {hashPassword, decodePassword}