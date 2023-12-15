let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUEVVU0RPU0FDSEEiLCJ2ZXJzaW9uIjoidjIuMS40IiwicmVzZXRfZGF0ZSI6IjIwMjMtMTItMDIiLCJpYXQiOjE3MDI1Mzk4NjUsInN1YiI6ImFnZW50LXRva2VuIn0.QL4rSruHd8pjNczeZQ3S7gof7TRnwZKqQBvkojUXgmzRrWiDZVw65kt1UBns0zHAhZF-m-bvxfUBik01uIzc-_jSO63ZndquPFmv_UY3HBkVK7UKoSaxAp_NveJsE1TOpTotUChlMd1Sv7RuyeR9fso2eN3-mBEoE5ukWmGVDfnOYefuWORhisqIkh4ti3QpaV-obycZ4XGV2ukqkiNdHqR3MQJR99e2nCEZEsarNKTgm6mgn-qCCNv4xQUGwhNbD5_p-jPqQ088vuFCeZi8j6kf7-fmT5sysBxEA5nvNPDIEL1XMuzs7N66WpiP1uc7I1Ph164m2epV9vmEvzthCw";
//décalage
let offset = {
    x: 2,
    y: 2
};
let max = 40;
let min = 35;
let w = 1260;
let h = 830;

const canvas = new fabric.Canvas("canvas",{
    width: w,
    height: h,
    backgroundColor:"rgb(7, 18, 41)",
    renderOnAddRemove: false,
    defaultCursor :'crosshair',
    hoverCursor :'pointer'
});
canvas.renderAll();
let planets = [];

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
        let metaSystem = reponse.data.headquarters.split("-");
        getSystem(metaSystem[0] + "-" + metaSystem[1]);
    });
}

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
        offsetOrbits(response.data.waypoints);
        drawSystem(response.data.waypoints);
    });
}
function offsetOrbits(waypoints){
    waypoints.forEach((waypoint) => {
        if (waypoint.orbits) {
            let x = Math.floor(Math.random() * max - Math.random() * max);
            let y =  Math.floor(Math.random() * max - Math.random() * max);
            waypoint.orbitaldistance = {
                x: x,
                y: y
            };
            waypoint.rotation = 3;
        }
    });
}
function drawSystem(wayPoints) {
    if(wayPoints) {
        wayPoints.forEach(wayPoint => {
            drawWaypoint(wayPoint);
            //TestPlanetClicked(wayPoint);
        });
    }
}
function drawWaypoint(wayPoint) {
    let shadow = new fabric.Shadow({
        color: "white",
        blur: 5,
        offsetX: 0,
        offsetY: 0,
      });

    fabric.Image.fromURL('http://127.0.0.1:5500/img/planets/planetproto.png', function(planet) {
        //FABRICJS
        planet.set({selectable: false});
        planet.set({shadow: shadow});
        //AJOUT DES PROPRIÉTÉS DES WAYPOINT SUR LES PLANETES
        planet.set({left: wayPoint.x/offset.x + w/2});
        planet.set({top: wayPoint.y/offset.y+ h/2});
        planet.set({name: wayPoint.symbol});
        planet.set({type: wayPoint.type});
        canvas.add(planet);
      });
    planets.push(wayPoint);
}
function movePlanets() {
    planets.forEach(waypoint => {
        if(waypoint.rotation != 0){
        }
    });
}
getAgent();
setTimeout(function animate() {
    movePlanets();
    canvas.renderAll();
    setTimeout(animate, 1000);
}, 10);

canvas.on('mouse:up', function (e) {
    if(e.target.shadow.color == "red"){
        e.target.shadow.color = "white"
    }
    else{
        e.target.shadow.color = "red"
    }
})