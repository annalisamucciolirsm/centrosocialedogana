/* ==========================================================
   TEST API CENTRO SOCIALE DOGANA
   ========================================================== */

"use strict";


async function testAPI(){

    console.clear();

    console.log("TEST API AVVIATO");


    try{


        const eventi = await getEventi();


        console.log(
            "EVENTI:",
            eventi
        );



        const config = await getConfig();


        console.log(
            "CONFIG:",
            config
        );



        const contenuti = await getContenuti();


        console.log(
            "CONTENUTI:",
            contenuti
        );



        const persone = await getPersone();


        console.log(
            "PERSONE:",
            persone
        );



        const luoghi = await getLuoghi();

console.log(
    "LUOGHI:",
    luoghi
);

console.log(
    "✓ SISTEMA DATI OPERATIVO"
);



        console.log(
            "✓ SISTEMA DATI OPERATIVO"
        );


    }


    catch(error){


        console.error(
            "ERRORE API:",
            error
        );


    }

}


testAPI();
