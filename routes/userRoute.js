//User Routes
const express = require('express');
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler');
const validate = require('validate.js');

//Services

const User = require('../Services/Users/User_Services');


//route to create a user

/*
@body
-firstname: string
-lastname: string
-password: string
-email: string

*/

router.post('/', asyncHandler((req,res)=>{
  const constraints = {
    firstname:{
      presence:true,
      length:{maximum:50}
    },
    lastname:{
      presence:true,
      length:{maximum:50}
    },
    email:{
        presence:true,
        email:true
    },
    password:{
      presence:true,
      length:{minimum:8, maximum:20}
    }
    
  }
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  
  

  const validation = validate({firstname, lastname, email, password }, constraints);

  if(validation) return res.status(400).json({error: validation});

  //Forward user Service
 
  const found_user = User.ValidateUserExists(firstname, email);
  if(found_user){
    if(firstname === found_user.firstnam) return res.status(400).jason({error:`Firstname: ${firstnam} is already taken`});
    if(email === found_user.email) return res.status(400).jason({error: `Email ${email} is already taken`});
  }

  const new_user =  User.CreateNewUser({firstname,lastname,email,password})
  return res.status(200).jason({user:new_user})
}));



module.exports = router;