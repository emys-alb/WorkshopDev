//Cria e configura o servidor
const express = require('express')
const server = express()

const db = require("./db")

// Configura arquivos estáticos (css, imagem, scripts)
server.use(express.static("public"))

// Habita uso do req.body
server.use(express.urlencoded({ extended: true }))

// configura o nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("htmls", {
  express: server,
  noCache: true,
})

// cria uma rota /
// captura o pedido do cliente para responder
server.get("/", function (req, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()
    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }

    return res.render("index.html", { ideas: lastIdeas })
  })

})

server.get("/ideias", function (req, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas })
  })
})

server.post("/", function (req, res) {
  // Insere dado na tabela
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES (?,?,?,?,?);
`
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    return res.redirect("/ideias")
  })


})


// inicia servidor na porta 3000
server.listen(3000)