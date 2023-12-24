import { PlanetBuilder } from "../skama_code/api/planet.js";
import { Position } from "../skama_code/commun/position.js";
import menu_mod from "./menu_mod.js"

let canvas; 

let offset = {
    x: 2,
    y: 2
};
let max = 40;
let w = 1200;
let h = 600;

function animate() {
    canvas.renderAll();
    setTimeout(animate, 1000);
}

function draw_planet(planet) {
    let shadow = new fabric.Shadow({
        color: "white",
        blur: 5,
        offsetX: 0,
        offsetY: 0,
    });

    fabric.Image.fromURL('/assets/planets/planetproto.png', function(img_planet) {
        //FABRICJS
        img_planet.set({
            selectable: false,
            shadow: shadow,
            left: planet.position.x/offset.x + w/2,
            top: planet.position.y/offset.y+ h/2,
            name: planet.name,
            type: planet.type
        });
        canvas.add(img_planet);
      });
}

function offsetOrbit(planet) {
    if (planet.orbits) {
        console.log("Orbits");
        let x = Math.floor(Math.random() * max - Math.random() * max);
        let y =  Math.floor(Math.random() * max - Math.random() * max);
        planet.position.move(new Position(x, y));
    }
}

export function system(system, temp_engine) {
    temp_engine.after_render((temp_engine) => {
        $("#sys-name").text(system);
        menu_mod(temp_engine);
        canvas = new fabric.Canvas("canvas",{
            width: w,
            height: h,
            backgroundColor:"rgb(7, 18, 41)",
            renderOnAddRemove: false,
            defaultCursor :'crosshair',
            hoverCursor :'pointer'
        });
        PlanetBuilder.list_all(system, (planets) => {
            planets.forEach(planet => {
                offsetOrbit(planet);
                draw_planet(planet);
            });
            animate();
        });
        canvas.on('mouse:up', (e) => {
            if(e.target.shadow.color == "red"){
                e.target.shadow.color = "white"
            }
            else{
                e.target.shadow.color = "red"
            }
            canvas.renderAll();
        });
    });
    temp_engine.render("templates/systems/system.html");
}