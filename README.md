# nodejs
### CONFIGURACIÓN DEL PROYECTO

1. Creamos el archivo package.json (configuración básica de un proyecto en nodeJS) a partir de la terminal en VScode CMD: // npm init -y
2. Creamos dependencias en package.json con: npm i express morgan ejs
    (MODULOS DE PRODUCCIÓN) - Necesarios si o si para funcionar
    - express: Permite crear servidor local sin tener que preocuparnos como funcionan los modulos de servidor internos, cómo cargar archivos, imagenes, etc. (servir paginas al frontend)
    - morgan: Permite ver por consola las peticiones que van llegando, para ver si efectivamente al servidor llego algo o ocurrio un error
    - ejs: Motor de plantillas que permite generar páginas HTML extendido con lógicas de programación como condicionales, bucles y funciones de Js dentro de HTML sin llamar etiqueta de Javascript => PERMITE EXTENDER VALORES DESDE EL BACKEND HACIA EL FRONTEND
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

### Enrutador de las diferentes Express Routes

1. Vamos a definir todas las páginas de nuestra aplicación
2. En nuestra aplicación index.js conectamos las nuevas páginas 
app.get('/',(req,res)=>res.render('index')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs
app.get('/about',(req,res)=>res.render('about')) // Módulo que permite obtener en la ruta /about una respuesta donde renderiza el archivo about.ejs
app.get('/contact',(req,res)=>res.render('contact')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo contact.ejs
3. En la carpeta views: creamos las páginas nuevas como archivos about.ejs y contact.ejs y agregamos algún texto para verificar las rutas
4. verificamos las rutas en localhost:3000/about y localhost:3000/contact
5. Dado que las rutas que se crean puede llegar a convertirse en un archivo muy extenso, creamos una carpeta en src/routes y un archivo index.js donde agregaremos estas rutas
app.get('/',(req,res)=>res.render('index')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs
app.get('/about',(req,res)=>res.render('about')) // Módulo que permite obtener en la ruta /about una respuesta donde renderiza el archivo about.ejs
app.get('/contact',(req,res)=>res.render('contact')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo contact.ejs
Tenemos que solucionar el problema que en este nuevo archivo index.js no tenemos ni la constante app ni las extenciones
6. Para separar una porcion de la aplicación, utilizaremos la función Router del módulo de express, la importamos y aplicamos una constante que valga esta función
import {Router} from 'express'
const router = Router()
7.Cambiamos app por router
router.get('/',(req,res)=>res.render('index')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs
router.get('/about',(req,res)=>res.render('about')) // Módulo que permite obtener en la ruta /about una respuesta donde renderiza el archivo about.ejs
router.get('/contact',(req,res)=>res.render('contact')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo contact.ejs
para comenzar a usar este router lugar de app, funcionaria en remplazo: es cambiar un nombre por otro para darnos a entender que esta no es toda la aplicación app sino que es solo una parte UN ENRUTADOR hacia la app.
8. Finalmente para utilizar el router en la app, vamos a exportar el router por defecto
export default router // Exportamos el valor del router para que pueda ser importado en la app (index.js)
9. Vamos a formatearlo para que VScode agregue . ; o lo que haga falta
f1 para los comandos de VScode y buscamos: Format Document
10. Importamos nuestro index.js de router dentro del index.js de la app
import indexRouter from './routes/index.js' // Importamos de la ruta de los routers lo que exporta por defecto, el indexRouter (puede tener cualquier nombre) que es el router que exporta por defecto y lo llamamos indexRouter
11. Vamos a usar el indexRouter que importamos anteriormente
app.use(indexRoutes); // Usamos el archivo exportado por la ruta deseada
12. Ahora que tenemos enlazado nuestro front vamos a modificar valores como el titulo desde el index.js de routes
router.get("/", (req, res) => res.render("index", { title: "Node Website" })); // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs con el titulo de Node Website gracias a las propiedades extra en HTML que nos da ejs
13. Igualmente modificamos el titulo en el archivo ejs. con una sintaxis propia de ejs gracias a las propiedades extra en HTML que nos da ejs
<title><%= title %></title>  <!-- Lenguaje propio de ejs para dar la propiedad extra a HTML tipo Js para utilizar el valor de title del index.js de routes pasando un dato desde el backend al frontend -->
14. Conectamos las demás paginas del front al backend 
router.get("/", (req, res) => res.render("index", { title: "Node Website" })); // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs con el titulo de Node Website gracias a las propiedades extra en HTML que nos da ejs
router.get("/about", (req, res) => res.render("about", { title: "About me" })); // Módulo que permite obtener en la ruta /about una respuesta donde renderiza el archivo about.ejs con el titulo de About me gracias a las propiedades extra en HTML que nos da ejs
router.get("/contact", (req, res) => res.render("contact", { title: "Contact Page" })); // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo contact.ejs con el titulo de Contact page gracias a las propiedades extra en HTML que nos da ejs
15. Tambien podemos agregar variables usables con esta conexión de ejs de front y backend agregandolas en el index.js de routes y seran visibles donde se invoquen en el front ya que nos lo permite exteneder al ser un objeto con propiedades por ejemplo (no necesario ser solo un string)
index.js
    router.get("/", (req, res) => res.render("index", { title: "Node Website" , x: 'Ejemplo'}));
index.ejs
    <h1>Hello World <%= x %></h1>
Mensaje: Hello World Ejemplo

### EJS, TEMPLATE ENGINE para conectar las diferentes páginas con código reciclado

1. Vamos a conectar las diferentes páginas del frontend con ejs, y para eso creamos una carpeta PARTIALS en views y un documento llamado navigation.ejs
2. Dentro de navigation creamos un Nav (Div de barra de navegación) y en este una lista no ordenada (UL) de items separados de la lista (li) con un boton al home
<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
    </ul>
</nav>
3. Ya creado nuestro navegador lo vamos a importar en las vistas de la aplicación con ejs la palabra include asi que en el body del index.ejs agregamos
    <%- include('partials/navigation') %> <!-- Lenguaje propio de ejs para dar la propiedad extra a HTML tipo Js para EJECUTAR la funcion include propia de ejs que trae el navegador de la carpeta partials (gracias al guion) un dato desde el backend al frontend -->
4. Agregamos la misma etiqueta a las demas vistas de about y contact
5. Ya que podemos reutilizar código (PARTIALS), como lo es el navegador, podemos recrearlo en los diferentes divs como son el footeer o una tarjeta especial o reutilizar en general porciones de código
6. Mejoramos los enlaces de navegación a las demás paginas
7. Agregamos un nuevo archivo a partials, el footer y le damos sus etiquetas de footer y un texto cualquiera
<footer>
    <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, illum.</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, eum, incidunt ipsum architecto assumenda dolorum tempora natus, optio laboriosam ipsam distinctio explicabo ratione quasi laudantium! Delectus fuga ut neque quasi rem laudantium quas nemo commodi harum error quia sint aliquam doloremque necessitatibus sunt nobis, voluptate dolor nisi qui unde. Reiciendis quas consequatur, laborum maiores corporis, debitis beatae veritatis porro odio, iure pariatur nulla. Blanditiis, voluptatibus dolorem! Maiores nulla ducimus maxime, molestias quas est eaque? Quisquam, minima. Aliquam aspernatur, excepturi obcaecati sunt iusto est, hic facere beatae dolorem neque magnam enim consequatur soluta inventore doloremque voluptas. Ad dolorem dignissimos harum eligendi!</p>
</footer>
8. Incluimos el footer en index.ejs de la vista y las demás vistas
<%- include('partials/footer') %> <!-- Lenguaje propio de ejs para dar la propiedad extra a HTML tipo Js para EJECUTAR la funcion include propia de ejs que trae el footer de la carpeta partials (gracias al guion) un dato desde el backend al frontend -->

### Estilos con CSS & Bootstrap

Podemos agregar nuestros propios estilos o usar un framework de CSS, usemos la primera
1. Agregar la carpeta donde estaran nuestros estilos, o stetic files, o styles, o public en express, y dentro de esta vamos a agregar nuestro main.css
2. Dentro de main agregamos nuestro primer estilo que será de fondo
body{
    background: #000;
    color: white;
}
3. Ahora conectamos este nuevo documento de estilos a nuestra app desde index.js 
app.use(express.static(join(__dirname, 'public'))) // Usamos el archivo de estilos como propiedad de express su metodo llamado static que necesita la carpeta public para leer como root, pero para llegar a la ruta vamos usar dirname que ya creamos que se ubica jsto en ../src/ que es la ruta que partimos para llegar a public
4. Ya que nuestro servidor permite leer y llegar hasta nuestro main.css, vamos a agregarlo a las vistas para que se aplique
    <link rel="stylesheet" href="/main.css"> <!-- La ruta del main.css viene desde el servidor / por eso no es solo el nombre del archivo ya que no esta en la misma carpeta de este documento -->
5. Ya que se puede volver muy amplio la cantidad de codigo por las conexiónes etiqueta link de estilos si agregamos despues bootstrap o alguna otra bibiloteca de estilos podemos crear un partials para reciclar codigo y hacerlo menor ya que este debe repetirse en cada una de las diferentes vistas, creamos un nuevo archivo en partials llamado head.ejs y agregamos el codigo a reciclar
<!-- Custom CSS -->

<link rel="stylesheet" href="/main.css"> <!-- La ruta del main.css viene desde el servidor / por eso no es solo el nombre del archivo ya que no esta en la misma carpeta de este documento -->
6. Agregamos la conexión entre el index.ejs vista con el head.ejs de estilos desde el header
<%- include('partials/head') %>
7. Inclumos la misma linea de codigo de conexión de estilos a las demás vistas
8. Ahora que toda la app comparte estilos vamos a agregar una biblioteca de estilos de bootstrap incluyendo el codigo de bootstrap 5 de la pagina web de css en nuestra head.ejs
<!-- Bootstrap 5 CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
9. Borramos la info que tenemos en main.css ya que no la vamos a necesitar
10. Buscamos un estilo de navegador en bootstrap que nos guste en la documentación, y copiamos el código en nuestro documento de navigation.ejs y modificamos donde diga los valores de cada una de las navegaciones, agregamos en adición a las propiedades de la etiquetas que necesitemos
11. Modificamos el contenido de las diferentes vistas en index.ejs agregando primero un logo
12. Creamos la carpeta img en public para guardar el logo y css para el main.css
13. Actualizamos en nuestro head.ejs de estilos nuestras rutas del main.css

14. Agregamos tambien el codigo de Js para funcionar los botones del header entre otros
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>

### Despliegue en Heroku

Heroku es un servicio que se encarga de desplegar nuestra aplicación y se encarga de generar todas las configuraciones y necesario para poder hacer funcionar el sitio en producción, cómo no tenemos bases de datos en este proyecto podemos hacerlo gratuitamente en https://www.heroku.com/
1. Nos registramos y creamos un nuevo proyecto en heroku
2. Vamos a instalar heroku con la documentación - Install the Heroku CLI con descargable
3. Comprobamos en el cmd que tengamos: heroku --version
4. Nos logeamos en heroku via cmd terminal de vscode con: heroku login
5. Enlazamos nuestra aplicación a heroku con el codigo que nos da la pagina de heroku al crear el nuevo proyecto: heroku git:remote -a felipeberrio-nodejs
6. Subimos nuestra aplicación a heroku con el codigo que nos da la pagina de heroku al crear el nuevo proyecto (todo esto cuando ya tengamos commits realizados): git push heroku main
7. Una vez subida, vamos al link de la app que aparece en terminal https://felipeberrio-nodejs.herokuapp.com/ y veremos que aún no podemos entrar a la app, usaremos el codigo de error en cmd que nos aparece: heroku logs --tail
8. Dice Missing script: "start - osea no se encuentra el script start, crearlo como el scrpt dev: no necesito nodemon porque no vamos a reinciar el código por lo que solo ponemos node así en el package.json:  "start":"node src/index.js"
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "nodemon src/index.js",
"start":"node src/index.js"
},
9. Heroku nos va a dar el puerto que puede ser otro 4000 o 3080 o otro, entonces arreglamos la conexión al puerto: en index.js de la app
app.listen(process.env.PORT || 3000); // Módulo para escuchar el puerto 3000 y una variable de entorno (dada por el sistema operativo) process.env.PORT para ver el puerto que nos da la maquina, y si no da nada (||) pues usa el 3000
console.log("Server is listening on port", process.env.PORT || 3000);