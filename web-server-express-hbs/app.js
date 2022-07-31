const express = require('express');
const hbs = require('hbs');

const app = express();
const port = 8080;


//Handlebars para express
app.set( 'view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials', function (err) {
    console.log(err);
});

app.use( express.static('public'));

//Solo obtiene la ruta / Y TAMBIEN SE PISA CON EL EXPRESS.STATIC DE ARRIBA

/*
app.get('/', (req, res) => {
    res.send("Hello World");
})
*/

app.get('/', (req,res ) => {
    res.render('home', { 
        nombre: 'Carlos pepe',
        titulo: 'Carlitosssss'
    });
})


//Solo funciona sobre 8080/hola-mundo
app.get('/hola-mundo', (req,res) => {
    res.send('Hola mundo en una ruta especifica');
})

app.get('/generic', (req,res) => {
    res.render('generic', { 
        nombre: 'Carlos pepe',
        titulo: 'Carlitosssss'
    });
})
 
app.get('/elements', (req,res) => {
    res.render('elements', { 
        nombre: 'Carlos pepe',
        titulo: 'Carlitosssss'
    });
})

//Pa todas las rutas q no encajen
app.get('*', (req,res) => {
    //res.sendFile(__dirname + '/public/404.html');
    res.send("Error 404")
})

app.listen(port, () =>{
    console.log(`Ejemplo de app corriendo en puerto: ${port}`);
})