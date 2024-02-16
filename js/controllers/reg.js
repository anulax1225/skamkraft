import { Auth } from "../skama_code/auth/auth.js";
import { My } from "../skama_code/api/agent.js";
import { Faction } from "../skama_code/api/faction.js"
import home from "./home.js";
import menu_mod from "./menu_mod.js";

export default function reg(temp_engine) {
    let auth = new Auth(true);

    temp_engine.after_render((temp_engine) => {
        menu_mod(temp_engine);
    });

    temp_engine.render(`templates/auth/reg.html`);
}