var expect = require("chai").expect;
const db = require('../models')
const {ValidateUserExists} = require('../Services/Users/User_Services')

describe('User Test Suite', ()=>{
    it('should see if a user already exists on non existed user', async ()=>{
       const user = await ValidateUserExists('test', 'test@test.com')
       expect(user).to.be.null;
    });

    it('should see if  user already exists on an existent username', async ()=>{
        const test = await CreateDummyUser();

        const user = await ValidateUserExists('test_test', 'test@test.com')
        expect(user).to.be.an('object')
        await DestroyDummyUser(test);
    });

    it('should see if  user already exists on an existent email', async ()=>{
        const test = await CreateDummyUser();

        const user = await ValidateUserExists('test_test', 'test@test.com');
        expect(user).to.be.an('object')
        await DestroyDummyUser(test);
    })

    it('Should throw an error because no arg were passed to see if user exists', async ()=>{
       let test = null
        try{
         test = await CreateDummyUser()
         await ValidateUserExists();
       }catch(e){
         expect(e).to.be.an('Error');
        // expect(e.message).equal('Invalid number of args. Please pass username and email');
         await DestroyDummyUser(test);
       }
    });

    it('Should throw an error because 1 arg was passed to see if user exists', async ()=>{
        let test = null
         try{
          test = await CreateDummyUser()
          await ValidateUserExists('test_test');
        }catch(e){
          expect(e).to.be.an('Error');
          expect(e.message).equal('Invalid number of args. Please pass username and email');
          await DestroyDummyUser(test);
        }
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