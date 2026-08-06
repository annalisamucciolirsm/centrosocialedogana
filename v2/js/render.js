/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Render Engine v3
   JSON API
   ========================================================== */

"use strict";


/* ==========================================================
   Sicurezza testo
   ========================================================== */


function escapeHTML(text = ""){

    return String(text)

        .replaceAll("&","&amp;")

        .replaceAll("<","&lt;")

        .replaceAll(">","&gt;")

        .replaceAll('"',"&quot;");

}



/* ==========================================================
   Data
   ========================================================== */


function formattaData(inizio, fine){

    if(!inizio)
        return "";


    const mesi = [

        "GEN",
        "FEB",
        "MAR",
        "APR",
        "MAG",
        "GIU",
        "LUG",
        "AGO",
        "SET",
        "OTT",
        "NOV",
        "DIC"

    ];


    const d1 =
        new Date(inizio);



    if(!fine){

        return `${d1.getDate()} ${mesi[d1.getMonth()]}`;

    }



    const d2 =
        new Date(fine);



    if(
        d1.getMonth()
        ===
        d2.getMonth()
    ){

        return `${d1.getDate()}–${d2.getDate()} ${mesi[d1.getMonth()]}`;

    }



    return `${d1.getDate()} ${mesi[d1.getMonth()]} – ${d2.getDate()} ${mesi[d2.getMonth()]}`;

}



/* ==========================================================
   Badge
   ========================================================== */


function renderBadge(evento){

    let html = "";


    if(
        evento.inEvidenza === true
        ||
        evento.inEvidenza === "TRUE"
    ){

        html += `

<span class="badge badge-highlight">

In evidenza

</span>

`;

    }



    if(
        evento.gratuito === true
        ||
        evento.gratuito === "TRUE"
    ){

        html += `

<span class="badge">

Ingresso libero

</span>

`;

    }



    return html;

}



/* ==========================================================
   Card evento
   ========================================================== */


function renderEvento(evento){

return `

<article class="evento">


<div class="evento-data">

${formattaData(
    evento.dataInizio,
    evento.dataFine
)}

</div>



<div class="evento-contenuto">


${renderBadge(evento)}



<h2>

<a href="evento.html?slug=${evento.slug}">

${escapeHTML(evento.titolo)}

</a>

</h2>



<p>

${escapeHTML(evento.descrizioneBreve)}

</p>



<div class="evento-meta">

<span>

${escapeHTML(evento.categoria)}

</span>


${evento.luogoId ? `

<span>

${escapeHTML(evento.luogoId)}

</span>

` : ""}


</div>


</div>


</article>

`;

}



/* ==========================================================
   Lista
   ========================================================== */


function renderListaEventi(eventi){

    return eventi

        .map(evento =>
            renderEvento(evento)
        )

        .join("");

}



/* ==========================================================
   Stato vuoto
   ========================================================== */


function renderNessunEvento(){

return `

<div class="empty-state">

<h2>

Nessuna attività in programma

</h2>


<p>

Stiamo preparando i prossimi appuntamenti.

</p>


</div>

`;

}
