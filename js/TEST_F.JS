let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQ0hBRE9XIiwidmVyc2lvbiI6InYyLjEuNSIsInJlc2V0X2RhdGUiOiIyMDI0LTAxLTEzIiwiaWF0IjoxNzA2MjU0MjAzLCJzdWIiOiJhZ2VudC10b2tlbiJ9.ceCEMlAUIr4dxU1BWlpQwzyh8GxaphPM5qyFhV0qE5YX-p26x0AZ7BHdJKVpbIYENSIMks3sTDLfDu7bcHAOzCxSpR9XhNmJ1s3g84J4Sn6NaVHVPFalJiW8K3Cg3t7H6CPNG5FMpwjzGzn0M0EjSMS6EabIDC2wpPXvfktHMR3Z-ISflobnkkCwaNTmQJtumSZfDuwdkUnH_zwfedfqVGpBCAUIzlNcwB1ha19QXfx5h4lVt7aefPU2znEIMwBtsr1vx1uad0TqhOXF8x2BI_lWAQIeGT_dnPbhhoF0jBQEy9zNQXkZSeS0682j_D_yiVwnNlByZoI3VF0KesKB3A";
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
            drawRingWaypoint(wayPoint);
        });
        wayPoints.forEach(wayPoint => {
            drawWaypoint(wayPoint);
        })
    }
}

function drawRingWaypoint(wayPoint)
{
    let distanceX = wayPoint.x / offset.x;
    let distanceY = wayPoint.y / offset.y;
    let pythagoreX = distanceX * distanceX;
    let pythagoreY = Math.pow(distanceY, 2);
    console.log(pythagoreX, pythagoreY)
    //pythagoreX = pythagoreX/offset.x;
    //pythagoreY = pythagoreY/offset.y;
    let pythagorePlanet = Math.sqrt(pythagoreX + pythagoreY);
    console.log(pythagorePlanet);

    let circle = new fabric.Circle({
        radius: pythagorePlanet, fill: 'transparent', left: (canvas.width/2) - pythagorePlanet, top: (canvas.height/2)-pythagorePlanet
    });
    circle.set({ strokeWidth: 0.5, stroke: 'rgba(10,53,66,2)', selectable: false });
    
    canvas.add(circle);
}

function drawRing()
{
    for(let i = 0; i < 4; i++){
        let random = Math.random() * (250 - 100) + 100;
        // create a circle
        console.log(canvas.width)
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
    let radius = 5;
    let circle = new fabric.Circle({
        radius: radius, fill: 'white', left: (wayPoint.x/2 + canvas.width/2) -radius, top: (wayPoint.y/2 + canvas.height/2)-radius
    });
    circle.set({ strokeWidth: 0.5, stroke: 'rgba(255,255,255,255)', selectable: false});
    canvas.add(circle);
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