import { My } from "../skama_code/api/agent.js";
import login from "./login.js";
import reg from "./reg.js";
import home from "./home.js";
import { system } from "./systems.js";

function init_menu(temp_engine) {
    temp_engine.add_event("#reg-link", "click", () => {
        reg(temp_engine);
    });
    temp_engine.add_event("#login-link", "click", () => {
        login(temp_engine);
    });
    temp_engine.add_event("#systems-link", "click", () => {
        system("X1-TT23", temp_engine);
    })
    temp_engine.add_event(".nav-brand", "click", () => {
        home(temp_engine);
    });
}

function loged_links() {
    $(".nav-links").prepend(`
        <li class="nav-link smooth" id="contracts-link">Contracts</li>
        <li class="nav-link smooth" id="ships-link">Ships</li>
    `);
}

function show_stats() {
    $(".stats").html(`
        <p>Agent name : ${My.agent.name}</p>
        <p>Credits : ${My.agent.credits}</p>
        <p>Ships : ${My.agent.ships_cpt}</p>
        <p>Faction : ${My.agent.faction}</p>
        <p>HQ : ${My.agent.hq}</p>
    `);
}

export default function menu_mod(temp_engine) {
    init_menu(temp_engine);
    if(My.agent) {
        show_stats();
        loged_links();
    }
}