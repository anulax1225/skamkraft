'use strict'
let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4xMjMiLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDA4MzM2NTgsInN1YiI6ImFnZW50LXRva2VuIn0.SQSgewmJhhOlnk3wst9ND61D6JoAXSW6tZAJhS8c0IxyegVVe7ZkCBCU3tBraxWwEwR6wAnc8iCWzaS5Ir6mHbLhDR5UAaJwBasTMHQN1dXeQGJE83CjhciAyxWUV3iej4M1OD0kzG2uHFicLt9emOlCEbVcroXn2_F4K9kQDRjpoy3KEzGJxJbvWqug9mo5Ejb0WupB0Sim-mWwBmmpbkCx-MbakzZ5tUfUC5h-dAVsUIqnfrr7QCOq3zPrdt7zZzsOXFcwPwE6hbag62J5ROQtPfx1r9w-6pf7-mOOmEYSWHbArbls9f71o9Wf6A1qv3yPWGVjr5qQ1EFo_H-x_g'
const lienSysteme = 'https://api.spacetraders.io/v2/systems'

export async function listSystems(limit, pages){
    let systems = [];

    for(let page = 1; page <= pages; page++){
        await $.ajax('https://api.spacetraders.io/v2/systems/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            data: {
                limit: limit,
                page: page
            },
            success: function(response){
                response.data.forEach(sytem => {
                    systems.push(sytem);
                });
            },
            error: function(error){
                console.log(error);
            }
        });
    }

    return systems;
}

export async function getSystem(systemSymbol){
    let system;
    
    await $.ajax(`https://api.spacetraders.io/v2/systems/${systemSymbol}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        success: function(response){
            system = response.data;
           
        },
        error: function(error){
            console.log(error);
        }
    });

    return system;
}

export async function listWaypointsInSystem(limit, pages, systemSymbol){
    let waypoints = [];

    for(let page = 1; page <= pages; page++){
        await $.ajax(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            data: {
                limit: limit,
                page: page
            },
            success: function(response){
                response.data.forEach(waypoint => {
                    waypoints.push(waypoint);
                });
            },
            error: function(error){
                console.log(error);
            }
        });
    }

    return waypoints;
}

