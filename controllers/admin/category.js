const Categoria = require('../../models/Categoria')

const verify = (user_input) =>{
    var err_list = []
    if(!user_input.body.nome || typeof user_input.body.nome == undefined ||
    user_input.body.nome == null ){
        err_list.push({texto: "nome invalido"})}
    if(!user_input.body.slug || typeof user_input.body.slug == undefined || user_input.body.slug == null){
        err_list.push({texto: "slug invalido"})}
    if(user_input.body.slug.length < 2){
        err_list.push({texto: "slug muito pequena"})}
    return err_list
}

exports.index = async (req, res) => {
    try {
        let categorias = await Categoria.find().sort({date: "desc"})
        res.render("admin/categorias", {categorias: categorias})
    }catch(err) {
        req.flash("error_msg", "houve um erro ao listar categorias")
        res.redirect("/")
    }
}

exports.add = (req, res) =>{
    res.render("admin/addcategorias")
}

exports.nova = async (req, res) => {
    let erros = verify(req)
    if(erros.length > 0){
        return res.render("admin/addcategorias",{erros})
    }
    const novaCategoria ={
        nome: req.body.nome,
        slug: req.body.slug
    }
    try{
        await new Categoria(novaCategoria).save()
        req.flash("success_msg", "Categoria criada com sucesso")
        res.redirect("/admin/categorias")
    }catch(err) {
        req.flash("error_msg", "erro ao salvar a categoria")
        res.redirect("/admin/categorias")}
}

exports.edit = async(req, res) => {
    try{
    let categoria = await Categoria.findOne({_id: req.params.id})
    res.render("admin/editarcategorias", {categoria})
    }catch(err) {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    }
}

exports.update = async (req,res) => {
    try {
        let categoria = await Categoria.findOne({_id: req.body.id})
        let erros = verify(req)
        if(erros.length > 0){
            return res.render("/admin/categorias",{erros},{categoria})
        }
        categoria.nome = req.body.nome,
        categoria.slug = req.body.slug 
        await categoria.save()
        req.flash("success_msg", "categoria salva com sucesso")
        res.redirect("/admin/categorias")
    }catch(err) {
        req.flash("error_msg", "Houve um erro ao editar categoria")
        res.redirect(`/admin/categorias/edit/${req.body.id}`)
    }
}

exports.del = async (req, res) => {
    try{
        await Categoria.deleteOne({_id: req.body.id})
        req.flash("success_msg","Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    }catch(err) {
        req.flash("error_msg", "Houve um erro ao deletar a categoria")
        res.redirect("/admin/categorias")
    }
}