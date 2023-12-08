// Copyright © 2023 Entreprise SpaceTarders
'use strict'
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS40IiwicmVzZXRfZGF0ZSI6IjIwMjMtMTItMDIiLCJpYXQiOjE3MDIwMzg1ODgsInN1YiI6ImFnZW50LXRva2VuIn0.Brl1Mm9K7bG7kLfWGiU6M0WFvOXy-sV3T_p9-c-v97XMFvsmA85lpdKzeaAyVpOPMF4uM08HqxWb9mEGbag5whX0LPk39B_vjKeQVB9cjpjDsaElQz2HuWIUlB33eOQTyt_LKdQYnY7Jqh2HLopMbzK5sjeaGYzjoWILCuZXjqQkp5b0M_0EvXqCgDn1PpEb_MXSLkTpSQ1xa6hCaGjf6fE3KfTgRxEGpIunAeLRq1edaN4fU7TFU0SWSJZ1HO9CMfxA7eZt274sw4Wiea6LpwlPsGOMf1HFVl2sWdpbdIwdaFHyKpUAHWOGORKBB4B9G77wFLcOukwQMOQYOFL48Q"
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

