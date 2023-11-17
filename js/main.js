let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQU5OTk5VTEFYMTIyNSIsInZlcnNpb24iOiJ2Mi4xLjEiLCJyZXNldF9kYXRlIjoiMjAyMy0xMS0wNCIsImlhdCI6MTcwMDIyNDU5MSwic3ViIjoiYWdlbnQtdG9rZW4ifQ.r05mWtD5FjC4s6Td-ycmHdzL7C2s75lz3q7OBmWeCqUUZ1ejPsRGQRWJDPmIh1kAqO4D9FFs3GCTPZUn1KsnQ-xmDvsIi_mqC1gJV-Q0irI7gwfsGXbfLaVCXo-Q98C_QWRh-O_xkrbhJkCcvnwdEhZm7FnZ3PL4XXKrG0XNa98JrnmG0qlz0cv8V9Q0sSIwXZbvA9BrhuV8PK7_YzPc6LZuNqgPeKiX_B-tSIHHl6Sr1EzuydnczmuS-xKQnbhmcqnpaCXzQmJr7tA8KLgu70KqpPCvA8AI6PLmBlvPWtZ20RdzezqlBh6S9SrBzQ9R0zr_9RyJxq28ws2jnHpVPw";
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
    const ctx = canvas.getContext("2d");
    wayPoints.forEach(wayPoint => {
        switch (wayPoint.type) {
            //PLANÈTE
            case "PLANET": 
                drawWaypoint(wayPoint, ctx, w/2, h/2, 'rgb(6, 218, 52)'); //vert clair
                break;
            //PLANÈTE GAZEUSE
            case "GAS_GIANT": 
                drawWaypoint(wayPoint, ctx, w/2, h/2, 'rgb(255, 174, 0)'); //orange clair
                break;
            //LUNE
            case "MOON":
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(255, 255, 255)') //blanc
                break;
            //STATION EN ORBITE
            case "ORBITAL_STATION":
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(0, 153, 255)') //bleu clair
                break;
            //PORTAIL
            case "JUMP_GATE":
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(255, 0, 255)') //rose fluo
                break;
            //ASTÉROÏDE
            case "ASTEROID":
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(255, 196, 0)') //jaune
                break;
            case "ASTEROID_FIELD":
            case "ASTEROID_BASE":
            case "ENGINEERED_ASTEROID":     
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(255, 196, 0)') //jaune
                break;
            //NEBULEUSE
            case "NEBULA":
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(119, 0, 255)') //violet fluo
                break; 
            //CHAMP DE DÉBRIS
            case "DEBRIS_FIELD":
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(107, 106, 143)') //gris/bleu 
                break;
            //PUIT DE GRAVITÉ
            case "GRAVITY_WELL":
            case "ARTIFICIAL_GRAVITY_WELL":    
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb()') //
                break;
            //STATION ESSENCE
            case "FUEL_STATION":
                drawWaypoint(wayPoint,ctx, w/2, h/2, 'rgb(255, 0, 0)') //rouge
                break;    
        }
    });
}

function drawWaypoint(wayPoint, ctx, w, h, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(wayPoint.x/offset.x + w, wayPoint.y/offset.y + h, 3, 0, 2 * Math.PI);
    ctx.fill()
}
// function drawWaypointPentagon(wayPoint, ctx, w, h, color){
//     var numberOfSides = 5;
//     var radius=100;
//     var x = 125;
//     var y = 125;
//     var angle = 2*Math.PI/numberOfSides;
//     ctx.beginPath();
//     ctx.translate(x, y);
//     ctx.moveTo(radius, 0);          
//     for (var i=1; i<=numberOfSides; i++) {
//             ctx.lineTo(radius*Math.cos(i * angle), radius*Math.sin(i * angle));
//     }
//     ctx.stroke();
// }

getAgent();
