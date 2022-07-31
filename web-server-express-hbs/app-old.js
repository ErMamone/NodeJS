const http = require('http');

//Obtiene todas las rutas
http.createServer((req, res) => {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    //res.writeHead(200, {'Content-Type': 'application/json'});
    //res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    //res.writeHead(200, {'Content-Type': 'application/csv'});

    //res.write('id, nombre\n');
    res.write("Hola Mundo")
    res.end();
    
})
.listen( 8080 );

console.log("Escuchando en el puerto 8080");