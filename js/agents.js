// Copyright © 2023 Entreprise SpaceTarders
'use strict'
import { listSystems, getSystem, listWaypointsInSystem } from "./system.js"
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS40IiwicmVzZXRfZGF0ZSI6IjIwMjMtMTItMDIiLCJpYXQiOjE3MDIwMzg1ODgsInN1YiI6ImFnZW50LXRva2VuIn0.Brl1Mm9K7bG7kLfWGiU6M0WFvOXy-sV3T_p9-c-v97XMFvsmA85lpdKzeaAyVpOPMF4uM08HqxWb9mEGbag5whX0LPk39B_vjKeQVB9cjpjDsaElQz2HuWIUlB33eOQTyt_LKdQYnY7Jqh2HLopMbzK5sjeaGYzjoWILCuZXjqQkp5b0M_0EvXqCgDn1PpEb_MXSLkTpSQ1xa6hCaGjf6fE3KfTgRxEGpIunAeLRq1edaN4fU7TFU0SWSJZ1HO9CMfxA7eZt274sw4Wiea6LpwlPsGOMf1HFVl2sWdpbdIwdaFHyKpUAHWOGORKBB4B9G77wFLcOukwQMOQYOFL48Q"
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