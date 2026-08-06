/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Eventi v3
   JSON API
   ========================================================== */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initEventi
);



/* ==========================================================
   Avvio
   ========================================================== */


async function initEventi(){

    const contenitore =
        document.getElementById("eventi");


    if(!contenitore)
        return;


    try{


        let eventi =
            await getEventi();



        /*
        Eventi futuri e programmati
        */

        eventi =
            eventi.filter(evento => {

                return evento.stato !== "Annullato"
                &&
                evento.stato !== "Concluso";

            });



        /*
        Se siamo nella homepage
        mostra solo quelli destinati alla Home
        */

        if(
            document.body.classList.contains("home")
        ){

            eventi =
                eventi.filter(evento => {

                    return (
                        evento.posizione || ""
                    )
                    .includes("Home");

                });

        }



        /*
        Limite homepage
        */

        if(
            document.body.classList.contains("home")
        ){

            eventi =
                eventi.slice(0,5);

        }



        if(!eventi.length){

            contenitore.innerHTML =
                renderNessunEvento();

            return;

        }



        contenitore.innerHTML =
            renderListaEventi(eventi);



    }
    catch(error){


        console.error(
            "Errore caricamento eventi:",
            error
        );


        contenitore.innerHTML = `

<div class="empty-state">

<h2>

Impossibile caricare gli eventi

</h2>

<p>

Riprova più tardi.

</p>

</div>

`;

    }

}
