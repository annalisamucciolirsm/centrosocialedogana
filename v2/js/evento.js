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

        mostraErrore();

        return;

    }



    try{


        const evento =
        await getEvento(slug);



        if(!evento){

            mostraErrore();

            return;

        }





        const luogo =
        await getLuogo(
            evento.luogoId
        );



        const persone =
        await getPersone();



        const relatore =
        persone.find(
            persona =>
            persona.id === evento.relatoreId
        );





        renderEvento(
            evento,
            luogo,
            relatore
        );



    }


    catch(error){


        console.error(
            "Errore caricamento evento:",
            error
        );


        mostraErrore();


    }


}








function renderEvento(
    evento,
    luogo,
    relatore
){



document.title =
evento.seoTitle
||
evento.titolo;



setText(
"categoria",
evento.categoria
);



setText(
"titolo",
evento.titolo
);



setText(
"sottotitolo",
evento.sottotitolo
);



setText(
"quando",
formattaData(
evento.dataInizio,
evento.dataFine
)
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
"orario",
evento.orario
||
""
);



setText(
"prenotazione",
evento.prenotazione
||
""
);





setHTML(
"descrizione",
evento.testoCompleto
||
evento.descrizioneBreve
);



if(relatore){


setHTML(
"relatore",
`

<h3>
${relatore.nomeCompleto || ""}
</h3>

<p>
${relatore.biografiaBreve || ""}
</p>

`
);


}







if(evento.copertina){


const img =
document.getElementById(
"copertina"
);



img.src =
evento.copertina;



img.alt =
evento.imageAlt
||
evento.titolo;



img.hidden=false;



}



if(evento.allegato){


const link =
document.getElementById(
"allegato"
);



link.href =
evento.allegato;



link.hidden=false;



}



}








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







function mostraErrore(){


const titolo =
document.getElementById(
"titolo"
);



if(titolo){

titolo.textContent =
"Evento non trovato";

}



}
