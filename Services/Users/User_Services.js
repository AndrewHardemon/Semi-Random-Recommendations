const {UsernameExists, EmailExists, CreateUser, FindUser} = require('./User_DB');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function ValidateUserExists(firstname, email){
    if(!firstname || !email ) throw new  ('Invalid number of args. Please pass name and email')
    let taken_valid_firstname = null;
    let taken_valid_email = null;
    if(firstname){
        taken_valid_firstname = await UsernameExists(firstname)
    }
    
    if(email){
        taken_valid_email = await EmailExists(email);
    }
if (taken_valid_firstname) return taken_valid_firstname;
if (taken_valid_email) return taken_valid_email;


  return null;
}

async function CreateNewUser(args){
    if (args.password){
        args.passowrd = await _Encrypt(args.passowrd)
    }
    return await CreateUser(args)
}

async function UserSearch(credential){
    return FindUser(credential)
}


module.exports = {
    ValidateUserExists, CreateNewUser, UserSearch
};

async function _Encrypt(text){
    return await bcrypt.hash(text, saltRounds);
}
