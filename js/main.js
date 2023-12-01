//Copyright © 2023 Entreprise SpaceTarders
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQk9VRkZPTjM4IiwidmVyc2lvbiI6InYyLjEuMiIsInJlc2V0X2RhdGUiOiIyMDIzLTExLTE4IiwiaWF0IjoxNzAwODI5NjE2LCJzdWIiOiJhZ2VudC10b2tlbiJ9.Oh-ecWSm0hOcSHfsngFdPN6C20OkHzqIfhOS3fSb2NXIy6v3ZqlN1C6BDVbz6080FaYv3zcmPVXwpa7igfqC05iVGNvcP3XitzcrmtUlxNUd2g1ohndSir8RduI0qso9ZSNOYaMGm7HEp4lH7OVU7cr45Msx92SinpjFi802X0CGmZtT5eli1szHcrol6Lw6KgN_rBJ-TmJayLylpDVL5I7koxsXLj8IhWTryExF4euiTIS_flDSiEpomPA3iWK-ytyjAj8URaLm9vAZQa-IxjuznS2N5F6WM0Wzi1l6JW47k8MM13spKwXLqAWhTRDoo-jdjLmH8faMPDgCxO3yfw";
let offset = {
    x: 2,
    y: 2
};
function initGame() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.spacetraders.io/v2/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        processData: false,
        data: '{\n  "faction": "COSMIC",\n  "symbol": "ANNNNulax1225",\n  "email": ""\n}'
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function getAgent() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.spacetraders.io/v2/my/agent',
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
        }
    };
    $.ajax(settings).done(function (reponse) {
        $('.main-window').prepend(`
        <article class="agent-card">
            <p class="account">${reponse.data.accountId}</p>
            <p class="symbol">${reponse.data.symbol}</p>
            <p class="headquarters">${reponse.data.headquarters}</p>
            <p class="credits">${reponse.data.credits}</p>
            <p class="startingFaction">${reponse.data.startingFaction}</p>
            <p class="shipCount">${reponse.data.shipCount}</p>
        </article>
        `);
        let metaSystem = reponse.data.headquarters.split("-");
        getSystem(metaSystem[0] + "-" + metaSystem[1]);
    });
}

function getWayPoint(wayPoint) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.spacetraders.io/v2/systems/systemSymbol/waypoints/waypointSymbol`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
};

function getSystem(system) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.spacetraders.io/v2/systems/${system}`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };
    
      
    $.ajax(settings).done(function (response) {
        drawSystem(response.data.waypoints);
    });
}

function drawSystem(wayPoints) {
    const canvas = document.getElementById("canvas");
    canvas.style="width:100%;height:100vh;"
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight; 
    let xxl = 20
    let xl = 15
    let l = 10
    let m = 5
    let s = 4
    let xs = 3 
    let max = 40;
    let min = 35;
    const ctx = canvas.getContext("2d");
    wayPoints.forEach(wayPoint => {
        if (wayPoint.orbits) {
            let x = Math.floor(Math.random() * max - Math.random() * max);
            let y =  Math.floor(Math.random() * max - Math.random() * max);
            wayPoint.x += x > 0 ? x + min : x - min;
            wayPoint.y += y > 0 ? y + min : y - min;
        }
        switch (wayPoint.type) {
            //PLANÈTE
            case "PLANET":
                //QG
                if(wayPoint.x/offset.x + w  == 0 && wayPoint.y/offset.y + h == 0){
                    drawWaypointCircle(wayPoint, ctx, w/2, h/2, 'rgb(255, 255, 0)', xxl); //jaune clair
                }
                else{
                    drawWaypointCircle(wayPoint, ctx, w/2, h/2, 'rgb(6, 218, 52)', m); //vert clair
                }
                break;
            //PLANÈTE GAZEUSE
            case "GAS_GIANT": 
                drawWaypointCircle(wayPoint, ctx, w/2, h/2, 'rgb(255, 174, 0)', l); //orange clair
                break;
            //LUNE
            case "MOON":
                drawWaypointCircle(wayPoint,ctx, w/2, h/2, 'rgb(255, 255, 255)', xs) //blanc
                break;
            //STATION EN ORBITE
            case "ORBITAL_STATION":
                drawWaypointPolygone(wayPoint,ctx, w/2, h/2, 'rgb(0, 153, 255)', 4, s) //bleu clair
                break;
            //PORTAIL
            case "JUMP_GATE":
                drawWaypointPolygone(wayPoint,ctx, w/2, h/2, 'rgb(67, 0, 250)', 5, xl) //violet
                break;
            //ASTÉROÏDE
            case "ASTEROID":
                drawWaypointPolygone(wayPoint,ctx, w/2, h/2, 'rgb(163, 163, 163)', 5, m) //bleu clair
                break;
            case "ASTEROID_FIELD":
            case "ASTEROID_BASE":
            case "ENGINEERED_ASTEROID":     
                drawWaypointCircle(wayPoint,ctx, w/2, h/2, 'rgb(255, 0, 255)', m) //jaune
                break;
            //NEBULEUSE
            case "NEBULA": 
                drawWaypointCircle(wayPoint,ctx, w/2, h/2, 'rgb(67, 0, 250)', m) //violet fluo
                break; 
            //CHAMP DE DÉBRIS
            case "DEBRIS_FIELD":
                drawWaypointCircle(wayPoint,ctx, w/2, h/2, 'rgb(107, 106, 143)', m) //gris/bleu 
                break;
            //PUIT DE GRAVITÉ
            case "GRAVITY_WELL":
            case "ARTIFICIAL_GRAVITY_WELL":    
                drawWaypointCircle(wayPoint,ctx, w/2, h/2, 'rgb()') //
                break;
            //STATION ESSENCE
            case "FUEL_STATION":
                drawWaypointPolygone(wayPoint,ctx, w/2, h/2, 'rgb(255, 0, 0)', 4, m) //rouge
                break;    
        }
    });
}
function drawWaypointCircle(wayPoint, ctx, w, h, color, radius) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(wayPoint.x/offset.x + w, wayPoint.y/offset.y + h, radius, 0, 2 * Math.PI);
    ctx.fill()
}
function drawWaypointPolygone(wayPoint, ctx, w, h, color, nbCote, radius){
    let numberOfSides = nbCote;
   	let x = wayPoint.x/offset.x + w;
    let y = wayPoint.y/offset.y + h;
	let angle = 2*Math.PI/numberOfSides;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo (x +  radius*Math.cos(0), y +  radius*Math.sin(0));          
 		for (let i = 1; i <= numberOfSides; i++) {
			 ctx.lineTo (x + radius*Math.cos(i * angle), y + radius*Math.sin(i * angle));
		}
 	ctx.fill();
}
// function rotationAnimation(ctx){
//     while(true){
//         ctx.rotate(80*Math.PI /180)

//     }
// }
getAgent();