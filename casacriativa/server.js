//Cria e configura o servidor
const express = require('express')
const server = express()


const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporary incididunt ut labore et dolore magna",
    url: "http://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporary incididunt ut labore et dolore magna",
    url: "https://www.youtube.com/user/portalfitdance"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporary incididunt ut labore et dolore magna",
    url: "https://lojong.com.br/app/"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaokê",
    category: "Tempo em Família",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporary incididunt ut labore et dolore magna",
    url: "https://www.youtube.com/watch?v=TGXkdU9S0OU"
  }
]

// Configura arquivos estáticos (css, imagem, scripts)
server.use(express.static("public"))

// configura o nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("htmls", {
  express: server,
  noCache: true,
})

// cria uma rota /
// captura o pedido do cliente para responder
server.get("/", function (req, res) {

  const reversedIdeas = [...ideas].reverse()

  let lastIdeas = []
  for (let idea of reversedIdeas) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea)
    }
  }

  return res.render("index.html", { ideas: lastIdeas })
})
server.get("/ideias", function (req, res) {
  const reversedIdeas = [...ideas].reverse()

  return res.render("ideias.html", { ideas: reversedIdeas })
})

// inicia servidor na porta 3000
server.listen(3000)