/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Render Engine
   ========================================================== */

"use strict";

/* ==========================================================
   Helpers
   ========================================================== */

function escapeHTML(text = "") {

    return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;");

}

/* ==========================================================
   Badge
   ========================================================== */

function renderBadge(evento){

    if(evento.evidenza){

        return `
<span class="badge badge-highlight">

In evidenza

</span>
`;

    }

    return "";

}

/* ==========================================================
   Evento Card
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

<span>

${escapeHTML(evento.luogo)}

</span>

</div>

</div>

</article>

`;

}

/* ==========================================================
   Lista
   ========================================================== */

function renderListaEventi(lista){

    return lista
        .map(renderEvento)
        .join("");

}

/* ==========================================================
   Empty State
   ========================================================== */

function renderNessunEvento(){

    return `

<div class="empty-state">

<h2>

Nessuna attività in programma

</h2>

<p>

In questo momento non sono presenti
eventi pubblicati.

</p>

</div>

`;

}
