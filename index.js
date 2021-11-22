//Config inicial
require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')

//forma de ler JSON//middlewares
app.use(
    express.urlencoded({
        extended:true,
    }),
)

app.use(express.json())

//Rotas da minha API 
const produtoRota =require('./routes/routesProduto')

app.use('/produtos', produtoRota)


//Rota inicial /endpoint

app.get('/',(req, res) => {

    //mostrar req

    res.json({message:'Oi Héctor'})
})

//Porta 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent (process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@mongosecluster0.z5tjh.mongodb.net/BancoHector?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(8000)
  })
  .catch((err) => console.log(err))
