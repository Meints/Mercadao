let inputEmail = document.getElementById("emailLogin");
let inputSenha = document.getElementById("senhaLogin");


function cliqueLogin(){

    var email = inputEmail.value
    var senha = inputSenha.value
    if(email == '' || senha == ''){
        alert('preencha os campos')
    }else{
        loginUsuario(email,senha)

    }

}
function loginUsuario(emailL, senhaL){
    var userNotExist = true;

    if(localStorage.getItem('usuarios') == null){
        alert('Nao existem usuarios  registrado ')
    }else{
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        const usuariosAtualizados = usuarios.map(user => {
            if(user.email == emailL && user.senha == senhaL){
                user.logado = true 
                window.location.replace('../../../home/view/htmls/home.html')
                userNotExist = false;
            }else{
                //Solucao temporaria, imagino que quando eu fizer o logout na tela do usuario eu defina
                //o logado como falso, pois a unica forma de ir para login cadastro depois de logado
                // e saindo da conta
                user.logado = false;
            }
            return user
        });
        if(userNotExist){
            alert('Usuario nao cadastrado')
        }

        localStorage.setItem('usuarios',JSON.stringify(usuariosAtualizados));
    }
}