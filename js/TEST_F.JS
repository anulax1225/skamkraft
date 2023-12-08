let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUFJSUk9VVCIsInZlcnNpb24iOiJ2Mi4xLjQiLCJyZXNldF9kYXRlIjoiMjAyMy0xMi0wMiIsImlhdCI6MTcwMjAzODIwOCwic3ViIjoiYWdlbnQtdG9rZW4ifQ.iCm_0x9shooAE7028tBHw-p8NAXf8_EWBZl-wnqIpMIIRCe8A6rzEkaKnX-1OORBh31YQTekSOLdP5_FnA0AEP2KP00YzGEZWQBxSTndkpivtcS6X-arc4F6yJGvcLfT1m3ZD47LGylTELR3I-sXomX2Va8_13oN6kdDJyXpVWFe5OIC01bP_cwHpjztUTO-8ASPJ_8cLZH6GTSAzy5ozF1teTEdfq93s2i9oTPhynQKogdzaXAUIkAXv7hYv5XUbevorRaCfTl52CU7WK5__3org5ardHuITmbl0QyHYIWtkbpcZLcawfEGG0EK66iqwefdXIkTeWC3T1b_ERShMw";
//décalage
let offset = {
    x: 2,
    y: 2
};

let max = 40;
let min = 35;
let w = 1260;
let h = 850;
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

function drawSystem(wayPoints) {
    if(wayPoints) {
        wayPoints.forEach(wayPoint => {
            drawWaypointCircle(wayPoint);
        });
    }
}

function drawWaypointCircle(wayPoint) {
    let rect = new fabric.Rect({
        left: wayPoint.x/offset.x + w/2,
        top: wayPoint.y/offset.y + h/2,
        fill: 'white',
        width: 2,
        height: 2,
    });
    wayPoint.rect = rect;
    planets.push(wayPoint);
    canvas.add(rect);
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