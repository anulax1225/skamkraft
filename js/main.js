'use strict'

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


$(document).ready(function() {
//Let agent = createAgent("COSMIC","agent_bryte");
})
  

// ------------------- Get Agent -------------------


// ------------------- List Agent (Leaderboard) -------------------




function listAgent(page = 1, limit = 20, agents = []){
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
    }
  };


  $.ajax(settings).done(function (response) {
    const agents = response.data
    console.log(response.meta)
    agents.sort((a1, a2) => {
      if(a1.credits < a2.credits)
        return -1
      if(a1.credits > a2.credits)
        return 1
      return 0  
    })
    agents.reverse()
    console.log(agents);
    let nbTour = agents.Length;
    for(i = 0; i < nbTour; i++)
    {
      let agents = listAgent(i, 20, false)
    }
  })
}

$(document).ready(function() {

})
    