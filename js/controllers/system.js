import menu_mod from "./menu_mod.js";
import home from "./home.js";
import { CanvasRenderer } from "../skama_code/ui/canvas_render.js";
import { SystemBuilder } from "../skama_code/api/system.js"
import { Position } from "../skama_code/commun/position.js";


function get_img_from_type(planet)
{
    switch(planet.type)
    {
        case "PLANET":
            return ["PLANET.png"];
        case "GAS_GIANT": 
            return ["GAS_GIANT.png"];
        case "MOON":
            return ["MOON.png"];
        case "ORBITAL_STATION":
            return ["ORBITAL_STATION.png"];
        case "JUMP_GATE":
            return ["jumpgate.png"];
        case "ASTEROID_FIELD":
            return ["ASTEROID_FIELD.png"];
        case "ASTEROID":
            return ["asteroid1.png", "asteroid2.png", "asteroid3.png", "asteroid4.png"];
        case "ENGINEERED_ASTEROID":
            return ["ENGINEERED_ASTEROID.png"];
        case "ASTEROID_BASE":
            return ["ASTEROID_BASE.png"];
        case "NEBULA":
            return [];
        case "DEBRIS_FIELD":
            return [];
        case "GRAVITY_WELL":
            return ["GRAVITY_WELL.png"];
        case "ARTIFICIAL_GRAVITY_WELL":
            return ["ARTIFICAL_GRAVITY_WELL.png"];
        case "FUEL_STATION":
            return ["FUEL_STATION.png"];
        case _:
            return [];
    }
}

export default function system(temp_engine, sys_name) {
    temp_engine.after_render(() => {
            $("body").css("background-image", "url('/assets/planets/backgroundcanvas.png')")
            let canvas = new CanvasRenderer("sys-canvas", 1200, 700);
            canvas.resize((window.innerWidth/10)*9, (window.innerHeight/5)*4);
            SystemBuilder.get(sys_name, (system) => {
                system.list_all_planets((planets) => {
                    canvas.clean();
                    console.log(planets)
                    planets.forEach((planet) => {
                        let urls = get_img_from_type(planet);
                        if(urls.length)
                        {
                            let url = urls[Math.floor(Math.random() * urls.length)];
                            console.log(url)
                            canvas.obj_from_img("assets/planets/" + url, canvas.canvas_pos(planet.position), {
                                selectable: false,
                                name: planet.name,
                                update: null,
                            });
                        }
                    });
                    canvas.zoom(new Position(0, 0), 0.5);
                }, true);

                canvas.on("mouse:wheel", (opt) => {
                    if (opt.e.deltaY < 0)
                    {
                        canvas.zoom(canvas.rel_pos(new Position(opt.e.clientX, opt.e.clientY)), 1.1)
                    } else {
                        canvas.zoom(canvas.rel_pos(new Position(opt.e.clientX, opt.e.clientY)), 0.9090)
                    }
                });

                $(window).on("resize", () => {
                    canvas.resize((window.innerWidth/10)*9, (window.innerHeight/5)*4);
                });

                canvas.start();
                menu_mod(temp_engine, system);
            }, (err) => {
                home(temp_engine);
            });
    });
    temp_engine.render("templates/system/system.html");
}