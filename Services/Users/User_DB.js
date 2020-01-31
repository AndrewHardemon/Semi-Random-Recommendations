const db = require('../../models')
const Op = db.Sequelize.Op;

//Function checks if name already exits in database. Returns user if name already taken, false otherwise

async function UsernameExists(firstname){
    if (firstname === null || firstname === undefined) throw new Error('No firstname was passed as an argument')
  const user = await db.user.findOne({
      where:{firstname}
  });
  if(user) return user;
  return null;
}

/*
Function for finding a user based on their user id
@args
-user_id: string

@returns user object
*/
async function FindUser(credential){
    if (!credential) throw new Error('Invalid argument: user_id')
    const user = await db.user.findOne({
        where:{[Op.or]: [
            {firstname:credential}, 
            {id:credential}
        ]}
    });
    if(user) return user;
    return null;
}

//Function checks if emails already exists in database, Return user if email already taken, false otherwise
async function EmailExists(email){
    if (email === null || email === undefined) throw new Error('No email was passed as an argument')
    const user = await db.user.findOne({
        where:{email}
    });
    if(user) return user;
    return null;
}

async function CreateUser(args){
   
    if(!args.firstname) throw new Error('Invalid argument: first_name');    
    if(!args.lastname) throw new Error('Invalid argument: last_name');
    if(!args.email) throw new Error('Invalid argument: email');
    if(!args.password) throw new Error('Invalid argument: password');
    

    // if(!args.permessionid) args.permessionid = 2;

    // const permissions = await _ValidatePermissionId(args.permessionid);
    // if(!permissions) throw new Error('Invalid argument: permissionid not found')

    const user = await db.user.create({
        firstname: args.first_name,
        lastname: args.last_name,
        email: args.email,
        password: args.password
        
        
       });

       return user;
}

// async function _ValidatePermissionId(permissionid){
//     const permissions = await db.permission.findOne({
//         where:{id: permissionid}
//         //select * from permission where id =1 LIMIT 1
//     });

//     if(permissions) return permissions;

//     return null;
// }
module.exports = {
    UsernameExists,
    EmailExists,
    CreateUser,
    FindUser
}