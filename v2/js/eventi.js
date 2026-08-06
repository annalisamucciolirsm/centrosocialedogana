/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Eventi v2
   ========================================================== */

google.charts.load("current");

google.charts.setOnLoadCallback(caricaEventi);

/* ==========================================================
   Configurazione
   ========================================================== */

const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/15oL19MUdtAUfe9TupmaeG_aYKLcdo8n6u2QVy5k3WR8/gviz/tq?sheet=Eventi";

const MESI = [
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

/* ==========================================================
   Caricamento
   ========================================================== */

function caricaEventi() {

    const query = new google.visualization.Query(SHEET_URL);

    query.send(mostraEventi);

}

/* ==========================================================
   Data
   ========================================================== */

function formattaData(inizio, fine) {

    if (!inizio) return "";

    const d1 = new Date(inizio);

    if (!fine) {

        return `${d1.getDate()} ${MESI[d1.getMonth()]}`;

    }

    const d2 = new Date(fine);

    if (d1.getMonth() === d2.getMonth()) {

        return `${d1.getDate()}–${d2.getDate()} ${MESI[d1.getMonth()]}`;

    }

    return `${d1.getDate()} ${MESI[d1.getMonth()]} – ${d2.getDate()} ${MESI[d2.getMonth()]}`;

}

/* ==========================================================
   Rendering
   ========================================================== */

function mostraEventi(response) {

    if (response.isError()) {

        console.error(
            "Errore Google Sheets:",
            response.getMessage()
        );

        return;

    }

    const table = response.getDataTable();

    const contenitore = document.getElementById("eventi");

    if (!contenitore) return;

    contenitore.innerHTML = "";

    let html = "";

    for (let i = 0; i < table.getNumberOfRows(); i++) {

        const attivo = table.getValue(i, 12);

        if (attivo !== true) continue;

        const dataInizio = table.getValue(i, 0);
        const dataFine = table.getValue(i, 1);

        const titolo = table.getValue(i, 2) || "";
        const categoria = table.getValue(i, 3) || "";
        const slug = table.getValue(i, 4) || "";

        html += `
<article class="evento">

    <div class="evento-data">
        ${formattaData(dataInizio, dataFine)}
    </div>

    <div class="evento-contenuto">

        <h2>

            <a href="evento.html?slug=${encodeURIComponent(slug)}">

                ${titolo}

            </a>

        </h2>

        <p>${categoria}</p>

    </div>

</article>
`;

    }

    if (!html.trim()) {

        html = `
<p class="empty-state">

Al momento non sono presenti attività in programma.

</p>
`;

    }

    contenitore.innerHTML = html;

}
