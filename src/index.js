import express from "express"; // Importamos express de la dependencia instalada
import { dirname, join } from "path"; // Importamos dirname del modulo path de Node para no tener que escribir rutas absolutas
import { fileURLToPath } from "url"; // Importamos esta funcion fileURLToPAth del modulo url para que la url del archiva pueda configurarse
import indexRoutes from "./routes/index.js"; // Importamos de la ruta de los routers lo que exporta por defecto, el indexRouter (puede tener cualquier nombre) que es el router que exporta por defecto y lo llamamos indexRouter


const app = express(); // Creamos la aplicación apartir del modulo express y la guardamos en una constante

const __dirname = dirname(fileURLToPath(import.meta.url)); // Ejecutamos dirname pasandole otra función del modulo Url para que se transforme en una ruta absoluta y lo guardamos en una constante

app.set("views", join(__dirname, 'views')); // Utilizamos el metodo join para establecer la ruta de la carpeta de las views
app.set("view engine", "ejs"); // Modulo que permite extender el HTML
app.use(indexRoutes); // Usamos el archivo importado de indexRoutes por la ruta deseada del frontend

app.use(express.static(join(__dirname, 'public'))) // Usamos el archivo de estilos como propiedad de express su metodo llamado static que necesita la carpeta public para leer como root, pero para llegar a la ruta vamos usar dirname que ya creamos que se ubica jsto en ../src/ que es la ruta que partimos para llegar a public

app.listen(process.env.PORT || 3000); // Módulo para escuchar el puerto 3000 y una variable de entorno (dada por el sistema operativo) process.env.PORT para ver el puerto que nos da la maquina, y si no da nada (||) pues usa el 3000
console.log("Server is listening on port", process.env.PORT || 3000); // Mensaje en consola para efectivamente revisar que estemos escuchando el puerto 3000
