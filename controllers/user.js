const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const passport = require("passport")

const verify = (user_input) =>{
    var err_list = []
    if(!user_input.body.nome || typeof user_input.body.nome == undefined || user_input.body.nome == null ){
        erros.push({texto: "nome invalido"})}
    if(!user_input.body.email || typeof user_input.body.email == undefined || user_input.body.email == null){
        erros.push({texto: "email invalido"})}
    if(!user_input.body.senha || typeof user_input.body.senha == undefined || user_input.body.senha == null ){
        erros.push({texto: "senha invalido"})}
    if(user_input.body.senha.length < 4){
        erros.push({texto: "senha muito pequena"})}
    if(user_input.body.senha !== user_input.body.senha2){
        erros.push({texto: "as senhas não coincidem"})}
    return err_list
}

exports.index = (req, res) =>{
    res.render("usuario/login")
}

exports.add = (req,res) =>{
    res.render("usuario/registro")
}

exports.nova = async (req, res) => {

    let erros = verify(req)
    if(erros.length > 0){
        return res.render("usuario/registro",{erros},{email: req.body.email})    
    }
    try{
        let usuario = await Usuario.findOne({email: req.body.email})
        if(usuario){
            req.flash("error_msg","email ja cadatrado")
            return res.redirect("/user/registro")
        }
        const novoUsuario ={
            nome: req.body.nome, 
            email: req.body.email,
            senha: req.body.senha
        }                          
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(novoUsuario.senha, salt, async (err, hash)=> {                                      
            novoUsuario.senha = hash                    
            await new Usuario(novoUsuario).save()
            req.flash("success_msg","usuario criado")
            res.redirect("/")
            })
        })  
    }      
    catch(err){
        req.flash("error_msg","Houve um erro interno")
        res.redirect("/")
    }
}

exports.login = (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req,  res, next)
}

exports.logoff = (req, res) =>{
    req.logout();
    req.flash('success_msg', 'Sucesso ao se desconectar ')
    res.redirect('/')
}