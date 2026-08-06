/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Data Layer v3
   JSON API
   ========================================================== */

"use strict";


const API_URL =
"https://script.google.com/macros/s/AKfycbzDklNlH4AGyuMfjUg7CfrwsfS7qMNj19S7MWaYcdPmSye4BOjmWdRf0BT9eUt6VflU-A/exec";


/* ==========================================================
   Cache
   ========================================================== */

const CACHE = {};



/* ==========================================================
   Caricamento fogli JSON
   ========================================================== */


async function getSheet(sheet){


    if(CACHE[sheet]){

        return CACHE[sheet];

    }



    const url =
        `${API_URL}?sheet=${encodeURIComponent(sheet)}&t=${Date.now()}`;



    const response =
        await fetch(
            url,
            {
                cache:"no-store"
            }
        );



    if(!response.ok){

        throw new Error(
            "Errore caricamento dati: " + sheet
        );

    }



    const data =
        await response.json();



    CACHE[sheet] = data;



    return data;


}




/* ==========================================================
   Config
   ========================================================== */


async function getConfig(){


    const rows =
        await getSheet("Config");



    const config = {};



    rows.forEach(item=>{


        config[item.chiave] =
            item.valore;



    });



    return config;


}





/* ==========================================================
   Eventi
   ========================================================== */


async function getEventi(){


    const eventi =
        await getSheet("Eventi");



    return eventi

        .filter(evento=>{


            return evento.visibilita === "Pubblico";


        })


        .sort((a,b)=>{


            return new Date(a.dataInizio)
            -
            new Date(b.dataInizio);



        });



}




async function getEvento(slug){


    const eventi =
        await getEventi();



    return eventi.find(evento=>{


        return evento.slug === slug;



    });



}






/* ==========================================================
   Contenuti
   ========================================================== */


async function getContenuti(){


    return await getSheet("Contenuti");


}




async function getContenuto(slug){


    const contenuti =
        await getContenuti();



    return contenuti.find(contenuto=>{


        return contenuto.slug === slug;



    });



}






/* ==========================================================
   Persone
   ========================================================== */


async function getPersone(){


    return await getSheet("Persone");


}




async function getPersona(id){


    const persone =
        await getPersone();



    return persone.find(persona=>{


        return persona.id === id;



    });



}






/* ==========================================================
   Luoghi
   ========================================================== */


async function getLuoghi(){


    return await getSheet("Luoghi");


}




async function getLuogo(id){


    const luoghi =
        await getLuoghi();



    return luoghi.find(luogo=>{


        return luogo.id === id;



    });



}
