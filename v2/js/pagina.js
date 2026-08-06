/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Pagina contenuto v3
   JSON API
   ========================================================== */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initPagina
);



async function initPagina(){


    const slug =
        new URLSearchParams(
            window.location.search
        )
        .get("slug");


    if(!slug){

        mostraErrorePagina();

        return;

    }



    try{


        const contenuto =
            await getContenuto(slug);



        if(!contenuto){

            mostraErrorePagina();

            return;

        }



        renderPagina(
            contenuto
        );


    }
    catch(error){


        console.error(
            "Errore caricamento contenuto:",
            error
        );


        mostraErrorePagina();

    }

}



/* ==========================================================
   Rendering
   ========================================================== */


function renderPagina(contenuto){


    document.title =
        contenuto.seoTitle
        ||
        contenuto.titolo;



    const titolo =
        document.getElementById(
            "page-title"
        );


    if(titolo)

        titolo.textContent =
            contenuto.titolo;



    const sottotitolo =
        document.getElementById(
            "page-subtitle"
        );


    if(sottotitolo)

        sottotitolo.textContent =
            contenuto.sottotitolo;



    const testo =
        document.getElementById(
            "page-content"
        );


    if(testo)

        testo.innerHTML =
            contenuto.testo;



    const cover =
        document.getElementById(
            "page-cover"
        );



    if(
        cover
        &&
        contenuto.copertina
    ){

        cover.hidden = false;

        cover.src =
            contenuto.copertina;

        cover.alt =
            contenuto.imageAlt
            ||
            contenuto.titolo;

    }



    aggiornaSEO(
        contenuto
    );

}



/* ==========================================================
   SEO dinamico
   ========================================================== */


function aggiornaSEO(contenuto){


    const description =
        document.querySelector(
            'meta[name="description"]'
        );


    if(
        description
        &&
        contenuto.seoDescription
    ){

        description.setAttribute(
            "content",
            contenuto.seoDescription
        );

    }


}



/* ==========================================================
   Errore
   ========================================================== */


function mostraErrorePagina(){


    const titolo =
        document.getElementById(
            "page-title"
        );


    if(titolo)

        titolo.textContent =
            "Contenuto non trovato";



    const testo =
        document.getElementById(
            "page-content"
        );


    if(testo)

        testo.innerHTML = `

<p>

Il contenuto richiesto non è disponibile.

</p>

`;

}
