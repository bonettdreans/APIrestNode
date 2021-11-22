const rota = require('express').Router()

const Produto = require('../models/Produto')

//Inserir-Criar Post

rota.post('/', async (req, res) => {
  //req.body
  //{nome: "Sansung Galaxy S21", model: "M25D12", cor: "Blue", preco: 5000}
  const { nome, model, cor, preco } = req.body

  if (!nome) {
    res.status(422).json({ error: 'O nome do produto é Obrigatorio' })
  }

  const produto = {
    nome,
    model,
    cor,
    preco
  }

  try {

    await Produto.create(produto)

    res.status(201).json({ message: 'Produto inserido com sucesso' })

  } catch (error) {
    res.status(401).json({ error: error })
  }

})

//READ - LEITURA DE DADOS

rota.get('/', async (req, res) => {
  try {

    const produto = await Produto.find()

    res.status(200).json(produto)

  } catch (error) {
    res.status(401).json({ error: error })
  }
})

//Leitura de Dados

rota.get('/:id', async (req, res) => {
  //extrair o dado da requisicao,  req.params
  const id = req.params.id

  try {
    const produto = await Produto.findOne({ _id: id })

    if (!produto) {
      res.status(422).json({ message: 'O Produto não foi encontrado' })
      return
    }

    res.status(200).json(produto)

  } catch (error) {
    res.status(401).json({ error: error })
  }
})

//update - Atualização de dados (PUT, PATCH)
rota.patch('/:id', async (req, res) => {

  const id = req.params.id

  const { nome, model, cor, preco } = req.body

  const produto = {
    nome,
    model,
    cor,
    preco
  }

  try {
    const updatedProduto = await Produto.updateOne({ _id: id }, produto)

    //console.log(updatedProduto) Ver no terminal o martchedCount 

    if (updatedProduto.matchedCount === 0) {
      res.status(422).json({ message: 'O nome do produto não foi encontrado' })
      return
    }

    res.status(200).json(produto)

  } catch (error) {
    res.status(401).json({ error: error })
  }
})
//Delete - deletar dados
rota.delete('/:id', async (req, res) => {

  const id = req.params.id

  const produto = await Produto.findOne({ _id: id })

  if (!produto) {
    res.status(422).json({ message: 'O Produto não foi encontrado' })
    return
  }

  try {

    await Produto.deleteOne({ _id: id })

    res.status(200).json({ message: 'Produto removido com Sucesso!' })

  } catch (error) {
    res.status(401).json({ error: error })
  }
})


module.exports = rota