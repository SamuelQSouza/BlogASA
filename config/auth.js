const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

module.exports = (passport) =>{
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, async (email, senha, done) =>{
        try {
            const usuario = await Usuario.findOne({email})
            if (!usuario) {
                return done(null, false, {message: "esta conta não existe"})
            }else{
                bcrypt.compare(senha, usuario.senha, (erro, batem) =>{
                    if (batem) {
                        return done(null, usuario)
                    }else{
                        return done(null, false, {message: "senha incorreta"})
                    }
                })
            }
        } catch (error) {            
        }
    }))
    passport.serializeUser((usuario, done) =>{
        done(null, usuario._id)
    })
    passport.deserializeUser((id, done) =>{
        Usuario.findById(id, (err, usuario) =>{
            done(err, usuario)
        })
    })
}