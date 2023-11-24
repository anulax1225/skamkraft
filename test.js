'use strict'
//lister vaisseau

const token="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiREFOSUVMMTIzNCIsInZlcnNpb24iOiJ2Mi4xLjIiLCJyZXNldF9kYXRlIjoiMjAyMy0xMS0xOCIsImlhdCI6MTcwMDgzMjc4MSwic3ViIjoiYWdlbnQtdG9rZW4ifQ.JIOfLaTzMeV4nrZ4tI8jdwrLyuNiqbMdXvXcNQfr1swHRBoIz39ozF6n33NOA7Zhp6frCXO8lflrDH2BTobOes5e2Q0BqNTj0Xq3MJeCc6QDsywv_doiIenDbf3gY7Aju_gC3z3u0uw0IqLhgxFIurlFgdXhsXX466i71sPrK8PPtGezTqB7_b7umAh3AknAuAaGi5no5VsvhCDJjH_Sb5HNkCYCvkENTm_INY5cprizOXjwYJd_91-b3ChMyJwMKJH9t68_rmDtZrU757sqSpDWE6ugh2auXEQXh3Am-BjBP1W6hlPjrOsxodD4mGYMgX8uYmZMRubIze0eu8FiNA"
$('#canvas').on('click',function(e){
  console.log(getMousePosition(e, $('#canvas')));
  function getMousePosition(e, canvas) {
    let rect = canvas.offset();
    return {
      x: (e.clientX - rect.left) - canvas.width()/2,
      y: (e.clientY - rect.top) - canvas.height()/2 
    };
  } 
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
    console.log(response);
  });

//recuperer le systeme ou on est
  function getSystem() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.spacetraders.io/v2/my/agent',
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization:token
        }
    };
    $.ajax(settings).done(function (reponse) {
  let metaSystem = reponse.data.headquarters.split("-");
  getListWaypoint(metaSystem[0] + "-" + metaSystem[1]);
  
});
}
getSystem();

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
            limit:20,
            page:1
        }
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response);
        let waypoint = "X1-DZ90-EZ5C"
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
function clickTest(MouseX,MouseY){
  console.log(MouseX);
  console.log(MouseY);
}
