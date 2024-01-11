let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiU0hBRE9XIiwidmVyc2lvbiI6InYyLjEuNCIsInJlc2V0X2RhdGUiOiIyMDIzLTEyLTMwIiwiaWF0IjoxNzA0OTYwMjc3LCJzdWIiOiJhZ2VudC10b2tlbiJ9.AOqLimBeSt8TAhvG0uPf_Jyjo6GJGCm8sOKXp5H4vfUpdeR-fk3UTZYzee8Y5dUKEXC7f7IlgDDtMRWIXOEOQXUem2-lQuPiSXPY1M0wWwpUoUV0uVOARvTTIQy_Zo9ZcnwOHCHErEDTeyLtPByW7zb5O7Q9WVuGB0YfG0f4DXHDqVCIszS-qH77t_5oMk8VNl7ZEuI1hP3D0Wh47VpxdBv3aCaNNoF-mPs7f4sfU-YmpIPvRXEKABnv0gOGngaRk73ozGCRMfrcBHKnw4TndxB-tBK0SfwJrKSCpNMvGM8PleDl__GLDaNHNGUSu9GD3lNqxKumbq3dDt4K-vNGBQ";
//décalage
let offset = {
    x: 2,
    y: 2
};
let max = 40;
let min = 35;
let w = 1260;
let h = 870;
const canvas = new fabric.Canvas("canvas",{
    width: w,
    height: h,
    backgroundColor:"rgb(7, 18, 41)",
    renderOnAddRemove: false 
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
let ring = [];

function drawSystem(wayPoints) {
    if(wayPoints) {
        wayPoints.forEach(wayPoint => {
            drawWaypoint(wayPoint);
        });
    }
    drawRing();
}

function drawRing()
{
    for(let i = 0; i < 4; i++){
        let random = Math.random() * (250 - 100) + 100;
        // create a circle
        let circle = new fabric.Circle({
            radius: random, fill: 'transparent', left: (canvas.width/2)-random, top: (canvas.height/2)-random
        });
        circle.set({ strokeWidth: 3, stroke: 'rgba(10,53,66,2)' });
        
        canvas.add(circle);
    }
    for(let i = 0; i < 4; i++){
        let random = Math.random() * (400 - 250) + 250;
        // create a circle
        let circle = new fabric.Circle({
            radius: random, fill: 'transparent', left: (canvas.width/2)-random, top: (canvas.height/2)-random
        });
        circle.set({ strokeWidth: 3, stroke: 'rgba(10,53,66,2)' });
        
        canvas.add(circle);
    }
    for(let i = 0; i < 4; i++){
        let random = Math.random() * (550 - 400) + 400;
        // create a circle
        let circle = new fabric.Circle({
            radius: random, fill: 'transparent', left: (canvas.width/2)-random, top: (canvas.height/2)-random
        });
        circle.set({ strokeWidth: 3, stroke: 'rgba(10,53,66,2)' });
        
        canvas.add(circle);
    }
}

function drawWaypoint(wayPoint) {
    fabric.Image.fromURL('http://127.0.0.1:5500/img/planets/planetproto.png', function(planet) {
        planet.set({left: wayPoint.x/offset.x + w/2});
        planet.set({top: wayPoint.y/offset.y+ h/2});
        planet.set({selectable: false});
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