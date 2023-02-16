let labelCadastre = document.getElementById('cadastre-se')
let labelNomeLogado = document.getElementById('nome_user')
var isLogado = false
const btnMobile = document.getElementById('btnMobile')
// btnMobile.addEventListener('click', toggleMenu)
// btnMobile.addEventListener('touchstart', toggleMenu)

// function toggleMenu(event) {
//   if (event.type === 'touchstart') {
//     event.preventDefault()
//   }
//   const nav = document.getElementById('nav')
//   nav.classList.toggle('active')
//   const active = nav.classList.contains('active')
//   event.currentTarget.setAttribute('aria-expanded', active)
//   if (active) {
//     event.currentTarget.setAttribute('aria-label', 'Fechar menu')
//   } else {
//     event.currentTarget.setAttribute('aria-label', 'Abrir menu')
//   }
// }

function verificarLogado() {
  if (localStorage.getItem('usuarios') == null) {
    alert('Usuário nao registrado ')
  } else {
    var usuarios = JSON.parse(localStorage.getItem('usuarios'))
    usuarios.forEach(user => {
      if (user.logado == true) {
        isLogado = true
        labelCadastre.style.display = 'none'
        labelNomeLogado.innerHTML = user.nome
      }
    })
  }
}
let nomePerfil = document.getElementById('nomePerfil')
let btnDesloga = document.getElementById('btnDeslogar')
let nome = document.getElementById('nome')
let senha = document.getElementById('senha')
let email = document.getElementById('email')
let celular = document.getElementById('numero')
let pix = document.getElementById('pix')
let descricao = document.getElementById('descricao')
let unidade = document.getElementById('sel1')
let salvarMudanca = document.getElementById('btnChange')
let unidadeValor
let usuarioAtual
let usuario = JSON.parse(localStorage.getItem('usuarios'))
for (let i = 0; i < usuario.length; i++) {
  if (usuario[i].logado) {
    usuarioAtual = usuario[i]
  }
}
atualizaDadosPerfil()
function atualizaDadosPerfil() {
  if (usuarioAtual.unidade == 'São Gabriel') {
    unidadeValor = 2
  } else if (usuarioAtual.unidade == 'Coração Eucaristico') {
    unidadeValor = 1
  } else if (usuarioAtual.unidade == 'Praça da Liberdade') {
    unidadeValor = 3
  } else if (usuarioAtual.unidade == 'Barreiro') {
    unidadeValor = 4
  } else if (usuarioAtual.unidade == 'Outro') {
    unidadeValor = 5
  }

  nomePerfil.innerText = usuarioAtual.nome
  nome.value = usuarioAtual.nome
  senha.value = usuarioAtual.senha
  email.value = usuarioAtual.email
  celular.value = usuarioAtual.number
  pix.value = usuarioAtual.pix
  descricao.innerText = usuarioAtual.descricao
  unidade.value = unidadeValor
}
function alterarDadosPerfil() {
  for (let i = 0; i < usuario.length; i++) {
    if (usuario[i].logado) {
      if (nome.value == '') {
        alert('Não foi possível alterar o nome, insira um nome válido')
      } else {
        usuario[i].nome = nome.value
        nomePerfil.innerText = nome.value
      }
      if (senha.value.length < 8) {
        alert('Não foi possível alterar a senha, insira uma senha válida')
      } else {
        usuario[i].senha = senha.value
      }
      if (verifyIfEmailExist(email.value) || email.value.length < 6) {
        alert('Email inválido')
      } else {
        usuario[i].email = email.value
      }
      if (celular.value.length < 8) {
        alert('Não foi possível alterar o numero, digite um número válido')
      } else {
        usuario[i].number = celular.value
      }
      if (pix.value == '') {
        alert('Não foi possível alterar o pix, digite um pix válido')
      } else {
        usuario[i].pix = pix.value
      }
      if (descricao.value == '') {
        alert(
          'Não foi possível alterar a descrição, digite uma descrição válida'
        )
      } else {
        usuario[i].descricao = descricao.value
      }
      usuario[i].unidade = unidade.options[unidade.selectedIndex].text
      window.location.replace('../../../home/view/htmls/home.html')
    }
  }

  localStorage.setItem('usuarios', JSON.stringify(usuario))
}

function deslogar() {
  isLogado = false
  labelNomeLogado.style.display = 'none'
  labelCadastre.style.display = 'block'
  labelCadastre.innerHTML = '<span> Cadastre-se</span>'
  for (let i = 0; i < usuario.length; i++) {
    if (usuario[i].logado) {
      usuario[i].logado = false
    }
  }
  localStorage.setItem('usuarios', JSON.stringify(usuario))
  window.location.href = '../../../home/view/htmls/home.html'
}
btnDesloga.addEventListener('click', deslogar)
salvarMudanca.addEventListener('click', alterarDadosPerfil)

verificarLogado()
function verifyIfEmailExist(email6) {
  let emailExists = false
  for (let i = 0; i < usuario.length; i++) {
    console.log(usuario[i].email)
    console.log(email6)
    if (usuario[i].email == email6 && usuario[i].logado == false) {
      emailExists = true
    }
  }
  return emailExists
}
