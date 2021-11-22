const mongoose = require ('mongoose')

const Produto = mongoose.model('Mobile',{
    nome: String,
    model: String,
    cor: String,
    preco: Number
})

module.exports = Produto