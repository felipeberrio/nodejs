import {Router} from 'express' // Importamos la función router desde el modulo express para poder enlazar parte de la app por separado
const router = router() // Agregamos esta función de router a una variable

router.get('/',(req,res)=>res.render('index')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo index.ejs
router.get('/about',(req,res)=>res.render('about')) // Módulo que permite obtener en la ruta /about una respuesta donde renderiza el archivo about.ejs
router.get('/contact',(req,res)=>res.render('contact')) // Módulo que permite obtener en la ruta / una respuesta donde renderiza el archivo contact.ejs

export default router // Exportamos el valor del router para que pueda ser importado en la app (index.js)