/* © 2023 Entreprise SpaceTarders */
'use strict'
let agents = [];
                                          
// ------------------- Create Agent -------------------

function createAgent(faction, symbol){
  const data = {faction: faction, symbol: symbol}
  const settings = {
   async: true,
   crossDomain: true,
   url: 'https://api.spacetraders.io/v2/register',
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   },
   processData: false,
   data: JSON.stringify(data)
 };
  
 $.ajax(settings).done(function (response) {
  console.log(response.data);
   return response.data;
 });
}
  

// ------------------- Get Agent -------------------


// ------------------- List Agent (Leaderboard) -------------------

function sortAgentByCredits(a1, a2) {
  if(a1.credits < a2.credits)
    return -1
  if(a1.credits > a2.credits)
    return 1
  return 0  
}

var meta = null
function listAgent(page, limit = 20, totalPg = 1){
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/agents',
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
    data : {
      page: page,
      limit: limit
    },
    success: function(response) {
      meta = response.meta
      agents = agents.concat(response.data);
      console.log(agents)
      console.log("Actioni")
      console.log(meta)
      
      if (response.meta.page == totalPg) drawAgents();
      else {  
      page++
      sleep(10000, page);
      }
    },
    error: function(response) {
      drawAgents();
    }
  };
  $.ajax(settings);
}

function sleep(ms, page) {
  console.log(page, "Page Sleep :")
  return new Promise(() => setTimeout(listAgent(page), ms));
}

async function getAllAgents() {
  const limit = 20
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/agents',
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
    data : {
      page: 1,
      limit: limit
    },
    success: function(response) {
      const totalPg = Math.ceil(response.meta.total / limit);
      listAgent(1, limit, totalPg)
    }
  };
  $.ajax(settings);
}

function drawAgents() {
  $(".leaderboard").html("");
  agents.sort(sortAgentByCredits);
  agents.reverse();
  let i = 1;
  agents.forEach(agent => {
    $(".leaderboard").append(`
    <article>
      <p class="elem num">${i}.</p>
      <p class="elem symbol">${agent.symbol} : </p>
      <p class="elem credits">${agent.credits}</p>
      <p class="elem headquarters">${agent.headquarters}</p>
      <p class="elem faction">${agent.startingFaction}</p>
      <p class="elem ships>${agent.shipCount}</p>
    </article>
    `);
    i++
  });
}

$(document).ready(function() {
  $(".btn-test").on("click", () => {
    getAllAgents();
  });
});