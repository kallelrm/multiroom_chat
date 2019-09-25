module.exports.iniciaChat = function (application, req, res){
    
    let dadosForm = req.body;

    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3,15);

    let erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }
    console.log(dadosForm);
    
    application.get('io').emit(
        'msgParaClient',
        {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat'});

    res.render('chat', {dadosForm: dadosForm});
}