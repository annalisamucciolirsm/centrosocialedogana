/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Home v3
   JSON API
   ========================================================== */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initHome
);



async function initHome(){


    try{


        await caricaEventiHome();

        await caricaConfigurazione();


    }
    catch(error){


        console.error(
            "Errore homepage:",
            error
        );


    }

}



/* ==========================================================
   Eventi Homepage
   ========================================================== */


async function caricaEventiHome(){


    const contenitore =
        document.getElementById(
            "eventi"
        );


    if(!contenitore)
        return;



    let eventi =
        await getEventi();



    eventi =
        eventi.filter(evento => {


            return (

                evento.posizione
                &&
                evento.posizione.includes(
                    "Home"
                )

            );


        });



    eventi =
        eventi.filter(evento => {


            return (

                evento.stato !== "Annullato"

                &&

                evento.stato !== "Concluso"

            );


        });



    eventi =
        eventi.slice(0,3);



    if(!eventi.length){

        contenitore.innerHTML =
            renderNessunEvento();

        return;

    }



    contenitore.innerHTML =
        renderListaEventi(eventi);


}



/* ==========================================================
   Configurazione sito
   ========================================================== */


async function caricaConfigurazione(){


    const config =
        await getConfig();



    const elementi =
        document.querySelectorAll(
            "[data-config]"
        );



    elementi.forEach(elemento=>{


        const chiave =
            elemento.dataset.config;



        if(config[chiave]){

            elemento.textContent =
                config[chiave];

        }


    });


}
