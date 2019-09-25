//importar o módulo do frameword express
const express = require('express');

//importar o módulo do consign
const consign = require ('consign');

//importar o módulo do body-parser
const bodyParser = require('body-parser');

//importar o módulo do express-validator
const expressValidator = require('express-validator');

//iniciar o objeto do express
const app = express();


//configurar as variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configuar o middleware express.static
app.use(express.static('./app/public'));

//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//configurar o middleware express-validator
app.use(expressValidator());



//configurar o consign pra fazer o autoload dos controllers, rotas e models
consign()
    .include('app/routes')
    .then('app/models')
    .then('/app/controllers')
    .into(app);

//exportando o objeto app com o express executado
module.exports = app;