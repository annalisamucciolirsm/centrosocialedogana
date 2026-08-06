/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   Data Layer v6
   Static JSON + Date Fix
   ========================================================== */

"use strict";


const DATA_URL = "data/data.json";


let DATABASE = null;



/* ==========================================================
   CARICAMENTO DATABASE
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
   NORMALIZZAZIONE DATE
   ========================================================== */


function normalizzaData(data){


    if(!data){

        return null;

    }



    const d =
        new Date(data);



    return new Date(
        d.getTime()
        +
        d.getTimezoneOffset()*60000
    );


}







/* ==========================================================
   CONFIG
   ========================================================== */


async function getConfig(){


    const db =
        await loadDatabase();


    return db.config;


}







/* ==========================================================
   EVENTI
   ========================================================== */


async function getEventi(){


    const db =
        await loadDatabase();



    return db.eventi


        .filter(evento=>{


            return evento.visibilita
            ===
            "Pubblico";


        })


        .sort((a,b)=>{


            return (

                normalizzaData(
                    a.dataInizio
                )
                -
                normalizzaData(
                    b.dataInizio
                )

            );


        });


}





async function getEvento(slug){


    const eventi =
        await getEventi();



    return eventi.find(evento=>{


        return evento.slug
        ===
        slug;


    });



}







/* ==========================================================
   CONTENUTI
   ========================================================== */


async function getContenuti(){


    const db =
        await loadDatabase();


    return db.contenuti;


}





async function getContenuto(slug){


    const contenuti =
        await getContenuti();



    return contenuti.find(contenuto=>{


        return contenuto.slug
        ===
        slug;


    });


}






/* ==========================================================
   PERSONE
   ========================================================== */


async function getPersone(){


    const db =
        await loadDatabase();


    return db.persone;


}




async function getPersona(id){


    const persone =
        await getPersone();



    return persone.find(persona=>{


        return persona.id
        ===
        id;


    });


}







/* ==========================================================
   LUOGHI
   ========================================================== */


async function getLuoghi(){


    const db =
        await loadDatabase();


    return db.luoghi;


}





async function getLuogo(id){


    const luoghi =
        await getLuoghi();



    return luoghi.find(luogo=>{


        return luogo.id
        ===
        id;


    });


}







/* ==========================================================
   FORMATTAZIONE DATE PUBBLICHE
   ========================================================== */


function formattaData(inizio,fine){


    const mesi=[

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



    if(!inizio){

        return "";

    }



    const d1 =
        normalizzaData(inizio);



    if(!d1){

        return "";

    }



    if(fine){


        const d2 =
            normalizzaData(fine);



        if(

            d1.getMonth()
            ===
            d2.getMonth()

        ){

            return (

                d1.getDate()
                +
                "–"
                +
                d2.getDate()
                +
                " "
                +
                mesi[
                    d1.getMonth()
                ]

            );

        }



        return (

            d1.getDate()
            +
            " "
            +
            mesi[
                d1.getMonth()
            ]
            +
            " – "
            +
            d2.getDate()
            +
            " "
            +
            mesi[
                d2.getMonth()
            ]

        );


    }



    return (

        d1.getDate()
        +
        " "
        +
        mesi[
            d1.getMonth()
        ]

    );


}
