var expect = require("chai").expect;
const {UsernameExists, EmailExists, CreateUser, FindUser} = require('../Services/Users/User_DB');

const db = require('../models')                                



describe ("User DB Test Suite", function() {
    it('should see if a name already exists in db', async ()=>{
        const check = await UsernameExists('dfgdfgdfg');
        expect(check).to.be.null;
        expect(check === undefined).to.be.false;
        expect(check === false).to.be.false
    });

    it('Should throw an error because no name was passed', async ()=>{
        try{
            const check = await UsernameExists();
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.be.equal('No name was passed as an argument')
        }
    });

    it('Should see create a user, see if username already exists and fail', async ()=>{
        const test = await CreateDummyUser();
        
        const check = await UsernameExists('test_test');
        expect(check).to.be.an('object');
        await DestroyDummyUser();
    });

    it('should see if a email already exists in db', async ()=>{
        const check = await EmailExists('dfgdfgdfgdfgd');
        expect(check).to.be.null;
        expect(check === undefined).to.be.false;
        expect(check === false).to.be.false
    });

    it('Should throw an error because no email was passed', async ()=>{
        try{
            const check = await EmailExists();
        }catch(e){
            expect(e).to.be.an('Error');
            expect(e.message).to.be.equal('No email was passed as an argument')
        }
    });

    it('Should see create a user, see if email already exists and fail', async ()=>{
        const test = await CreateDummyUser();
        
        const check = await EmailExists('test@test.com');
        expect(check).to.be.an('object');
        await DestroyDummyUser();
    });

    /*
    Function should create a user 
    Return
    new user
    new user should have properties
        username
        email
        firstname
        lastname
        password- should be a hash not plain text
    */    
   it('should create a new user', async ()=>{
       const firstname = 'test';
       const lastname = 'test';
       const email = 'test@test.com';
       const password ='test_test';
       
      

       const args = {firstname,lastname,email,password}

       const user = await CreateUser(args)
       //Destroy user instance in db because is a test
       await user.destroy({force: true});

       expect(user).to.be.an('object');
       expect(user.firstname).to.equal(firstname);
       expect(user.lastname).to.equal(lastname);
       expect(user.email).to.equal(email);
       expect(user.password).to.equal(password)
       
   })

   /*
     Function that should throw exception because an argument of username wasn't passed
     RETURN
       new error
          -message should be user name "invalid argument: username"
   */

    it('should throw an error bacuse no name is passed', async () =>{
        try{
            
            const lastname = 'test';
            const email = 'test@test.com';
            const password ='test_test';
            
            const user = await CreateUser({lastname,email,password})
        }catch(e){
           expect(e).to.be.an('Error');
           expect(e.message).to.equal('Invalid argument: name')
        }
       
    })

    it('should throw an error bacuse no firstname is passed', async () =>{
        try{
            
            const lastname = 'test';
            const email= 'test@test.com';
            const password ='test_test';
            const user = await CreateUser({lastname,email,password})
        }catch(e){
           expect(e).to.be.an('Error');
           expect(e.message).to.equal('Invalid argument: firstname')
        }
       
    })

    it('should throw an error bacuse no last_name is passed', async () =>{
        try{
            
            const firstname = 'test';
            const email = 'test@test.com';
            const password ='test_test';
            const user = await CreateUser({firstname,email,password})
        }catch(e){
           expect(e).to.be.an('Error');
           expect(e.message).to.equal('Invalid argument: last_name')
        }
       
    })

    it('should throw an error bacuse no passowrd is passed', async () =>{
        try{
            
            const firstname = 'test';
            const lastname ='test';
            const email = 'test@test.com';
            
            const user = await CreateUser({firstname,lastname,email})
        }catch(e){
           expect(e).to.be.an('Error');
           expect(e.message).to.equal('Invalid argument: passowrd')
        }
       
    })

    it('should throw an error bacuse no email is passed', async () =>{
        try{
            
            const firstname = 'test';
            const lastname ='test';
            const password ='test_test';
           
            const user = await CreateUser({firstname,lastname,password})
        }catch(e){
           expect(e).to.be.an('Error');
           expect(e.message).to.equal('Invalid argument: email')
        }
       
    })

   

    it('should return a user based on their ID', async ()=>{
        const user = await CreateDummyUser();
        const found = await FindUser(user.id);
        await DestroyDummyUser(user);
        expect(found).to.be.an('object');
        expect(founf.firstname).to.equal('test_test')
        

       

    });

    it('should throw an error when finding a user by id, becuase no user_id is passed', async ()=>{
        const user = await CreateDummyUser();
        try{
            await FindUser();
        }catch(e){
            await DestroyDummyUser(user);
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Invalid argument: user_id')
        }

    });
    
    it('should return a user based on their name', async ()=>{
        const user = await CreateDummyUser();
        const found = await FindUser(user.firstname);
        await DestroyDummyUser(user);
        expect(found).to.be.an('object');
        expect(founf.firstname).to.equal('test_test')
        

       

    });
});

async function CreateDummyUser(){
    return await db.user.create({
        firstname:'test',
        lastname:'test',
        email:'test@test.com',
        password:'test_test'
        

    });
  
}

async function DestroyDummyUser(user){
    return await user.destroy({force: true});
}