# nodejs
### CONFIGURACIÓN DEL PROYECTO

1. Creamos el archivo package.json (configuración básica de un proyecto en nodeJS) a partir de la terminal en VScode CMD: // npm init -y
2. Creamos dependencias en package.json con: npm i express morgan ejs
    (MODULOS DE PRODUCCIÓN) - Necesarios si o si para funcionar
    - express: Permite crear servidor local sin tener que preocuparnos como funcionan los modulos de servidor internos, cómo cargar archivos, imagenes, etc. (servir paginas al frontend)
    - morgan: Permite ver por consola las peticiones que van llegando, para ver si efectivamente al servidor llego algo o ocurrio un error
    - ejs: Motor de plantillas que permite generar páginas HTML extendido con lógicas de programación como condicionales, bucles y funciones de Js dentro de HTML sin llamar etiqueta de Javascript
3. Creamos las (DEV DEPENDENCIES) dependencias de desarrollo, Modulos de DESARROLLO Modulos que faciliten la creación de la aplicación pero en producción ya no son necesarios: npm instal nodemon -D
4. Creamos la carpeta fuente src (source code) y creamos archivo index.js con un hello world por consola
5. Podemos crear con nodemon una forma de reciclar codigo para re ejecutar codigo escrito con: npx nodemon src/index.js (npx se utiliza cuando instalamos modulos localmente nodemon (este proyecto))
6. En package.json podemos crear nuestro propio script con su código, "dev": 'nodemon src/index.js'
7. Podemos usar: npm run dev (para obtener la misma salida a partir del script creado)
8. Podemos cerrar el server creado con: (CTRL + C) x2 veces

### CREAR SERVIDOR BÁSICO CON EXPRESS

1. Necesitamos requerir el modulo instalado en la sección anterior en index.js, tenemos la forma de CommonJS conocida como: require(express) y lo guardamos en una constante para utilizarlo:
const express = requite(express)
2. En nodeJS podemos llamar los ESModules o Modulos de EcmaScript para utilizarlo de forma estandar o mejor dicho como lo utiliza el frontend; 
Para este ejemplo vamos a usar lo ESModules en lugar de CommonJS ya que en esteejemplo sencillo no necesitamos lo require o una funcionalidad especifica de los require.
En package.json agregamos bajo el atributo main un nuevo atributo: 
"type": "module", 
de esta forma podemos llamar express importandolo en lugar de como una constante
import express from 'express'
3. Creamos una aplicación utilizando express: const app = express()
4. Una vez tenemos nuestra app, vamos a ejecturalo con su método Listen y creamos un mensaje en consola para efectivamente comprobarlo: 
app.listen(3000)
console.log('Server is listening on port', 3000)
5. Si guardamos se puede ver en consola 
C:\Users\pipe_\Documents\GitHub\nodejs>npm run dev
> nodejs@1.0.0 dev
> nodemon src/index.js
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/index.js`
Server is listening on port 3000
6. Si entramos a un navegador y escribimos localhost:3000 -> en respuesta el navegador: 
Cannot GET /
que es una buena respuesta indicando que el servidor ya esta montado y escuchandose pero no tiene nada por cargar aún.
7. Creamos la primera ruta:
app.get('/',(req,res)=>res.send('Hello World'))
Cuando llamen la ruta petición GET '/' voy a responder con un request y respond (req,res) y respondo con un Hello World (string no página HTML), basicamente son dos funciones
8. Nosotros vamos a utilizar HTML con el módulo EJS entonces lo importamos:
import ejs from 'ejs'
9. Para ejecutarlo, vamos a escribir antes de el GET de la ruta '/':
app.set('view engine', 'ejs') // Modulo que permite extender el HTML
Para establecer el motor de vistas o plantillas, aquellos que nos permite extender el HTML y crear lógica de programación en HTML y enviado al navegador
10. Express tiene integración con EJS por defecto por lo tanto podemos eliminar la importación de ejs escrita anteriormente: import ejs from 'ejs'

