/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Evento v4
   JSON API + Async Parallel
   ========================================================== */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initEvento
);



async function initEvento(){


    const slug =
        new URLSearchParams(
            window.location.search
        )
        .get("slug");



    if(!slug){

        mostraErroreEvento();

        return;

    }



    try{


        const evento =
            await getEvento(slug);



        if(!evento){

            mostraErroreEvento();

            return;

        }



        const [
            luogo,
            persone
        ] = await Promise.all([

            getLuogo(evento.luogoId),

            getPersone()

        ]);



        const relatore =
            trovaPersone(
                evento,
                persone
            );



        renderPaginaEvento(
            evento,
            luogo,
            relatore
        );


    }


    catch(error){


        console.error(
            "Errore evento:",
            error
        );


        mostraErroreEvento();


    }


}





/* ==========================================================
   Trova relatori
   ========================================================== */


function trovaPersone(
    evento,
    persone
){


    if(!evento.relatoreId){

        return [];

    }



    const ids =
        evento.relatoreId
        .split(",");



    return persone.filter(persona=>{


        return ids.includes(
            persona.id
        );


    });


}







/* ==========================================================
   Rendering
   ========================================================== */


function renderPaginaEvento(
    evento,
    luogo,
    persone
){


    document.title =
        evento.seoTitle
        ||
        evento.titolo;



    setText(
        "titolo",
        evento.titolo
    );


    setText(
        "categoria",
        evento.categoria
    );


    setText(
        "meta",
        evento.sottotitolo
    );


    setHTML(
        "descrizione",
        evento.testoCompleto
    );


    setText(
        "quando",
        formattaData(
            evento.dataInizio,
            evento.dataFine
        )
    );


    setText(
        "orario",
        evento.orario || "—"
    );


    setText(
        "luogo",
        luogo
        ?
        luogo.nome
        :
        ""
    );


    setText(
        "prenotazione",
        evento.prenotazione || ""
    );



    if(persone.length){


        setHTML(
            "relatore",
            persone.map(persona=>`

<strong>
${persona.nomeCompleto}
</strong>

<br>

${persona.biografiaBreve || ""}

`).join("<br><br>")
        );


    }





    if(evento.copertina){


        const img =
            document.getElementById(
                "copertina"
            );


        if(img){

            img.hidden = false;

            img.src =
                evento.copertina;


            img.alt =
                evento.imageAlt
                ||
                evento.titolo;

        }


    }



    if(evento.allegato){


        const link =
            document.getElementById(
                "allegato"
            );


        if(link){

            link.hidden = false;

            link.href =
                evento.allegato;

        }

    }


}







/* ==========================================================
   Helpers DOM
   ========================================================== */


function setText(
    id,
    valore
){


    const elemento =
        document.getElementById(id);



    if(elemento){

        elemento.textContent =
            valore || "";

    }


}



function setHTML(
    id,
    valore
){


    const elemento =
        document.getElementById(id);



    if(elemento){

        elemento.innerHTML =
            valore || "";

    }


}







/* ==========================================================
   Errore
   ========================================================== */


function mostraErroreEvento(){


    setText(
        "titolo",
        "Evento non trovato"
    );


    setHTML(
        "descrizione",
        `
<p>
L'evento richiesto non è disponibile.
</p>
`
    );


}
