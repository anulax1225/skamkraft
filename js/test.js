//Copyright © space tarders 2023

'use strict'

const canvas = document.getElementById("canvas");
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
const widhtRect = 6;
const heightRect = 6;
const ctx = canvas.getContext("2d"); 
let planets = [];
let ships=[];
let focusShips;
//lister vaisseau
const token="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiREFOSUVMIiwidmVyc2lvbiI6InYyLjEuNCIsInJlc2V0X2RhdGUiOiIyMDIzLTEyLTAyIiwiaWF0IjoxNzAyMDM4NTcwLCJzdWIiOiJhZ2VudC10b2tlbiJ9.cSeOMFA6by3J3mElGL1xKg0p--C7Dcir6VARIs27QmHqTy2hM-pkJosADSLuo-bXHhXSESLlCcmSzS3BIa4T4v6HI0PH4QFpVNjHBSg7-lt1Hjhm4KkRUnmXdBEAeAXq18cbd6xScfRq0rpRNFzJZg5dRit3fjBZ3MSdmlRVroUs4hJaeSu0HLxD3GGRxXRFtvvHgMuFu6vqE1rq0PxTYQksuhu-GGpheCcIuQHNNIGnd0E2z-xzRAJYrRBjdctMDMv_u-RUeM4A6OwAFEczMYM3yDkZJP4qpVKAtriRUxJVkRsqHFLfEzWx7VikwLijN72gbhVzoIJzKh75-1kcyg"
// Fonction pour obtenir la position de la souris par rapport au centre du canvas
function getMousePosition(e, canvas) {
  let rect = canvas.offset();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
$('#ships').on('click',".btn",function(e){
  focusShips = $(e.target).attr("data-id");
  getShipPosition();
})

const ListMyShips = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/my/ships',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token
    },
  };
  $.ajax(ListMyShips).done(function (response) {
    ships.push(response);
    response.data.forEach(data =>{
      const card=`<button type="button" class="btn btn-primary btn-lg btn-block" data-id="${data.symbol}">${data.symbol}</button>`
      $("#ships").append(card)
    })
  });

//recuperer le systeme ou on est
function getShipPosition(){
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://api.spacetraders.io/v2/my/ships/${focusShips}/nav`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization:token
    }
  };
  
 $.ajax(settings).done(function (response) {
  console.log(ships)
    planets.forEach(planet => {
      if(planet.symbol == response.data.waypointSymbol)
      {
        let xPlanet=planet.x
        let yPlanet=planet.y
        drawShip(xPlanet,yPlanet)
      }
    })
  });
}


function drawShip(x,y){
  ctx.fillStyle = "rgb(3,67,210)";
  ctx.fillRect(x / 3 + w / 2, y / 3 + h / 2, 10, 10);
}                                       
function getListWaypoint(system, page) {
  return new Promise((resolve, reject) => {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://api.spacetraders.io/v2/systems/${system}/waypoints`,
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      data: {
        limit: 20,
        page: page
      }
    };

    $.ajax(settings).done(function (response) {
      const waypoints = response.data;

      waypoints.forEach(waypoint => {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(waypoint.x / 3 + w / 2, waypoint.y / 3 + h / 2, widhtRect, heightRect);
      });

      resolve(waypoints);
    }).fail(function (error) {
      reject(error);
    });
  });
}

function getAllWaypoints(system) {
  const promises = [];

  for (let i = 1; i < 5; i++) {
    promises.push(getListWaypoint(system, i));
  }
  return Promise.all(promises);
}

function getSystem() {
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/my/agent',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token
    }
  };

  $.ajax(settings).done(function (reponse) {
    let metaSystem = reponse.data.headquarters.split("-");
    getAllWaypoints(metaSystem[0] + "-" + metaSystem[1])
      .then(waypointsArray => {
        planets = [].concat(...waypointsArray);
        console.log('Planets:', planets);
        
      })
      .catch(error => {
        console.error(error);
      });
  });
}

getSystem();



function travelToPlanet(planet) {
  const travelShip = {
    async: true,
    crossDomain: true,
    url: `https://api.spacetraders.io/v2/my/ships/${focusShips}/navigate`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token
    },
    processData: false,
    data: JSON.stringify({
      waypointSymbol: planet.symbol
    })
  };

  $.ajax(travelShip).done(function (response) {
    alert(`Voyage vers ${planet.symbol} en cours...`);
  }).fail(function (error) {
    alert(error.responseJSON.error.message);
  });
}

// Événement de clic sur le canvas
$('#canvas').on('click', function (e) {
  const mousePosition = getMousePosition(e, $('#canvas'));
  checkClickedPlanet(mousePosition);
});

 // Fonction pour vérifier si une planète a été cliquée
function checkClickedPlanet(mousePosition) {
  console.log(mousePosition.x)
  planets.forEach(waypoint => {
    // Vérifier si la position de la souris est à l'intérieur de la zone de la planète
    if (
      mousePosition.x >= waypoint.x / 3 + w / 2 &&
      mousePosition.x <= waypoint.x / 3 + w / 2 + widhtRect &&
      mousePosition.y >= waypoint.y / 3 + h / 2 &&
      mousePosition.y <= waypoint.y / 3 + h / 2 + heightRect

    ) {
      const confirmation = confirm(`Voulez-vous voyager vers ${waypoint.symbol}?`);
      if (confirmation) {
          travelToPlanet(waypoint);
      } else {
        alert('Voyage annulé.');
      }
    }
  });
}


