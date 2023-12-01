// Copyright © 2023 Entreprise SpaceTarders
'use strict'
let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDE0MzUxMTAsInN1YiI6ImFnZW50LXRva2VuIn0.AKe66yRJWV457_U-C5w0z03zwoPJIOyFgnef_nQXjXLtacyYxeYkcilv-5nRcsk1BsI1NkV2mT6Hg_WbevvxJzfIVSq1ZDQAUyA-sxM7qro3-kFfHWgy7FrCGEoKRTGRbFSo6yuKhvygAY6cZFsEAW6i9ayq893JFWeFNM-xfXDrnNI52VOQzWVJzYdhyi7jSsmUfw3vXf9OuXjaMPP3qpmCLpuElWGnqSyQBdLs7y7rN3MmkYH0E5ZPrYmBmdqk10QkJ_bruf2AgU808Q9lgw013qMVoDHwb-83_LrWjzYuIBQQBpfRIyMQrLaum-uEHsIECBg5D3M_OTFmy7htqQ'
export async function listFactions(limit, pages){
    let factions = [];

    for(let page = 1; page <= pages; page++){
        await $.ajax('https://api.spacetraders.io/v2/factions', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            data: {
                limit: limit,
                page: page
            },
            success: function(response){
                response.data.forEach(faction => {
                    factions.push(faction);
                });
            },
            error: function(error){
                console.log(error);
            }
        });
    }

    return factions;
}

export async function getFaction(symbol){
    let faction;
    
    await $.ajax(`https://api.spacetraders.io/v2/factions/${symbol}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        success: function(response){
            faction = response.data;
           
        },
        error: function(error){
            console.log(error);
        }
    });

    return faction;
}
