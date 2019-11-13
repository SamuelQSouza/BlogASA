const handlebars = require("express-handlebars")
const session = require("express-session")
const flash = require("connect-flash")
const express = require("express")
const path = require("path")
const passport = require("passport")
const mongoose = require('mongoose')
const routes = require("./routes/routes")
require('./config/auth')(passport)

const app = express()

//Config
    //sessão
        app.use(session({
            secret: "strongsecret",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    //middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null
            next()
        })
    //body parser
        app.use(express.urlencoded({extended: false}))
        app.use(express.json())
    //handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Public
        app.use(express.static(path.join(__dirname,"public")))
    //mongoose
    try{
        mongoose.connect('mongodb://mong:27017/blog', {useNewUrlParser: true})
        //mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true})
        console.log("mongo conectado")
    }
    catch(err) {console.log("houve um erro: ")}
    

//Rotas
app.use(routes)

//Outros
const PORT = 8082;
app.listen(PORT, () => {
    console.log("Servidor rodando na url http://localhost:"+PORT)
})
