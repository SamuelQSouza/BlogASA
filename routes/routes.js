const express = require("express")
const router = express.Router()
const catController = require('../controllers/admin/category')
const postController = require('../controllers/admin/post')
const blogController = require('../controllers/blog')
const userController = require('../controllers/user')
const {eadmin} = require("../helpers/eAdmin")
    
router.get('/', blogController.index)
router.get('/postagens/:slug', blogController.posts)
router.get('/categorias', blogController.categorys)
router.get('/categorias/:slug', blogController.category)

router.get('/admin/categorias', eadmin, catController.index)
router.get('/admin/categorias/add', eadmin, catController.add)
router.get('/admin/categorias/edit/:id', eadmin, catController.edit)
router.post('/admin/categorias/deletar', eadmin, catController.del)
router.post('/admin/categorias/edit', eadmin, catController.update)
router.post('/admin/categorias/nova', eadmin, catController.nova)

router.get('/admin/postagens', eadmin, postController.index)
router.get('/admin/postagens/add', eadmin, postController.add)
router.get('/admin/postagens/edit/:id', eadmin, postController.edit)
router.get('/admin/postagens/deletar/:id', eadmin, postController.del)
router.post('/admin/postagens/edit', eadmin, postController.update)
router.post('/admin/postagens/nova', eadmin, postController.nova)

router.get('/user/login', userController.index)
router.get('/user/registro', userController.add)
router.post('/user/registro', userController.nova)
router.post('/user/login', userController.login)
router.get('/user/logout', userController.logoff);


module.exports = router