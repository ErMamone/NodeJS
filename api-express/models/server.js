const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //DB
        this.dbConnection();

        //Middlewares? 
        this.middlewares();

        //Api routes
        this.routes();
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // Parse & body read

        this.app.use( express.json() );

        //Public dir
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user'));
    }

    start(){
    this.app.listen(this.port, () => {
        console.log("Sevidor corriendo en puerto: ", this.port );
    });
    }
}

module.exports = Server;