'use strict'
/* © 2023 Entreprise SpaceTarders */
import { AgentBuilder } from "./agents.js"
  

// ------------------- Get Agent -------------------


// ------------------- List Agent (Leaderboard) -------------------

function sortAgentByCredits(a1, a2) {
  if(a1.credits < a2.credits)
    return -1
  if(a1.credits > a2.credits)
    return 1
  return 0  
}

function sortAgentByShips(a1, a2) {
  if(a1.shipCount < a2.shipCount)
    return -1
  if(a1.shipCount > a2.shipCount)
    return 1
  return 0  
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
      <p class="elem symbol">${agent.symbol} : </p>
      <p class="elem credits">${agent.credits}</p>
      <p class="elem headquarters">${agent.headquarters}</p>
      <p class="elem faction">${agent.startingFaction}</p>
      <p class="elem ships">${agent.shipCount}</p>
    </article>
    `);
    i++
  });
}

$(document).ready(function() {
  let state = false;
  $(".btn-test").on("click", () => {
    if (!state) AgentBuilder.list_all((agents) => {
        drawAgents(agents, sortAgentByCredits);
        state = false;
    });
    state = true
  });
  $(".btn-test2").on("click", () => {
    if (!state) AgentBuilder.list_all((agents) => {
      drawAgents(agents, sortAgentByShips);
      state = false;
  });
  state = true
  })
});