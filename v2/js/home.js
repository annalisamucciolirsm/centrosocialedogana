/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Home v4
   Preload dati
   ========================================================== */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initHome
);



async function initHome(){


    try{


        await preloadDati();



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
   Precaricamento dati
   ========================================================== */


async function preloadDati(){


    await Promise.all([

        getEventi(),

        getLuoghi(),

        getPersone(),

        getContenuti()

    ]);


}






/* ==========================================================
   Eventi Home
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
        eventi.filter(evento=>{


            return (

                evento.posizione
                &&
                evento.posizione.includes(
                    "Home"
                )

            );


        });



    eventi =
        eventi.filter(evento=>{


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
   Config
   ========================================================== */


async function caricaConfigurazione(){


    const config =
        await getConfig();



    document
        .querySelectorAll(
            "[data-config]"
        )
        .forEach(elemento=>{


            const chiave =
                elemento.dataset.config;



            if(config[chiave]){


                elemento.textContent =
                    config[chiave];


            }


        });


}
