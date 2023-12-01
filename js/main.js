// Copyright © 2023 Entreprise SpaceTarders
'use strict'
import { createAgent, getAgent } from "./agents.js";
import { listSystems, getSystem, listWaypointsInSystem } from "./system.js";
import {getFaction, listFactions} from "./faction.js";
import {getContrat, listContrats, CreateCardContrat} from "./contrat.js";



let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDE0MzUxMTAsInN1YiI6ImFnZW50LXRva2VuIn0.AKe66yRJWV457_U-C5w0z03zwoPJIOyFgnef_nQXjXLtacyYxeYkcilv-5nRcsk1BsI1NkV2mT6Hg_WbevvxJzfIVSq1ZDQAUyA-sxM7qro3-kFfHWgy7FrCGEoKRTGRbFSo6yuKhvygAY6cZFsEAW6i9ayq893JFWeFNM-xfXDrnNI52VOQzWVJzYdhyi7jSsmUfw3vXf9OuXjaMPP3qpmCLpuElWGnqSyQBdLs7y7rN3MmkYH0E5ZPrYmBmdqk10QkJ_bruf2AgU808Q9lgw013qMVoDHwb-83_LrWjzYuIBQQBpfRIyMQrLaum-uEHsIECBg5D3M_OTFmy7htqQ";
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

let contrat = listContrats()








