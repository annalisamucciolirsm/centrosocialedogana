/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Evento v3
   JSON API
   ========================================================== */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initEvento
);



/* ==========================================================
   Avvio
   ========================================================== */


async function initEvento(){

    const slug =
        new URLSearchParams(
            window.location.search
        )
        .get("slug");


    if(!slug)
        return;



    try{


        const evento =
            await getEvento(slug);



        if(!evento){

            mostraErroreEvento();

            return;

        }



        const luogo =
            await getLuogo(
                evento.luogoId
            );



        let persone = [];



        if(evento.persone){

            const ids =
                evento.persone.split(";");


            for(
                const id of ids
            ){

                const persona =
                    await getPersona(
                        id.trim()
                    );


                if(persona)
                    persone.push(persona);

            }

        }



        renderPaginaEvento(
            evento,
            luogo,
            persone
        );



    }
    catch(error){


        console.error(
            "Errore caricamento evento:",
            error
        );


        mostraErroreEvento();

    }

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



    const titolo =
        document.getElementById("titolo");


    if(titolo)
        titolo.textContent =
            evento.titolo;



    const categoria =
        document.getElementById("categoria");


    if(categoria)
        categoria.textContent =
            evento.categoria;



    const meta =
        document.getElementById("meta");


    if(meta)
        meta.textContent =
            evento.sottotitolo;



    const descrizione =
        document.getElementById("descrizione");


    if(descrizione)
        descrizione.innerHTML =
            evento.testoCompleto;



    const quando =
        document.getElementById("quando");


    if(quando)
        quando.textContent =
            formattaData(
                evento.dataInizio,
                evento.dataFine
            );



    const orario =
        document.getElementById("orario");


    if(orario)
        orario.textContent =
            evento.orario
            ||
            "—";



    const luogoBox =
        document.getElementById("luogo");


    if(luogoBox)
        luogoBox.textContent =
            luogo
            ?
            luogo.nome
            :
            "";



    const prenotazione =
        document.getElementById("prenotazione");


    if(prenotazione)
        prenotazione.textContent =
            evento.prenotazione
            ||
            "";



    const relatore =
        document.getElementById("relatore");


    if(
        relatore
        &&
        persone.length
    ){

        relatore.innerHTML =
            persone
            .map(persona => `

<strong>
${persona.nomeCompleto}
</strong>

<br>

${persona.biografiaBreve || ""}

            `)
            .join("<br><br>");

    }



    if(evento.copertina){

        const img =
            document.getElementById("copertina");


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



    const allegato =
        document.getElementById("allegato");


    if(
        allegato
        &&
        evento.allegato
    ){

        allegato.hidden = false;

        allegato.href =
            evento.allegato;

    }



}



/* ==========================================================
   Errore
   ========================================================== */


function mostraErroreEvento(){

    const titolo =
        document.getElementById("titolo");


    if(titolo){

        titolo.textContent =
            "Evento non trovato";

    }


    const descrizione =
        document.getElementById("descrizione");


    if(descrizione){

        descrizione.innerHTML = `

<p>

L'evento richiesto non è disponibile.

</p>

`;

    }

}
