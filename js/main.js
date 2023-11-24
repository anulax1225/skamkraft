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
let agent = createAgent("COSMIC","Fewsgereb55");
})
  

// ------------------- Get Agent -------------------


