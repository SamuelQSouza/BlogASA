const Categoria = require('../models/Categoria')
const Postagem = require('../models/Postagem')

exports.index = async (req, res) =>{
    try{
        let postagens = await Postagem.find().populate("categoria").sort({data: "desc"})
        res.render("index", {postagens})             
    }
    catch (err) {
        req.flash("error_msg","Houve um erro interno")
        res.redirect("/")
    }
}

exports.posts = async (req, res) => {
    try{
        postagem = await Postagem.findOne({slug: req.params.slug})
        if(!postagem){
            req.flash("error_msg", "esta postagem não existe")
            return res.redirect("/")
        } 

        res.render("postagem/index", {postagem})        
    }
    catch(err) {
        req.flash("error_msg","Houve um erro interno")
        res.redirect("/")
    }
}

exports.categorys = async (req, res) => {
    try {
        let categorias = await Categoria.find().sort({data: "desc"})
        res.render("categorias/index",{categorias})        
    }
    catch (err){
        req.flash("error_msg","Houve um erro interno")
        res.redirect("/")
    }
}

exports.category = async (req, res) => {
    try {
        let categoria = await Categoria.findOne({slug: req.params.slug})
        if(!categoria){
            req.flash("error_msg", "esta postagem não existe")
            return res.redirect("/")
        }
        let postagens = await Postagem.find({categoria: categoria._id})
        res.render("categorias/postagens",{postagens, categoria})
    }catch(err) {
        req.flash("error_msg","Houve um erro ao carregar a pagina desta categoria")
        res.redirect("/")
    }
}
