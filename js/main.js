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
function listAgent(page, limit = 20){
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
      console.log("Actioni")
      if (response.meta.page == page) drawAgents();
      else setTimeout(10000, listAgent(page, limit));
    }
  };
  $.ajax(settings);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
      meta = response.meta
      const total = Math.ceil(meta.total / limit);
      listAgent(1, limit)
    }
  };
  $.ajax(settings);
}

function drawAgents() {
  $(".leaderboard").html("");
  agents.sort(sortAgentByCredits);
  agents.reverse();
  agents.forEach(agent => {
    $(".leaderboard").append(`
    <p>${agent.credits}</p>
    <p>${agent.symbol}</p>
    <p>${agent.headquarters}</p>
    <p>${agent.startingFaction}</p>
    <p>${agent.shipCount}</p>
    `);
  });
}

$(document).ready(function() {
  $(".btn-test").on("click", () => {
    getAllAgents();
  });
});