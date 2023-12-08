//Copyright © space tarders 2023

'use strict'

const canvas = document.getElementById("canvas");
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d"); 
let planets = [];
let ships=[];

//lister vaisseau
const token="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiREFOSUVMIiwidmVyc2lvbiI6InYyLjEuNCIsInJlc2V0X2RhdGUiOiIyMDIzLTEyLTAyIiwiaWF0IjoxNzAyMDM4NTcwLCJzdWIiOiJhZ2VudC10b2tlbiJ9.cSeOMFA6by3J3mElGL1xKg0p--C7Dcir6VARIs27QmHqTy2hM-pkJosADSLuo-bXHhXSESLlCcmSzS3BIa4T4v6HI0PH4QFpVNjHBSg7-lt1Hjhm4KkRUnmXdBEAeAXq18cbd6xScfRq0rpRNFzJZg5dRit3fjBZ3MSdmlRVroUs4hJaeSu0HLxD3GGRxXRFtvvHgMuFu6vqE1rq0PxTYQksuhu-GGpheCcIuQHNNIGnd0E2z-xzRAJYrRBjdctMDMv_u-RUeM4A6OwAFEczMYM3yDkZJP4qpVKAtriRUxJVkRsqHFLfEzWx7VikwLijN72gbhVzoIJzKh75-1kcyg"
// Fonction pour obtenir la position de la souris par rapport au centre du canvas
function getMousePosition(e, canvas) {
  let rect = canvas.offset();
  return {
    x: e.clientX - rect.left - canvas.width() / 2,
    y: e.clientY - rect.top - canvas.height() / 2
  };
}


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
  });

//recuperer le systeme ou on est
function getShipPosition(){
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/my/ships/DANIEL-1/nav',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization:token
    }
  };
  
 $.ajax(settings).done(function (response) {
  console.log(response);
  console.log(planets);

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
        ctx.fillRect(waypoint.x / 3 + w / 2, waypoint.y / 3 + h / 2, 6, 6);
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
        getShipPosition();
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
    url: `https://api.spacetraders.io/v2/my/ships/shipSymbol/navigate`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token
    },
    processData: false,
    data: JSON.stringify({
      destination: planet.symbol
    })
  };

  $.ajax(travelShip).done(function (response) {
    console.log(`Voyage vers ${planet.name} en cours...`);
    console.log(response);
  }).fail(function (error) {
    console.error(`Erreur lors du voyage vers ${planet.name}`);
    console.error(error);
  });
}

// Événement de clic sur le canvas
$('#canvas').on('click', function (e) {
  const mousePosition = getMousePosition(e, $('#canvas'));
  checkClickedPlanet(mousePosition);
});

 // Fonction pour vérifier si une planète a été cliquée
function checkClickedPlanet(mousePosition) {
  console.log('Clicked position:', mousePosition.x, mousePosition.y);

  planets.forEach(waypoint => {
    console.log('Planet position:', waypoint.x / 3 + w / 2, waypoint.y / 3 + h / 2);

    // Vérifier si la position de la souris est à l'intérieur de la zone de la planète
    if (
      mousePosition.x >= waypoint.x / 3 + w / 2 &&
      mousePosition.x <= waypoint.x / 3 + w / 2 + 6 &&
      mousePosition.y >= waypoint.y / 3 + h / 2 &&
      mousePosition.y <= waypoint.y / 3 + h / 2 + 6
    ) {
      const confirmation = confirm(`Voulez-vous voyager vers ${waypoint.name}?`);

      if (confirmation) {
        // Vérifier les conditions de voyage 
        if (conditionsVoyageRemplies(waypoint)) {
          travelToPlanet(waypoint);
        } else {
          alert('Vous ne pouvez pas voyager vers cette planète. Conditions non remplies.');
        }
      } else {
        console.log('Voyage annulé.');
      }
    }
  });
}

function conditionsVoyageRemplies(waypoint) {
  return 0;
}


