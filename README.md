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
11. Creamos una carpeta views para las vistas del frontend y un archivo index.ejs con una primeta etiqueta <h1>Hello World</h1>
12. Cambiamos en index.js: app.get('/',(req,res)=>res.send('hello world'))  por 
app.get('/',(req,res)=>res.render('index.ejs')) 
no es necesario poner .ejs porque ya sabe que todos los archivos que reciben son ejs por: app.set('view engine','ejs') // Modulo que permite extender el HTML
app.get('/',(req,res)=>res.render('index')) 
13. Establecemos la carpeta views para indicar donde encuentra los archivos de vistas el archivo index mediante una ruta dinamica creando un Dir Name (Nombre de directorio)
app.set('views', (RUTA ABSOLUTA))
14. Importamos los siguientes modulos para no tener que usar una ruta absoluta y ejecutamos la función
import {dirname} from path // Importamos dirname del modulo path de Node para no tener que escribir rutas absolutas
import {fileURLToPath} from url // Importamos esta funcion fileURLToPAth del modulo url
const dirname(fileURLToPath(import.meta.url)) // Ejecutamos dirname pasandole otra función del modulo Url para que se transforme en una ruta absoluta y lo guardamos en una constante
15. Comprobamos que con este nuevo codigo llegamos a la ubicación del proyecto
console.log(__dirname) // Vemos en consola la dirección actual del proyecto
RTA: C:\Users\pipe_\Documents\GitHub\nodejs\src
16. Cuando usamos Mac o Linux, las rutas de direcciones son con / pero en windows \ . 
Por lo que importamos import {dirname, join} form 'path'
17. Si vemos en console.log podemos ver la ruta que creamos
console.log(join(__dirname,'views')) // Vemos en consola la dirección actual del proyecto
18. Listo, vamos al navegdor ruta localhost:3000 y podemos ver el archivo index.ejs con el hello world entre las etiquetas h1
19. En el archivo index.ejs introducimos toda la estructura html5 y en el body agregamos el hola munda

### Enrutador

1. Vamos a definir todas las páginas de nuestra aplicación
2. En nuestra aplicación index.js conectamos las nuevas páginas 
app.get('/',(req,res)=>res.render('index')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs
app.get('/about',(req,res)=>res.render('about')) // Módulo que permite obtener en la ruta /about una respuesta donde renderiza el archivo about.ejs
app.get('/contact',(req,res)=>res.render('contact')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo contact.ejs
3. En la carpeta views: creamos las páginas nuevas como archivos about.ejs y contact.ejs