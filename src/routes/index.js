import { Router } from "express"; // Importamos la función router desde el modulo express para poder enlazar parte de la app por separado
const router = Router(); // Agregamos esta función de router a una variable

router.get("/", (req, res) => res.render("index", { title: "Node Website"})); // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs con el titulo de Node Website gracias a las propiedades extra en HTML que nos da ejs
router.get("/about", (req, res) => res.render("about", { title: "About me" })); // Módulo que permite obtener en la ruta /about una respuesta donde renderiza el archivo about.ejs con el titulo de About me gracias a las propiedades extra en HTML que nos da ejs
router.get("/contact", (req, res) => res.render("contact", { title: "Contact Page" })); // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo contact.ejs con el titulo de Contact page gracias a las propiedades extra en HTML que nos da ejs

export default router; // Exportamos el valor del router para que pueda ser importado en la app (index.js)
