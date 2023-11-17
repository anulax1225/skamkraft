'use strict'
//lister vaisseau

const token="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiSEFNRE9VTEFITCIsInZlcnNpb24iOiJ2Mi4xLjEiLCJyZXNldF9kYXRlIjoiMjAyMy0xMS0wNCIsImlhdCI6MTcwMDIyNDI3MSwic3ViIjoiYWdlbnQtdG9rZW4ifQ.LNKY3vcOZIjiHUj-Z9z8kgNDqpQgB63u_6ceibfHQX-U1ox2bRjQqlSMnSjvUsXkx1G8qIDQUP9Sl-uuiHNzdtq1TmQD4x6c0nIEPNrP_OUbQSP98JZ2-xrp6h4TfXnK_o8OPqhpbRIH9iklnSrXswUZg6H2Cy78yS4sVaftiq0nBH5TLK4k5sEe5MVvhLiAuPAlNhYHUZdXP-T1y6PmmIim5d-0fwetkuC4Q2PLZp5Qg3b_2Bfy2GIUj4nI9m1e6ukaeuIF6VMYrsDUiBXD7jGrdFj2J2ZBrXKJQdQRfMKcUNpMqKdwM606S8VFDo6QHUxB5Rgi9GHFWGEKEMyBCQ"
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
    console.log(response);
  });

//recuperer le systeme ou on est
getAgent();
  function getAgent() {
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
  getListWaypoint(metaSystem[0] + "-" + metaSystem[1]);
  
});
}
//lister les points du systeme
function getListWaypoint(system) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.spacetraders.io/v2/systems/${system}/waypoints`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        data:{
            limit:1,
            page:5
        }
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response);
        let waypoint = "X1-FH15-EB4C"
        console.log(waypoint)
        travel(waypoint)
    });
}
  
function travel(waypoint)
{
    const travelShip = {
    async: true,
    crossDomain: true,
    url: 'https://api.spacetraders.io/v2/my/ships/shipSymbol/navigate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token
    },
    processData: false,
    data: `{\n  ${waypoint}: "string"\n}`
  };
  
  $.ajax(travelShip).done(function (response) {
    console.log(response);
  });

 
}
 