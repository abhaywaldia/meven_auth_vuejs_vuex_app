const JwtStratergy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/User')
const KEY = require('./keys').secret

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = KEY

module.exports = passport=>{
    passport.use(new JwtStratergy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload._id).then(user=>{
            if(user){
                return done(null,user)
            }else{
                return done(null,false)
            }
        }).catch(err=>{
            console.log(err)
        })
    }))
}