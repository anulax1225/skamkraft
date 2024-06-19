import menu_mod from "./menu_mod.js";
import { AgentBuilder } from "../skama_code/api/agent.js";

export default function ldb(temp_engine) {
    temp_engine.after_render((temp_engine) => {
        $("body").css("background-image", "url('/assets/img/background.png')")
        menu_mod(temp_engine);
        let bagents = new AgentBuilder();
        bagents.list_all((agents) => {
            drawAgents(agents, sortAgentByCredits);
        });
    });

    temp_engine.render("templates/leaderboard/leaderboard.html");
}

function drawAgents(agents, funcSort) {
    $(".leaderboard").html("");
    agents.sort(funcSort);
    agents.reverse();
    let i = 1;
    agents.forEach((agent) => {
        $(".leaderboard").append(`
      <article class="player">
        <p class="elem num">${i}.</p>
        <p class="elem symbol">${agent.name} : </p>
        <p class="elem credits">${agent.credits}</p>
        <p class="elem headquarters">${agent.hq}</p>
        <p class="elem faction">${agent.faction}</p>
        <p class="elem ships">${agent.ships_cpt}</p>
      </article>
      `);
        i++
    });
}

function sortAgentByCredits(a1, a2) {
    if (a1.credits < a2.credits)
        return -1
    if (a1.credits > a2.credits)
        return 1
    return 0
}

function sortAgentByShips(a1, a2) {
    if (a1.shipCount < a2.shipCount)
        return -1
    if (a1.shipCount > a2.shipCount)
        return 1
    return 0
}