"use strict";


document.addEventListener(
"DOMContentLoaded",
caricaEventi
);



async function caricaEventi(){


const contenitore =
document.getElementById(
"lista-eventi"
);



const eventi =
await getEventi();



contenitore.innerHTML =


eventi.map(evento=>`


<article class="card-evento">


<div class="card-data">

${formattaData(
evento.dataInizio,
evento.dataFine
)}

</div>



<div>


<h2>

<a href="evento.html?slug=${evento.slug}">

${evento.titolo}

</a>

</h2>



<p>

${evento.categoria}

</p>



<p>

${evento.descrizioneBreve || ""}

</p>


</div>


</article>



`).join("");



}
