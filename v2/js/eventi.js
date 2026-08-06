/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Eventi
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", initEventi);

/* ==========================================================
   Init
   ========================================================== */

async function initEventi() {

    const contenitore = document.getElementById("eventi");

    if (!contenitore) return;

    try {

        let eventi = await getEventi();

        // Solo eventi pubblici e non conclusi
        eventi = eventi.filter(evento =>
            evento.Stato !== "Concluso" &&
            evento.Stato !== "Annullato"
        );

        // Home → mostra solo gli eventi destinati alla Home
        if (document.body.classList.contains("home")) {

            eventi = eventi.filter(evento =>
                (evento.Posizione || "").includes("Home")
            );

        }

        if (!eventi.length) {

            contenitore.innerHTML = renderNessunEvento();
            return;

        }

        contenitore.innerHTML = renderListaEventi(eventi);

    }

    catch (errore) {

        console.error(errore);

        contenitore.innerHTML = `

<div class="empty-state">

<h2>

Errore di caricamento

</h2>

<p>

Non è stato possibile recuperare gli eventi.

</p>

</div>

`;

    }

}
