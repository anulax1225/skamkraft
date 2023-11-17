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

export async function listWaypointsInSystem(limit, pages){
    let waypoints = [];

    for(let page = 1; page <= pages; page++){
        await $.ajax('https://api.spacetraders.io/v2/systems/systemSymbol/waypoints', {
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

    return waypoints;
}