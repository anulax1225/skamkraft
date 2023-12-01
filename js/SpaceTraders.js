//© 2023 spacetardes
function listSystem(page, limit){
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/systems',
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
    console.log(response);
  });

  const waypoint = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/systems/X1-QA84/waypoints',
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };
  
  $.ajax(waypoint).done(function (response) {
    console.log(response);
    response.data.forEach(element => {
      GetMarketForWaypoint(element.symbol);
    });
  });


}
function GetMarketForWaypoint(waypoint) {
  const market = {
    async: true,
    crossDomain: true,
    url: `https://api.spacetraders.io/v2/systems/X1-QA84/waypoints/${waypoint}`,
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }

    $.ajax(market).done(function (response) {
      console.log(response);
    });
}

$(document).ready(function(){
  let systems = listSystem("6", "20")
})

let ScreenWidht = window.innerWidht;
let ScreenHeight = window.innerHeight;
let canvas = document.getElementById("monCanevas");
let contexte = canvas.getContext("2d");
var monCanevas = document.getElementById('monCanevas'); // Obtenez une référence vers votre <link>canevas</link>
monCanevas.width = 800;
monCanevas.height = 500;

// Parcourir les rectangles du canevas
contexte.beginPath();
contexte.rect(100, 100, 100, 100);
contexte.fillStyle = "black";
contexte.fill();

//type?MARKET//