let inputNome = document.getElementById("nome");
let selectedUnidade = document.getElementById("sel1");
let inputNumber = document.getElementById("number");
let inputEmail = document.getElementById("email");
let inputEmailConfirmation = document.getElementById("emailConfirmation");
let inputSenha = document.getElementById("senha1");
let inputSenhaConfirmation = document.getElementById("senha2");
let inputPix = document.getElementById("pix");
let inputDescripition = document.getElementById("descricao");
let botaoSumbmit = document.getElementById("botao");



//preciso saber oque esta dando errado antes de tirar
function previnirEventoDeReload(evt){
    evt.preventDefault();
}

botaoSumbmit.addEventListener(
    'click', previnirEventoDeReload,false
);
function cliqueCadastro(){


    var nome = inputNome.value;
    var number = inputNumber.value;
    var email = inputEmail.value;
    var emailConfirmation = inputEmailConfirmation.value;
    var senha = inputSenha.value;
    var senhaConfirmation = inputSenhaConfirmation.value;
    var pix = inputPix.value;
    var description = inputDescripition.value;
    var unidadePuc = selectedUnidade.options[selectedUnidade.selectedIndex].text
    var radioGenero = checkRadioGroupGenero();
    if(checkNome(nome) && checkNumber(number) && checkEmail(email,emailConfirmation) 
    && checkSenha(senha,senhaConfirmation) && checkDescription(description) ) {
        //Criar conta é permitido
        let usuario = new Usuario(nome,senha,email,pix,description,number,unidadePuc,radioGenero)
        salvar(usuario)

        alert('Criando conta com sucesso')
        window.location.replace('../../../login/view/htmls/login.html')
    }
   
}

function checkNome(nome1) {
    if(nome1 == ''){
        alert('Voce deve informar um nome')
        return false
    }else{
        return true
    }

}
function checkRadioGroupGenero(){
    if (document.getElementById('r1').checked) {
        return document.getElementById('r1').value;
    }else if (document.getElementById('r2').checked) {
        return document.getElementById('r2').value;
    }else if (document.getElementById('r3').checked) {
        return document.getElementById('r3').value;
    }else if (document.getElementById('r4').checked) {
        return document.getElementById('r4').value;
    }
}
function Usuario(nomeCadastro,senhaCadastro,emailCadastro,pixCadastro,descricaoCadastro,
    numeroCadastro,unidadePuc,generoCadastro,logadoCadastro = false){
    this.nome = nomeCadastro;
    this.senha = senhaCadastro;
    this.email = emailCadastro;
    this.pix = () => (pixCadastro == '') ? 'pix nao foi informado':pixCadastro
    this.descricao = descricaoCadastro;
    this.number = numeroCadastro;
    this.logado = logadoCadastro;
    this.unidade = unidadePuc;
    this.genero = generoCadastro;
    this.produtos = [];
    this.produtosFavoritos = [];
}

  /**
   * 
   * @param {Usuario} usuario 
   */
function salvar(usuario) {
    let usuarios = localStorage.getItem('usuarios')
    if(usuarios == null){
        usuarios = [];
        localStorage.setItem('usuarios',JSON.stringify(usuarios));
    }
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
    let usuarioAtual = {nome:usuario.nome, senha:usuario.senha, email: usuario.email, pix:usuario.pix()
        ,descricao: usuario.descricao, number:usuario.number,unidade:usuario.unidade,logado:usuario.logado,genero:usuario.genero, produtos: usuario.produtos, produtosFavoritos: usuario.produtosFavoritos}
    //console.log(`usuario ${usuarioAtual.senha}`)
    usuarios.push(usuarioAtual)
    localStorage.setItem('usuarios',JSON.stringify(usuarios));
}



function checkSenha(senha1,senha2){

    if(senha1 == ''){
        alert ("Coloque uma senha");
        return false
    }else if(senha2 == ''){
        alert ("Confirme a senha");
        return false
    }else if (!(senha1 == senha2)){
        alert ("As senhas informadas nao correspomdem");
        return false
    }else if(senha1.length < 8){
        alert('Senha muita Fraca, Porfavor digite mais de 8 digitos')
    }
    else{
        return true
    }

}
function checkEmail(email1,email2){
    if(email1 == ''){
        alert('Informe o email')
        return false
    }else if(email2 == ''){
        alert('Confirme o email')
        return false
    }else if(!(email1 == email2)){
        alert('Os emails informados nao correspondem')
        return false
    }else{
        if(verifyIfEmailExist(email1)){
            alert('O email já foi cadastrado')
            return false
        }
        return true
    }
}

function verifyIfEmailExist(email){
    console.log(email)
    if (localStorage.getItem('usuarios') != null) {
        var emailExist = false
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        usuarios.forEach(user => {
          if (user.email == email) {
            console.log(user.email)
            emailExist = true
          }
        })
        return emailExist
    }
}
function checkNumber(number1){
    if(number1 == ''){
        alert('informe o numero de contato')
        return false 
    }else{
        return true
    }

}
function checkDescription(description1){
    if(description1 == ''){
        alert('Uma pequena descrição é obrigatoria para o cadastro de conta')
        return false
    }
    return true

}
