/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Data Layer v5
   Static JSON
   ========================================================== */

"use strict";


const DATA_URL = "data/data.json";


let DATABASE = null;



/* ==========================================================
   Carica database
   ========================================================== */


async function loadDatabase(){


    if(DATABASE){

        return DATABASE;

    }



    const response =
        await fetch(
            DATA_URL,
            {
                cache:"no-store"
            }
        );



    if(!response.ok){

        throw new Error(
            "Impossibile caricare data.json"
        );

    }



    DATABASE =
        await response.json();



    return DATABASE;

}






/* ==========================================================
   Config
   ========================================================== */


async function getConfig(){

    const db =
        await loadDatabase();

    return db.config;

}





/* ==========================================================
   Eventi
   ========================================================== */


async function getEventi(){

    const db =
        await loadDatabase();


    return db.eventi

        .filter(evento =>

            evento.visibilita === "Pubblico"

        )

        .sort((a,b)=>

            new Date(a.dataInizio)
            -
            new Date(b.dataInizio)

        );

}





async function getEvento(slug){

    const eventi =
        await getEventi();


    return eventi.find(evento =>

        evento.slug === slug

    );

}





/* ==========================================================
   Contenuti
   ========================================================== */


async function getContenuti(){

    const db =
        await loadDatabase();


    return db.contenuti;

}





async function getContenuto(slug){

    const contenuti =
        await getContenuti();


    return contenuti.find(contenuto =>

        contenuto.slug === slug

    );

}






/* ==========================================================
   Persone
   ========================================================== */


async function getPersone(){

    const db =
        await loadDatabase();


    return db.persone;

}





async function getPersona(id){

    const persone =
        await getPersone();


    return persone.find(persona =>

        persona.id === id

    );

}






/* ==========================================================
   Luoghi
   ========================================================== */


async function getLuoghi(){

    const db =
        await loadDatabase();


    return db.luoghi;

}





async function getLuogo(id){

    const luoghi =
        await getLuoghi();


    return luoghi.find(luogo =>

        luogo.id === id

    );

}
