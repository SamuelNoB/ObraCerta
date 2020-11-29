//PACKAGES
const express = require('express');


//CONTROLLERS
const UserController = require('./controllers/UserController');
const loginController = require('./controllers/loginController');
const publicationController = require('./controllers/publicationController');
const rateController = require('./controllers/rateController')

//MIDDLEWARES
const authServices = require('./services/authServices');
const upload = require('./config/multer');

const router = express.Router();


// Rotas para a pagina inicial da aplicação
router.get('/', (req, res) => res.send("hello"));

// Rotas para o UserController
router.get('/perfil/:idUsuario', UserController.one)
router.get('/search', UserController.list);
router.post('/registrar', UserController.store);
router.delete('/usuario/:idUsuario', UserController.delete)
router.put('/usuario', UserController.update)
router.post('/alteraSenha', UserController.updatePassword);

//Rotas para o login
router.get('/login', (req, res) => res.send('Logar'));
router.post('/login', loginController.login);

//rotas para o publicationController
router.post('/nova_publicacao', [authServices.middlewares, upload.any()], publicationController.store);
router.get('/:idUsuario/publicacoes', authServices.middlewares, publicationController.list);
router.delete('/usuario/:idUsuario/publicacao/:idPublicacao', authServices.middlewares, publicationController.delete)

//Rotas para avaliação
router.post('/:idUsuario/avaliar', authServices.middlewares, rateController.store);

module.exports = router