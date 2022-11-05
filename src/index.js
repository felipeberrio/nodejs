import express from 'express'

const app = express() // 12:37

app.set('view engine','ejs') // Modulo que permite extender el HTML

app.get('/',(req,res)=>res.send('hello world')) // Módulo que permite obtener en la ruta / una respuesta de String "Hello World"

app.listen(3000) // Módulo para escuchar el puerto 3000
console.log('Server is listening on port', 3000) // Mensaje en consola para efectivamente revisar que estemos escuchando el puerto 3000