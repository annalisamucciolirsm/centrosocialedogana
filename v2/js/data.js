/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Data Layer v1
   ========================================================== */

"use strict";

/* ==========================================================
   Configurazione
   ========================================================== */

const SHEET_ID = "15oL19MUdtAUfe9TupmaeG_aYKLcdo8n6u2QVy5k3WR8";
const SHEET_NAME = "Eventi";

const QUERY_URL =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(SHEET_NAME)}`;

/* ==========================================================
   Caricamento Google Charts
   ========================================================== */

function loadGoogleCharts() {

    return new Promise(resolve => {

        google.charts.load("current");

        google.charts.setOnLoadCallback(resolve);

    });

}

/* ==========================================================
   Query
   ========================================================== */

function querySheet() {

    return new Promise((resolve, reject) => {

        const query =
            new google.visualization.Query(QUERY_URL);

        query.send(response => {

            if (response.isError()) {

                reject(response.getMessage());

                return;

            }

            resolve(response.getDataTable());

        });

    });

}

/* ==========================================================
   Parsing
   ========================================================== */

function parseEvento(table, row) {

    return {

        dataInizio: table.getValue(row,0),

        dataFine: table.getValue(row,1),

        titolo: table.getValue(row,2) || "",

        categoria: table.getValue(row,3) || "",

        slug: table.getValue(row,4) || "",

        sottotitolo: table.getValue(row,5) || "",

        descrizioneBreve: table.getValue(row,6) || "",

        descrizione: table.getValue(row,7) || "",

        copertina: table.getValue(row,8) || "",

        galleria: table.getValue(row,9) || "",

        luogo: table.getValue(row,10) || "",

        indirizzo: table.getValue(row,11) || "",

        orario: table.getValue(row,12) || "",

        durata: table.getValue(row,13) || "",

        relatore: table.getValue(row,14) || "",

        biografia: table.getValue(row,15) || "",

        prenotazione: table.getValue(row,16) || "",

        linkPrenotazione: table.getValue(row,17) || "",

        allegato: table.getValue(row,18) || "",

        capienza: table.getValue(row,19),

        gratuito: table.getValue(row,20),

        pubblicato: table.getValue(row,21),

        evidenza: table.getValue(row,22),

        seoTitle: table.getValue(row,23) || "",

        seoDescription: table.getValue(row,24) || "",

        aggiornato: table.getValue(row,25)

    };

}

/* ==========================================================
   API
   ========================================================== */

async function getEventi() {

    await loadGoogleCharts();

    const table = await querySheet();

    const eventi = [];

    for(let r=0;r<table.getNumberOfRows();r++){

        const evento = parseEvento(table,r);

        if(!evento.pubblicato)
            continue;

        eventi.push(evento);

    }

    eventi.sort((a,b)=>

        new Date(a.dataInizio)-new Date(b.dataInizio)

    );

    return eventi;

}
