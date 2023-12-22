import { PlanetBuilder } from "../skama_code/api/planet.js";
import menu_mod from "./menu_mod.js"

export function systems(temp_engine) {

}

export function system(system, temp_engine) {
    temp_engine.after_render((temp_engine) => {
        $("#sys-name").text(system);
        menu_mod(temp_engine);
    });
    temp_engine.render("templates/systems/system.html");

}