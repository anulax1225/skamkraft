'use strict'
import { createAgent, getAgent } from "./agents.js";
import { listSystems, getSystem, listWaypointsInSystem } from "./system.js"
import {getFaction, listFactions} from "./faction.js"
import {getContrat, listContrats} from "./contrat.js";


let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4xMjMiLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDA4MzM2NTgsInN1YiI6ImFnZW50LXRva2VuIn0.SQSgewmJhhOlnk3wst9ND61D6JoAXSW6tZAJhS8c0IxyegVVe7ZkCBCU3tBraxWwEwR6wAnc8iCWzaS5Ir6mHbLhDR5UAaJwBasTMHQN1dXeQGJE83CjhciAyxWUV3iej4M1OD0kzG2uHFicLt9emOlCEbVcroXn2_F4K9kQDRjpoy3KEzGJxJbvWqug9mo5Ejb0WupB0Sim-mWwBmmpbkCx-MbakzZ5tUfUC5h-dAVsUIqnfrr7QCOq3zPrdt7zZzsOXFcwPwE6hbag62J5ROQtPfx1r9w-6pf7-mOOmEYSWHbArbls9f71o9Wf6A1qv3yPWGVjr5qQ1EFo_H-x_g";
let offset = {
    x: 10,
    y: 10
};

function initGame() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.spacetraders.io/v2/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        processData: false,
        data: '{\n  "faction": "COSMIC",\n  "symbol": "",\n  "email": ""\n}'
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

getAgent()

function getWayPoint(wayPoint) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.spacetraders.io/v2/systems/systemSymbol/waypoints/waypointSymbol`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
};

// const factions = await listFactions(20,1)
// console.log(factions)

const faction = await getFaction("COSMIC")
console.log(faction)


// const system = await listSystems(20,1)
// console.log(system)

// const systems = await getSystem("X1-TF11")
// console.log(systems)

let contrats = await listContrats()
console.log(contrats)

let contrat = await getContrat("clpcog26n2i66s60calh08olg")
// console.log(contrat)
