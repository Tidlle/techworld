//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/techworld", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model usuario do meu projeto
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});
const ProdutograndemarcaSchema = new mongoose.Schema({
  id_produtograndemarca: { type: String, required: true },
  descricao: { type: String },
  marca: { type: String },
  datafabricacao: { type: Date },
  quantidadeestoque: { type: Number },
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Produtograndemarca = mongoose.model(
  "Produtograndemarca",
  ProdutograndemarcaSchema
);

//configuração dos roteamendos

//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = new Usuario({
    email: email,
    senha: senha,
  });
  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

//rota de cadastro especifico
app.post("/cadastroprodutograndemarca", async (req, res) => {
  const id_produtograndemarca = req.body.id_produtograndemarca;
  const descricao = req.body.descricao;
  const marca = req.body.id_marca;
  const datafabricacao = req.body.datafabricacao;
  const quantidadeestoque = req.body.quantidadeestoque;

  const produtograndemarca = new Produtograndemarca({
    id_produtograndemarca: id_produtograndemarca,
    descricao: descricao,
    marca: marca,
    datafabricacao: datafabricacao,
    quantidadeestoque: quantidadeestoque
  });
  try {
    const newProdutograndemarca = await produtograndemarca.save();
    res.json({
      error: null,
      msg: "Cadastro ok",
      produtograndemarca: newProdutograndemarca._id,
    });
  } catch (error) {}
});

//rota padrao
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/home.html");
});
//tem que ter o comando de listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
