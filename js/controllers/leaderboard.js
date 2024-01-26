import menu_mod from "./menu_mod.js";
import { AgentBuilder } from "../skama_code/api/agent.js";

export default function ldb(temp_engine) {
    temp_engine.after_render((temp_engine) => {
        menu_mod(temp_engine);

        AgentBuilder.list_all((agents) => {
            $(".btn-cred").on("click", () => {
                drawAgents(agents, sortAgentByCredits);
            });

            $(".btn-ship").on("click", () => {
                drawAgents(agents, sortAgentByShips);
            });
        });
        $('.container-ldb').hide()
        $('.btn-deploy').on('click', () => {
            $('.container-ldb').slideToggle()
        })
    });

    temp_engine.render("templates/leaderboard.html");
}

function drawAgents(agents, funcSort) {
    $(".leaderboard").html("");
    agents.sort(funcSort);
    agents.reverse();
    let i = 1;
    agents.forEach((agent) => {
        $(".leaderboard").append(`
      <article>
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
