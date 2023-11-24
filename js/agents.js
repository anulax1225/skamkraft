'use strict'
import { listSystems, getSystem, listWaypointsInSystem } from "./system.js"
let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4xMjMiLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDA4MzM2NTgsInN1YiI6ImFnZW50LXRva2VuIn0.SQSgewmJhhOlnk3wst9ND61D6JoAXSW6tZAJhS8c0IxyegVVe7ZkCBCU3tBraxWwEwR6wAnc8iCWzaS5Ir6mHbLhDR5UAaJwBasTMHQN1dXeQGJE83CjhciAyxWUV3iej4M1OD0kzG2uHFicLt9emOlCEbVcroXn2_F4K9kQDRjpoy3KEzGJxJbvWqug9mo5Ejb0WupB0Sim-mWwBmmpbkCx-MbakzZ5tUfUC5h-dAVsUIqnfrr7QCOq3zPrdt7zZzsOXFcwPwE6hbag62J5ROQtPfx1r9w-6pf7-mOOmEYSWHbArbls9f71o9Wf6A1qv3yPWGVjr5qQ1EFo_H-x_g'
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
    $.ajax(settings).done(function (reponse) {
        $('.main-window').prepend(`
        <article class="agent-card">
            <p class="account">${reponse.data.accountId}</p>
            <p class="symbol">${reponse.data.symbol}</p>
            <p class="headquarters">${reponse.data.headquarters}</p>
            <p class="credits">${reponse.data.credits}</p>
            <p class="startingFaction">${reponse.data.startingFaction}</p>
            <p class="shipCount">${reponse.data.shipCount}</p>
        </article>
        `);
        let metaSystem = reponse.data.headquarters.split("-");
        getSystem(metaSystem[0] + "-" + metaSystem[1]);
    });
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