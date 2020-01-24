var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  var authenticateUser = async (email, password, done) => {
    var user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email'})
    }

    try  {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password is incorrect'})
      }

    } catch(e) {
      return done(e)
    }

  }
  passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports =  initialize