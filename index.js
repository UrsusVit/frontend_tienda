const conexion= require('./config/db');
const express= require('express');
const bodyParser=require('body-parser');
const fs=require('fs');
const path=require('path');
const cors=require('cors');

console.log('Iniciando servidor...')
conexion();

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const produtoRutas=require('./routes/productoRoutes')
app.use('/api', produtoRutas)

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})