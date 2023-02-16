let nomeProduto = document.getElementById('nomeProduto')
let precoProduto = document.getElementById('precoProduto')
let categoriaProduto = document.getElementById('categoriaProduto')
let entregaProduto = document.getElementById('entregaProduto')
let estadoProduto = document.getElementById('estadoProduto')
let heartFav = document.getElementById('heartFav')
let addFav = document.getElementById('addFav')
let favoritos = document.getElementById('favoritos')
let isFav = false
let usuario = JSON.parse(localStorage.getItem('usuarios'))
//let marcaProduto = document.getElementById('nomeProduto')
let quantidadeProduto = document.getElementById('quantidadeProduto')
let descricaoProduto = document.getElementById('descricao')
let favoritosFiltrado
let labelCadastre = document.getElementById('cadastre-se')
let labelNomeLogado = document.getElementById('nome_user')
var isLogado = false
let favorito = false

function iniciarTela() {
  verificarLogado()
  carregarInformacoes()
  isProductFav()
}
iniciarTela()

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

function isProductFav() {
  let produtoIdPagina = localStorage.getItem('idProduto')
  usuario.forEach(user => {
    if (user.logado == true) {
      user.produtosFavoritos.forEach(produto => {
        if (produto.id == produtoIdPagina) {
          isFav = true
          addFav.innerText = 'Remover dos favoritos'
          heartFav.classList.remove('fa-regular')
          heartFav.classList.add('fa-solid')
        }
      })
    }
  })
}

function carregarInformacoes() {
  let idProduto = JSON.parse(localStorage.getItem('idProduto'))
  var usuarios = JSON.parse(localStorage.getItem('usuarios'))
  let btnZap = document.getElementById('mandaZap')
  usuarios.forEach(user => {
    user.produtos.forEach(produto => {
      if (produto.id == idProduto) {
        // dados usuario
        let nomeUsuario = user.nome
        let emailUsuario = user.email
        let pix = user.pix
        let unidadeUsuario = user.unidade
        //dados Produto
        let nomeProduto1 = produto.nome
        let precoProduto1 = produto.preco
        let categoriaProduto1 = produto.categoria
        let entregaProduto1 = produto.localEntrega
        let estadoProduto1 = produto.estadoDoProduto
        // let quantidadeProduto1 = produto.quantidadeDoProduto
        let descricaoProduto1 = produto.descricao
        //troca innerText users
        document.getElementById(
          'nomeUsuario'
        ).innerHTML = `<li class="list-group-item" id="nomeUsuario"><strong>Nome do usuario: </strong>${user.nome}</li>`
        document.getElementById(
          'emailUsuario'
        ).innerHTML = `<li class="list-group-item" id="emailUsuario"><strong>Email de contato do vendedor:</strong> ${user.email}</li>`
        document.getElementById(
          'pixUsuario'
        ).innerHTML = `<li class="list-group-item" id="pixUsuario"><strong>Pix do vendedor:</strong> ${user.pix}</li>`
        document.getElementById(
          'unidadeUsuario'
        ).innerHTML = `<li class="list-group-item" id="unidadeUsuario"><strong>Unidade de estudo:</strong> ${user.unidade}</li>`
        btnZap.setAttribute(
          'href',
          `https://api.whatsapp.com/send?phone=55${user.number}`
        )

        //troca innerText produto
        nomeProduto.innerText = nomeProduto1
        precoProduto.innerText = precoProduto1 + ' R$'
        categoriaProduto.innerText = categoriaProduto1
        entregaProduto.innerText = entregaProduto1
        estadoProduto.innerText = estadoProduto1
        // quantidadeProduto.innerText = quantidadeDoProduto1 + ' restantes'
        descricaoProduto.innerText = descricaoProduto1
        document.getElementById('fotoProduto').setAttribute('src', produto.foto)
      }
    })
  })
}
// FAVORITOS

addFav.addEventListener('click', () => {
  var produtoFav
  let idProduto = JSON.parse(localStorage.getItem('idProduto'))
  var usuarios = JSON.parse(localStorage.getItem('usuarios'))
  if (isFav == false) {
    usuarios.forEach(user => {
      user.produtos.forEach(produto => {
        if (produto.id == idProduto) {
          produtoFav = produto
        }
      })
    })

    addFav.innerText = 'Remover dos favoritos'
    heartFav.classList.remove('fa-regular')
    heartFav.classList.add('fa-solid')
    for (let i = 0; i < usuario.length; i++) {
      if (usuario[i].logado) {
        usuario[i].produtosFavoritos[usuario[i].produtosFavoritos.length] =
          produtoFav
      }
    }
    localStorage.setItem('usuarios', JSON.stringify(usuario))
    isFav = true
  } else {
    addFav.innerText = 'Adicionar aos favoritos'
    heartFav.classList.remove('fa-solid')
    heartFav.classList.add('fa-regular')
    for (let i = 0; i < usuario.length; i++) {
      let produtoIdPagina = localStorage.getItem('idProduto')
      if (usuario[i].logado) {
        favoritosFiltrado = usuario[i].produtosFavoritos.filter(
          user => user.id != produtoIdPagina
        )
        usuario[i].produtosFavoritos = favoritosFiltrado
        console.log(favoritosFiltrado)
        console.log(usuario[i])
      }
    }

    localStorage.setItem('usuarios', JSON.stringify(usuario))
    isFav = false
  }
})
heartFav.addEventListener('click', () => {
  var produtoFav
  let idProduto = JSON.parse(localStorage.getItem('idProduto'))
  var usuarios = JSON.parse(localStorage.getItem('usuarios'))
  if (isFav == false) {
    usuarios.forEach(user => {
      user.produtos.forEach(produto => {
        if (produto.id == idProduto) {
          produtoFav = produto
        }
      })
    })

    addFav.innerText = 'Remover dos favoritos'
    heartFav.classList.remove('fa-regular')
    heartFav.classList.add('fa-solid')
    for (let i = 0; i < usuario.length; i++) {
      if (usuario[i].logado) {
        usuario[i].produtosFavoritos[usuario[i].produtosFavoritos.length] =
          produtoFav
      }
    }
    localStorage.setItem('usuarios', JSON.stringify(usuario))
    isFav = true
  } else {
    addFav.innerText = 'Adicionar aos favoritos'
    heartFav.classList.remove('fa-solid')
    heartFav.classList.add('fa-regular')
    for (let i = 0; i < usuario.length; i++) {
      let produtoIdPagina = localStorage.getItem('idProduto')
      if (usuario[i].logado) {
        favoritosFiltrado = usuario[i].produtosFavoritos.filter(
          user => user.id != produtoIdPagina
        )
        usuario[i].produtosFavoritos = favoritosFiltrado
        console.log(favoritosFiltrado)
        console.log(usuario[i])
      }
    }
    localStorage.setItem('usuarios', JSON.stringify(usuario))
    isFav = false
  }
})
