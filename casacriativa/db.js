const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./dados.db")

db.serialize(function () {
  // Cria a tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)

  // // Insere dado na tabela
  // const query = `
  //    INSERT INTO ideas(
  //      image,
  //      title,
  //      category,
  //      description,
  //      link
  //    ) VALUES (?,?,?,?,?);
  // `
  // const values = [
  //   "https://image.flaticon.com/icons/svg/2729/2729007.svg",
  //   "Curso de Programação",
  //   "Estudo",
  //   "Lorem ispum",
  //   "https://rocketseat.com.br"
  // ]

  // db.run(query, values, function (err) {
  //   if (err) return console.log(err)
  //   console.log(this)
  // })

  // Deleta um dado da tabela
  //db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
  // if (err) return console.log(err)

  // console.log("DELETEI", this)
  // })

  // Consulta dados na tabela
  //  


})

module.exports = db