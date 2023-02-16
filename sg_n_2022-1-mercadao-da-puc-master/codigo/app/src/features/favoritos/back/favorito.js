let labelCadastre = document.getElementById('cadastre-se')
let labelNomeLogado = document.getElementById('nome_user')

const tela = document.getElementById('divFav')

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
function exibirFavoritos() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios'))
  usuarios.forEach(user => {
    if (user.logado) {
      user.produtosFavoritos.forEach(produto => {
        tela.innerHTML += `
            <div class="row divProduto">
            <div class="col-lg-4 col-md-6 col-sm-6">
              <img class="imgProduto" src="${produto.foto}" />
            </div>
            <div class="col-lg-8 col-md-6 col-sm-6 text-left">
              <h2>${produto.nome}</h2>
              <p>
                ${produto.descricao}
              </p>
              <div " class="btnRedirect">
                <a id="${produto.id} onclick="handleSetIdProduct(${this.id})" href="../../../informaçõesProduto/view/htmls/info.html">Página do produto</a>
              </div>
            </div>
            </div>
          
        `

        localStorage.setItem('idProduto', JSON.stringify(produto.id))
      })
    }
  })
}

function handleSetIdProduct(id) {
  localStorage.setItem('idProduto', JSON.stringify(id))
}
exibirFavoritos()
