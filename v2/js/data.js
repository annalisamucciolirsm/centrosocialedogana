/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Data Layer v2
   ========================================================== */

"use strict";

/* ==========================================================
   Configurazione
   ========================================================== */

const SHEET_ID = "15oL19MUdtAUfe9TupmaeG_aYKLcdo8n6u2QVy5k3WR8";

const SHEETS = {

    config: "Config",
    eventi: "Eventi",
    contenuti: "Contenuti",
    persone: "Persone",
    luoghi: "Luoghi"

};

let chartsReady = false;

/* ==========================================================
   Google Charts
   ========================================================== */

async function loadGoogleCharts(){

    if(chartsReady)
        return;

    await new Promise(resolve=>{

        google.charts.load("current");

        google.charts.setOnLoadCallback(resolve);

    });

    chartsReady=true;

}

/* ==========================================================
   Query
   ========================================================== */

async function querySheet(sheet){

    await loadGoogleCharts();

    return new Promise((resolve,reject)=>{

        const query = new google.visualization.Query(

            `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(sheet)}`

        );

        query.send(response=>{

            if(response.isError()){

                reject(response.getMessage());

                return;

            }

            resolve(response.getDataTable());

        });

    });

}

/* ==========================================================
   Helpers
   ========================================================== */

function tableToObjects(table){

    const headers=[];

    for(let c=0;c<table.getNumberOfColumns();c++){

        headers.push(table.getColumnLabel(c));

    }

    const rows=[];

    for(let r=0;r<table.getNumberOfRows();r++){

        const obj={};

        headers.forEach((key,index)=>{

            obj[key]=table.getValue(r,index);

        });

        rows.push(obj);

    }

    return rows;

}

/* ==========================================================
   Config
   ========================================================== */

async function getConfig(){

    const table = await querySheet(SHEETS.config);

    const rows = tableToObjects(table);

    const config={};

    rows.forEach(r=>{

        config[r.Chiave]=r.Valore;

    });

    return config;

}

/* ==========================================================
   Eventi
   ========================================================== */

async function getEventi(){

    const table = await querySheet(SHEETS.eventi);

    let eventi = tableToObjects(table);

    eventi = eventi.filter(e=>e["Visibilità"]==="Pubblico");

    eventi.sort((a,b)=>

        new Date(a["Data inizio"])-

        new Date(b["Data inizio"])

    );

    return eventi;

}

async function getEvento(slug){

    const eventi = await getEventi();

    return eventi.find(

        e=>e.Slug===slug

    );

}

/* ==========================================================
   Contenuti
   ========================================================== */

async function getContenuti(){

    const table = await querySheet(SHEETS.contenuti);

    return tableToObjects(table);

}

async function getContenuto(slug){

    const contenuti = await getContenuti();

    return contenuti.find(

        c=>c.Slug===slug

    );

}

/* ==========================================================
   Persone
   ========================================================== */

async function getPersone(){

    const table = await querySheet(SHEETS.persone);

    return tableToObjects(table);

}

async function getPersona(id){

    const persone = await getPersone();

    return persone.find(

        p=>p.ID===id

    );

}

/* ==========================================================
   Luoghi
   ========================================================== */

async function getLuoghi(){

    const table = await querySheet(SHEETS.luoghi);

    return tableToObjects(table);

}

async function getLuogo(id){

    const luoghi = await getLuoghi();

    return luoghi.find(

        l=>l.ID===id

    );

}
