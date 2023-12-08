//Copyright © 2023 Entreprise SpaceTarders
//variables de rotation
let msPrev = window.performance.now()
const fps = 60
const msPerFrame = 1000 / fps
let frames = 0
//variables de tailles de planète
let xxl = 20
let xl = 15
let l = 10
let m = 5
let s = 4
let xs = 3 
let max = 40;
let min = 35;
//jeton d'agent
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUFJSUk9VVCIsInZlcnNpb24iOiJ2Mi4xLjQiLCJyZXNldF9kYXRlIjoiMjAyMy0xMi0wMiIsImlhdCI6MTcwMjAzODIwOCwic3ViIjoiYWdlbnQtdG9rZW4ifQ.iCm_0x9shooAE7028tBHw-p8NAXf8_EWBZl-wnqIpMIIRCe8A6rzEkaKnX-1OORBh31YQTekSOLdP5_FnA0AEP2KP00YzGEZWQBxSTndkpivtcS6X-arc4F6yJGvcLfT1m3ZD47LGylTELR3I-sXomX2Va8_13oN6kdDJyXpVWFe5OIC01bP_cwHpjztUTO-8ASPJ_8cLZH6GTSAzy5ozF1teTEdfq93s2i9oTPhynQKogdzaXAUIkAXv7hYv5XUbevorRaCfTl52CU7WK5__3org5ardHuITmbl0QyHYIWtkbpcZLcawfEGG0EK66iqwefdXIkTeWC3T1b_ERShMw";
//décalage
let offset = {
    x: 2,
    y: 2
};
//Instanciation du canevas
const canvas = document.getElementById("canvas");
canvas.style="width:100%;height:100vh;"
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight; 
const ctx = canvas.getContext("2d");
let wayPoints = null
//Initialisation du jeu
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
//Récuperer l'agent
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
//Récuperer les planètes
function getWayPoint(wayPoint) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.spacetraders.io/v2/systems/systemSymbol/waypoints/${wayPoint}`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
};
//Récuperer le système
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
        response.data.waypoints.forEach((waypoint) => {
            waypoint.rotation = 0
            if (waypoint.orbits) {
                let x = Math.floor(Math.random() * max - Math.random() * max);
                let y =  Math.floor(Math.random() * max - Math.random() * max);
                waypoint.x += x > 0 ? x + min : x - min;
                waypoint.y += y > 0 ? y + min : y - min;
            }
        })
        wayPoints = response.data.waypoints;
    });
}
// function drawBackground(){
//     // Create gradient
//     var grd = ctx.createRadialGradient(650, 450, 5, 600, 450, 550);
//     grd.addColorStop(0, "rgb(15, 38, 88)");
//     grd.addColorStop(1, "rgb(13, 7, 46)");
//     // Fill with gradient
//     ctx.fillStyle = grd;
//     ctx.fillRect(0, 0, w, h);
//     ctx.clearRect(0, 0, w, h);
// }

//dessiner le système
function drawSystem() {
    window.requestAnimationFrame(drawSystem)
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0, 0, w, h);
    const msNow = window.performance.now()
    const msPassed = msNow - msPrev
  
    if (msPassed < msPerFrame) return
  
    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime
  
    frames++
    if(wayPoints) {
    wayPoints.forEach(wayPoint => {
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
                    wayPoint.rotation += Math.PI / 50
                    drawWaypointPolygone(wayPoint,ctx, w/2, h/2, 'rgb(67, 0, 250)', 5, xl) //violet
                    break;
                //ASTÉROÏDE
                case "ASTEROID":
                    wayPoint.rotation += Math.PI / 200
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
}
//dessiner un cercle
function drawWaypointCircle(wayPoint, ctx, w, h, color, radius) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(wayPoint.x/offset.x + w, wayPoint.y/offset.y + h, radius, 0, 2 * Math.PI);
    ctx.fill()
}
//dessiner une forme polygonale
function drawWaypointPolygone(wayPoint, ctx, w, h, color, nbCote, radius){
    let numberOfSides = nbCote;
   	let x = wayPoint.x/offset.x + w;
    let y = wayPoint.y/offset.y + h;
	let angle = 2*Math.PI/numberOfSides;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo (x +  radius*Math.cos(wayPoint.rotation + 0), y +  radius*Math.sin(wayPoint.rotation + 0));          
 		for (let i = 0; i < numberOfSides; i++) {
			 ctx.lineTo (x + radius*Math.cos(wayPoint.rotation + (i * angle)), y + radius*Math.sin(wayPoint.rotation +(i * angle)));
		}
 	ctx.fill();
}

drawSystem();
getAgent();