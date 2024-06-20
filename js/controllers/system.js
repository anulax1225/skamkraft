import menu_mod from "./menu_mod.js";
import home from "./home.js";
import { CanvasRenderer } from "../skama_code/ui/canvas_render.js";
import { SystemBuilder } from "../skama_code/api/system.js"


function get_img_from_type(planet)
{
    switch(planet.type)
    {
        case "PLANET":
            return ["planetproto.png"];
        case "GAS_GIANT": 
            return [];
        case "MOON":
            return [];
        case "ORBITAL_STATION":
            return [];
        case "JUMP_GATE":
            return ["jumpgate.png"];
        case "ASTEROID_FIELD":
            return [];
        case "ASTEROID":
            return ["asteroid1.png", "asteroid2.png", "asteroid3.png", "asteroid4.png"];
        case "ENGINEERED_ASTEROID":
            return [];
        case "ASTEROID_BASE":
            return [];
        case "NEBULA":
            return [];
        case "DEBRIS_FIELD":
            return [];
        case "GRAVITY_WELL":
            return [];
        case "ARTIFICIAL_GRAVITY_WELL":
            return [];
        case "FUEL_STATION":
            return [];
        case _:
            return [];
    }
}

export default function system(temp_engine, sys_name) {
  temp_engine.after_render(() => {
    $("body").css("background-image", "url('/assets/img/background.png')")

    let canvas = new CanvasRenderer("sys-canvas", 1200, 700);
    SystemBuilder.get(sys_name, (system) => {
        system.list_all_planets((planets) => {
            canvas.clean();
            planets.forEach((planet) => {
                let urls = get_img_from_type(planet);
                if(urls.length)
                {
                    canvas.obj_from_img("assets/planets/" + urls[Math.floor(Math.random() * urls.length)], canvas.rel_pos(planet.position), {
                        selectable: true,
                        name: planet.name,
                        update: null,
                    });
                }
            });
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