import { CanvasRenderer } from "../skama_code/rendering/rendering/canvas_render.js";
import menu_mod from "./menu_mod.js";

export default function (temp_engine) {

    temp_engine.after_render((temp_engine) => {
        console.log("test");
        menu_mod(temp_engine);
    });

    temp_engine.render(`templates/systems/systems.html`);
}