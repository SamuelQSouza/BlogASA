const Categoria = require('../../models/Categoria')
const Postagem = require('../../models/Postagem')

const verify = (user_input) =>{
    var err_list = []
    if(!user_input.body.titulo || typeof user_input.body.titulo == undefined || user_input.body.titulo == null ){
        err_list.push({texto: "titulo invalido"})}
    if(!user_input.body.slug || typeof user_input.body.slug == undefined || user_input.body.slug == null){
        err_list.push({texto: "slug invalido"})}
    if(!user_input.body.descricao || typeof user_input.body.descricao == undefined || user_input.body.descricao == null){
    err_list.push({texto: "descricao invalido"})}
    if(!user_input.body.conteudo || typeof user_input.body.conteudo == undefined || user_input.body.conteudo == null){
        err_list.push({texto: "conteudo invalido"})}
    if(user_input.body.categoria == "0"){
        erros.push({texto: "categoria invalido"})
    }
    return err_list
}

exports.index = async (req, res) => {
    try{
        let postagens = await Postagem.find().populate("categoria").sort({date: "desc"})
        res.render("admin/postagens", {postagens})
    }catch(err) {
        req.flash("error_msg", "houve um erro ao listar postagens")
        res.redirect("/admin")
    }    
}

exports.add = async (req, res) =>{
    try{
        let categorias = await Categoria.find()
        res.render("admin/addpostagens", {categorias})
    }catch(err)  {
        req.flash("error_msg","houve um erro ao carregar o formulario")
        res.redirect("/admin/postagens/")
    }
}

exports.nova = async (req, res) =>{
    let erros = verify(req)
    if(erros.length > 0){
        return res.render("admin/addpostagens",{erros})
    }
    let cont = req.body.conteudo.split(/\r\n/)
    const novaPostagem ={
        titulo: req.body.titulo,
        slug: req.body.slug,
        descricao: req.body.descricao,
        conteudo: cont,
        categoria: req.body.categoria
    }
    try{
        await new Postagem(novaPostagem).save()
        req.flash("success_msg", "Postagem criada com sucesso")
        res.redirect("/admin/postagens")
    }catch(err){
        req.flash("error_msg", "erro ao salvar a postagem")
        res.redirect("/admin/postagens")}
}

exports.edit = async (req, res) =>{
    try{
        let postagem = await Postagem.findOne({_id: req.params.id})
        let categorias = await Categoria.find()
        res.render("admin/editpostagens", {categorias, postagem})
    }catch(err) {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/postagens")
    }
}

exports.update = async (req, res) => {    
    try{
        let postagem = await Postagem.findOne({_id:req.body.id})
        let categorias = await Categoria.find()
        let erros = verify(req)
        if(erros.length > 0){
            return res.render("admin/editpostagens",{erros, categorias, postagem})
        }
        let cont = req.body.conteudo.split(/\r\n/)
        postagem.titulo = req.body.titulo,Categoria
        postagem.slug = req.body.slug,
        postagem.descricao = req.body.descricao,
        postagem.conteudo = cont,
        postagem.categoria = req.body.categoria    
        await postagem.save()
        req.flash("success_msg", "Postagem editada com sucesso")
        res.redirect("/admin/postagens")
    }catch(err)  {
        req.flash("error_msg", "erro ao editar a postagem")
        res.redirect("/admin/postagens")
    }
}


exports.del = async (req, res) => {
    try{
    await Postagem.deleteOne({_id: req.params.id})
        req.flash("success_msg","Categoria deletada com sucesso!")
        res.redirect("/admin/postagens")
    }catch(err)  {
        req.flash("error_msg", "Houve um erro ao deletar a categoria")
        res.redirect("/admin/postagens")
    }
}