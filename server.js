//imports
var http = require('http');
var URL = require('url');
var qs = require('querystring');
var _mysql = require('mysql');

//constantes
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = 'root';
var DATABASE = 'contas';
var TB_USUARIO = 'usuario';
var TB_CONTA = 'conta';
var TB_FLUXO = 'fluxo';

//conexao com o banco de dados
var mysql = _mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS
});
mysql.query('use '+DATABASE);
console.log('Conectado no banco de dados');

/*
 *Funcao que recebe as requicoes ao servidor
 */
function onRequest(request, response){
    
    console.log('Requisição recebida');
    
    var url = URL.parse(request.url);
    console.log(url.pathname);
    
    if(url.pathname === '/login'){
        verificarLogin(request, response);        
    }else if(url.pathname === '/menu'){
        montarMenu(response);
    }else if(url.pathname === '/usuarioList'){
        recuperarTodosRegistrosTabela(response, TB_USUARIO);
    }
    else if(url.pathname === '/usuarioInsert'){
        cadastrarUsuario(request);
    }
    else if(url.pathname === '/usuarioUpdate'){
        atualizarUsuario(request);
    }
    else if(url.pathname === '/usuarioDelete'){
        deletarUsuario(request);
    }
    else if(url.pathname === '/contaList'){
        recuperarTodosRegistrosTabela(response, TB_CONTA);
    }
    else if(url.pathname === '/contaInsert'){
        cadastrarConta(request);
    }
    else if(url.pathname === '/contaUpdate'){
        atualizarConta(request, response);
    }
    else if(url.pathname === '/contaDelete'){
        deletarConta(request, response);
    }
    else if(url.pathname === '/fluxoList'){
        recuperarTodosRegistrosTabela(response, TB_FLUXO);
    }
    else if(url.pathname === '/fluxoInsert'){
        cadastrarFluxo(request);
    }
    else if(url.pathname === '/fluxoUpdate'){
        atualizarFluxo(request, response);
    }
    else if(url.pathname === '/fluxoDelete'){
        deletarFluxo(request, response);
    }
    else if(url.pathname === '/graficoFluxos'){
        exibirGraficoFluxo(response);
    }
    else{
        response.writeHead(200, {
            'Content-type':'text/html'
        });
        response.write('Conteudo nao encontrado');
        response.end();
    }
    
}

function verificarLogin(request, response){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var dados = [POST.email, POST.senha];
        console.log(dados);

        mysql.query('select count(*) as quantidade from usuario where dsEmail = ? and dsSenha = ?', 
            dados, function(erro, result){

            var usuarioValido = result[0].quantidade > 0;

            var retorno;
            if(erro){
                throw erro;
            }
            else if(usuarioValido){
                retorno = {
                    'success':true
                }
            }else{
                retorno = {
                    'motivo':'Usuário e senha inválidos'
                }
            }

            exibirResponseJSON(response, retorno);

        });

    });
    
}

/*
 *Devolve o JSON com os itens da arvore de menu
 */
function montarMenu(response){
    
    var menu = 
        "{children: [{text:'Cadastros',expanded: true,children:[{text:'Usuários',leaf: true,itemMenu: 'usuarioList'},{text:'Contas',leaf:true,itemMenu: 'contaList'},{text:'Fluxos',leaf:true,itemMenu: 'fluxoList'}]},{text:'Relatórios',expanded: true,children:[{text:'Gráfico de Fluxo',leaf:true,itemMenu: 'graficoFluxo'}]}]}";
    response.writeHead(200, {
        'Content-type':'application/json'
    });
    
    response.write(menu);
    response.end();
}

function cadastrarUsuario(request){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var dados = JSON.parse(POST.data);
        
        var values = [dados.nmUsuario, dados.dsEmail, dados.dsSenha];
        console.log(values);
        mysql.query('insert into usuario(nmUsuario, dsEmail, dsSenha) values (?,?,?)',values,
        function(erro, result){

            if(erro){
                throw erro;
            }
            console.log('incluiu usuario com id='+result.insertId);

        });

    });
    
}

function atualizarUsuario(request){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var dados = JSON.parse(POST.data);
        
        var values = [dados.nmUsuario, dados.dsEmail, dados.dsSenha, dados.idUsuario];
        console.log(values);
        mysql.query('update usuario set nmUsuario = ?, dsEmail = ?, dsSenha = ? where idUsuario = ? ',values,
        function(erro){

            if(erro){
                throw erro;
            }
            console.log('alterou usuario com id='+dados.idUsuario);

        });

    });
    
}

function deletarUsuario(request){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var dados = JSON.parse(POST.data);
        var idUsuario = dados.idUsuario;
        console.log(idUsuario);
        mysql.query('delete from usuario where idUsuario = ?',[idUsuario],
        function(erro){

            if(erro){
                throw erro;
            }
            console.log('deletou usuario id='+idUsuario);

        });

    });
    
}

function cadastrarConta(request){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var dados = JSON.parse(POST.data);
        
        var values = [dados.dsDescricao];
        console.log(values);
        mysql.query('insert into conta(dsDescricao) values (?)',values,
        function(erro, result){

            if(erro){
                throw erro;
            }
            
            console.log('incluiu conta com id='+result.insertId);

        });

    });
    
}

function atualizarConta(request, response){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        
        var values = [POST.dsDescricao, POST.idConta];
        console.log(values);
        mysql.query('update conta set dsDescricao = ? where idConta = ? ',values,
        function(erro){

            if(erro){
                throw erro;
            }
            var retorno = {
                'success':true
            }
            
            exibirResponseJSON(response, retorno);
            console.log('alterou conta');

        });

    });
    
}

function deletarConta(request, response){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var idConta = POST.ids;
        console.log(idConta);
        mysql.query('delete from conta where idConta = ?',[idConta],
        function(erro){

            if(erro){
                throw erro;
            }
            var retorno = {
                'success':true
            }
            
            exibirResponseJSON(response, retorno);
            
            console.log('deletou conta id='+idConta);

        });

    });
    
}

function cadastrarFluxo(request){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var dados = JSON.parse(POST.data);
        
        var values = [dados.idConta, dados.dsDescricao, dados.nuValor, dados.dtFluxo];
        console.log(values);
        mysql.query('insert into fluxo(idConta, dsDescricao, nuValor, dtFluxo) values (?,?,?,?)',values,
        function(erro, result){

            if(erro){
                throw erro;
            }
            console.log('incluiu fluxo com id='+result.insertId);

        });

    });
    
}

function atualizarFluxo(request, response){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        
        var values = [POST.idConta, POST.dsDescricao, POST.nuValor, POST.dtFluxo, POST.idFluxo];
        console.log(values);
        mysql.query('update fluxo set idConta = ?, dsDescricao = ?, nuValor = ?, dtFluxo = ? where idFluxo = ? ',values,
        function(erro){

            if(erro){
                throw erro;
            }
            var retorno = {
                'success':true
            }
            
            exibirResponseJSON(response, retorno);
            console.log('alterou fluxo');

        });

    });
    
}

function deletarFluxo(request, response){
    
    var body = '';
    
    request.on('data', function(data){
        body+=data;
    });
    
    request.on('end', function(){
        var POST = qs.parse(body);
        var idFluxo = POST.ids;
        console.log(idFluxo);
        mysql.query('delete from fluxo where idFluxo = ?',[idFluxo],
        function(erro){

            if(erro){
                throw erro;
            }
            var retorno = {
                'success':true
            }
            
            exibirResponseJSON(response, retorno);
            console.log('deletou fluxo id='+idFluxo);

        });

    });
    
}

function exibirGraficoFluxo(response){
    
    mysql.query('select count(f.idFluxo) as total, c.dsDescricao as conta from fluxo f join conta c on f.idConta = c.idConta group by c.dsDescricao',
    function(erro, result){

        if(erro){
            throw erro;
        }
        else{
            var retorno = {
                'data':result,
                'success':true
            }
            exibirResponseJSON(response, retorno);
        }

    });
    
}

/**
 * Recupera os registros da tabela passada como parametro
 */
function recuperarTodosRegistrosTabela(response, tabela){
    
    mysql.query('select * from '+tabela,function(erro, result){

        if(erro){
            throw erro;
        }
        else{
            var retorno = {
                'data':result
            }
            
            exibirResponseJSON(response, retorno);
        }

    });
    
}

/**
 * Retorna o response no formato JSON
 */
function exibirResponseJSON(response, retorno){
    
    response.writeHead(200, {
        'Content-type':'application/json'
    });
    response.write(JSON.stringify(retorno));
    response.end();
    
}

http.createServer(onRequest).listen(8080);
console.log('Servidor startado');