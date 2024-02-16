import { SystemBuilder } from "../skama_code/api/system.js";
import menu_mod from "./menu_mod.js"
import system from "./system.js"

let canvas; 
let last_target;

let offset = {
    x: 2,
    y: 2
};
let max = 100;
let w = (window.innerWidth/10)*9;
let h = (window.innerHeight/4)*3;

function animate() {
    canvas.renderAll();
    setTimeout(animate, 1000);
}

function draw_system(system) {
    let shadow = new fabric.Shadow({
        color: "white",
        blur: 5,
        offsetX: 0,
        offsetY: 0,
    });

    fabric.Image.fromURL('/assets/systems/bluesystem.png', function(img_planet) {

        img_planet.set({
            selectable: false,
            scaleX: 0.20,
            scaleY: 0.20,
            shadow: shadow,
            left: system.position.x/offset.x + w/2,
            top: system.position.y/offset.y+ h/2,
            name: system.name,
            type: system.type
        });
        canvas.add(img_planet);
      });
}

export function systems(temp_engine) {
    temp_engine.after_render((temp_engine) => {
        menu_mod(temp_engine);
        canvas = new fabric.Canvas("canvas",{
            width: w,
            height: h,
            backgroundColor:"rgb(7, 18, 41)",
            renderOnAddRemove: false,
            hoverCursor :'pointer'
        });
        SystemBuilder.list_all((systems) => {
                systems.forEach(system => {
                    draw_system(system);
                });
                animate();
            });
        canvas.on('mouse:up', (e) => {
            if (e.target) system(e.target.name, temp_engine);
        });
        $(window).on("resize", () => {
            canvas.setWidth((window.innerWidth/10)*9);
            canvas.setHeight((window.innerHeight/4)*3);
            canvas.renderAll();
        });
        canvas.on("mouse:wheel", (opt) => {
            console.log(opt.e.clientX);
            let scale = 1.1;
            if (opt.e.deltaY < 0) {
                canvas.zoomToPoint(new fabric.Point(opt.e.clientX / canvas.getZoom(), opt.e.clienY / canvas.getZoom()), canvas.getZoom() * scale);
            } else if (opt.e.deltaY > 0) {
                canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / scale);
            }
        });
    });
    temp_engine.render("templates/systems/systems.html");
}