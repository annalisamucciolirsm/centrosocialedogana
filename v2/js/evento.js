/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Evento v2
   ========================================================== */

google.charts.load("current");

google.charts.setOnLoadCallback(caricaEvento);

/* ==========================================================
   Configurazione
   ========================================================== */

const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/15oL19MUdtAUfe9TupmaeG_aYKLcdo8n6u2QVy5k3WR8/gviz/tq?sheet=Eventi";

/* ==========================================================
   Helpers
   ========================================================== */

function parametro(nome) {

    return new URLSearchParams(window.location.search).get(nome);

}

/* ==========================================================
   Caricamento
   ========================================================== */

function caricaEvento() {

    const query = new google.visualization.Query(SHEET_URL);

    query.send(mostraEvento);

}

/* ==========================================================
   Rendering
   ========================================================== */

function mostraEvento(response) {

    if (response.isError()) {

        console.error(response.getMessage());

        return;

    }

    const table = response.getDataTable();

    const slugRichiesto = parametro("slug");

    if (!slugRichiesto) return;

    for (let i = 0; i < table.getNumberOfRows(); i++) {

        const slug = table.getValue(i, 4);

        if (slug !== slugRichiesto) continue;

        document.dispatchEvent(new CustomEvent("eventoCaricato", {

            detail: {

                dataInizio: table.getValue(i, 0),
                dataFine: table.getValue(i, 1),

                titolo: table.getValue(i, 2),
                categoria: table.getValue(i, 3),

                slug: table.getValue(i, 4),

                descrizione: table.getValue(i, 5),
                immagine: table.getValue(i, 6),

                luogo: table.getValue(i, 7),
                orario: table.getValue(i, 8),

                relatore: table.getValue(i, 9),

                prenotazione: table.getValue(i, 10),

                allegato: table.getValue(i, 11),

                attivo: table.getValue(i, 12)

            }

        }));

        return;

    }

    document.body.classList.add("evento-non-trovato");

}
