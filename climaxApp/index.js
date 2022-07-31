require('dotenv').config();

const Busquedas = require("./models/busqueda");
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./utilities/inquirer")


const main = async() => {
    const busquedas = new Busquedas();    
    let entrada;
    do{
        entrada = await inquirerMenu();
        console.log({entrada});
        

        switch( entrada ){
            case 1:
                //mensaje para q escriba y buscar la ciudad
                const lugar = await leerInput('Ciudad la buscar: ');
                busquedas.leerDB();

                const ciudades = await busquedas.buscarCiudad(lugar);


                const id = await listarLugares(ciudades);
                if (id === '0' ) continue;

                const lugarSeleccionado = ciudades.find( l => l.id === id);

                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                const clima = await busquedas.buscarClimaPorLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                console.log("\n Informacion de la ciudad\n".green);
                console.log("Ciudad: ", lugarSeleccionado.nombre.green );
                console.log("Lat: ", lugarSeleccionado.lat );
                console.log("Lng: ", lugarSeleccionado.lng );
                console.log("Temperatura: ", clima.temp );
                console.log("Maxima: ", (clima.max.toString()).red);
                console.log("Minima: ", (clima.min.toString()).blue);
                console.log("Humedad: ", clima.hum );
                console.log("Estado actual :", clima.desc.green );
                busquedas.leerDB();
            break;
            case 2:
                busquedas.historialCammelCase.forEach( (lugar, i) => {
                    const idx = `${ i + 1}, `.green;
                    console.log( ` ${idx} ${lugar} ` );
                })
            break;
        }

        if (entrada !== 0) await pausa();
        
    }while (entrada !== 0);

    console.log(entrada);
}


main();
