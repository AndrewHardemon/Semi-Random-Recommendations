var Sequelize = require("sequelize");

var User = new Sequelize('userdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})


var insertUser = User.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

User.
sync({
    force: true
})
.then(function(){
    insertUser.create({
        name: 'Serguei',
        email: 'sj@gmail.com',
        password: '123'
    }).then(function(insertdUser){
        console.log(insertdUser.dataValues)
    })
})