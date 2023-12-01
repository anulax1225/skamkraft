// Copyright © 2023 Entreprise SpaceTarders
'use strict'
import { listSystems, getSystem, listWaypointsInSystem } from "./system.js"
let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDE0MzUxMTAsInN1YiI6ImFnZW50LXRva2VuIn0.AKe66yRJWV457_U-C5w0z03zwoPJIOyFgnef_nQXjXLtacyYxeYkcilv-5nRcsk1BsI1NkV2mT6Hg_WbevvxJzfIVSq1ZDQAUyA-sxM7qro3-kFfHWgy7FrCGEoKRTGRbFSo6yuKhvygAY6cZFsEAW6i9ayq893JFWeFNM-xfXDrnNI52VOQzWVJzYdhyi7jSsmUfw3vXf9OuXjaMPP3qpmCLpuElWGnqSyQBdLs7y7rN3MmkYH0E5ZPrYmBmdqk10QkJ_bruf2AgU808Q9lgw013qMVoDHwb-83_LrWjzYuIBQQBpfRIyMQrLaum-uEHsIECBg5D3M_OTFmy7htqQ'
export function getAgent() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.spacetraders.io/v2/my/agent',
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
        }
    };
    /*$.ajax(settings).done(function (reponse) {
        $('.main-window').prepend(`
        <article class="agent-card">
            <p class="account"> ID du joueur : ${reponse.data.accountId}</p>
            <p class="symbol">${reponse.data.symbol}</p>
            <p class="headquarters">${reponse.data.headquarters}</p>
            <p class="credits">${reponse.data.credits}</p>
            <p class="startingFaction">${reponse.data.startingFaction}</p>
            <p class="shipCount">${reponse.data.shipCount}</p>
        </article>
        `);
        let metaSystem = reponse.data.headquarters.split("-");
        getSystem(metaSystem[0] + "-" + metaSystem[1]);
    });*/
}
export async function createAgent(symbol, faction){
    const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: symbol,
          faction: faction,
        }),
        success: function(response){
            symbol = response.data;         
        },
        error: function(error){
            console.log(error);
        }
    };
    
}