const API_KEY = '563492ad6f91700001000001af55cf3aad414e3184905c9992cbbb28'

let labelCadastre = document.getElementById('cadastre-se')
let labelNomeLogado = document.getElementById('nome_user')
var isLogado = false

// All requests made with the client will be authenticated

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
async function getImg(query) {
  const baseURL = `https://api.pexels.com/v1/search?query=${query}`
  const response = await fetch(baseURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: API_KEY
    }
  })
  const data = await response.json()
  console.log(data)
  console.log(data.photos.length)
  if (data.photos.length == 0) {
    return `https://source.unsplash.com/${query}`
  }
  return data.photos[0].src.original
}

function checkNomeProduto(nome) {
  if (nome.value == '') {
    alert('Voce deve informar o nome do produto')
    return false
  } else {
    return true
  }
}

function checkDescricaoProduto(descricao) {
  if (descricao.value == '') {
    alert('Voce deve informar a descrição do produto')
    return false
  } else {
    return true
  }
}

function checkPrecoProduto(preco) {
  if (preco.value == '') {
    alert('Voce deve informar o preço do produto')
    return false
  } else {
    return true
  }
}

function checkMarcaProduto(marca) {
  if (marca.value == '') {
    alert('Voce deve informar a marca do produto')
    return false
  } else {
    return true
  }
}

function checkCategoriaProduto() {
  if (document.getElementById('c1').checked) {
    return document.getElementById('c1').value
  } else if (document.getElementById('c2').checked) {
    return document.getElementById('c2').value
  } else if (document.getElementById('c3').checked) {
    return document.getElementById('c3').value
  } else if (document.getElementById('c4').checked) {
    return document.getElementById('c4').value
  } else if (document.getElementById('c5').checked) {
    return document.getElementById('c5').value
  } else if (document.getElementById('c6').checked) {
    return document.getElementById('c6').value
  } else if (document.getElementById('c7').checked) {
    return document.getElementById('c7').value
  }
}

function checkEstadoProduto() {
  if (document.getElementById('e1').checked) {
    return document.getElementById('e1').value
  } else if (document.getElementById('e2').checked) {
    return document.getElementById('e2').value
  } else if (document.getElementById('e3').checked) {
    return document.getElementById('e3').value
  }
}

function checkFotoProduto(foto) {
  if (foto.value == '') {
    alert('Voce deve informar o tipo do produto')
    return false
  } else {
    return true
  }
}

function atualizouUnidade() {
  let select1 = document.querySelector('#campui')
  let optionValue1 = select1.options[select1.selectedIndex]
  return optionValue1.value
}

function atualizouQuantidade() {
  let select2 = document.querySelector('#sel1')
  let optionValue2 = select2.options[select2.selectedIndex]
  return optionValue2.text
}

let salvar1 = document.getElementById('btnAdd')

salvar1.addEventListener('click', async function () {
  var cont = 0
  var usuarios = JSON.parse(localStorage.getItem('usuarios'))
  usuarios.forEach(user => {
    user.produtos.forEach(produto => {
      cont++
    })
  })
  let produto = {
    nome: document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    preco: document.getElementById('preco').value,
    categoria: checkCategoriaProduto(),
    localEntrega: atualizouUnidade(),
    estadoDoProduto: checkEstadoProduto(),
    marca: document.getElementById('marca').value,
    quantidadeDoProduto: atualizouQuantidade(),
    foto: document.getElementById('foto').value,
    id: cont
  }
  if (localStorage.getItem('usuarios') == null) {
    window.location.replace('../../login/view/htmls/login.html')
    alert('Usuário nao registrado ')
  } else {
    if (
      checkNomeProduto(nome) &&
      checkDescricaoProduto(descricao) &&
      checkPrecoProduto(preco) &&
      atualizouUnidade() != '' &&
      checkMarcaProduto(marca) &&
      atualizouQuantidade() != '' &&
      checkFotoProduto(foto)
    ) {
      produto.foto = await getImg(produto.foto)
      console.log(produto.foto)
      var usuarios = JSON.parse(localStorage.getItem('usuarios'))
      usuarios.forEach(user => {
        if (user.logado == true) {
          console.log(user)
          user.produtos.push(produto)
        }
      })
      localStorage.setItem('usuarios', JSON.stringify(usuarios))
      window.location.replace('../../home/view/htmls/home.html')
    }
  }
})
