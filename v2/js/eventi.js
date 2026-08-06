google.charts.load('current');

google.charts.setOnLoadCallback(caricaEventi);

function caricaEventi(){

    const query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/15oL19MUdtAUfe9TupmaeG_aYKLcdo8n6u2QVy5k3WR8/gviz/tq?sheet=Eventi'
    );

    query.send(mostraEventi);

}

function formattaData(inizio,fine){

    const mesi=[
        "GEN","FEB","MAR","APR","MAG","GIU",
        "LUG","AGO","SET","OTT","NOV","DIC"
    ];

    if(!inizio) return "";

    const d1=new Date(inizio);

    if(fine){

        const d2=new Date(fine);

        if(d1.getMonth()==d2.getMonth()){

            return d1.getDate()+"–"+d2.getDate()+" "+mesi[d1.getMonth()];

        }

        return d1.getDate()+" "+mesi[d1.getMonth()]+" – "+d2.getDate()+" "+mesi[d2.getMonth()];

    }

    return d1.getDate()+" "+mesi[d1.getMonth()];

}

function mostraEventi(response){

    if(response.isError()){

        console.error(response.getMessage());

        return;

    }

    const table=response.getDataTable();

    const contenitore=document.getElementById("eventi");

    contenitore.innerHTML="";

    for(let i=0;i<table.getNumberOfRows();i++){

        const attivo=table.getValue(i,12);

        if(attivo!==true) continue;

        const data=table.getValue(i,0);

        const fine=table.getValue(i,1);

        const titolo=table.getValue(i,2);

        const categoria=table.getValue(i,3);

        const slug=table.getValue(i,4);

        contenitore.innerHTML+=`

<article class="evento">

<div class="evento-data">

${formattaData(data,fine)}

</div>

<div class="evento-contenuto">

<h2>

<a href="evento.html?slug=${slug}">

${titolo}

</a>

</h2>

<p>

${categoria}

</p>

</div>

</article>

<hr>

`;

    }

}
