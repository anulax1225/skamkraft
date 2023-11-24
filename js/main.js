let token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQU5OTk5VTEFYMTIyNSIsInZlcnNpb24iOiJ2Mi4xLjEiLCJyZXNldF9kYXRlIjoiMjAyMy0xMS0wNCIsImlhdCI6MTcwMDIyNDU5MSwic3ViIjoiYWdlbnQtdG9rZW4ifQ.r05mWtD5FjC4s6Td-ycmHdzL7C2s75lz3q7OBmWeCqUUZ1ejPsRGQRWJDPmIh1kAqO4D9FFs3GCTPZUn1KsnQ-xmDvsIi_mqC1gJV-Q0irI7gwfsGXbfLaVCXo-Q98C_QWRh-O_xkrbhJkCcvnwdEhZm7FnZ3PL4XXKrG0XNa98JrnmG0qlz0cv8V9Q0sSIwXZbvA9BrhuV8PK7_YzPc6LZuNqgPeKiX_B-tSIHHl6Sr1EzuydnczmuS-xKQnbhmcqnpaCXzQmJr7tA8KLgu70KqpPCvA8AI6PLmBlvPWtZ20RdzezqlBh6S9SrBzQ9R0zr_9RyJxq28ws2jnHpVPw";
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
        data: '{\n  "faction": "COSMIC",\n  "symbol": "Daniel123",\n  "email": ""\n}'
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function getAgent() {
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

function getSystem(system) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.spacetraders.io/v2/systems/${system}`,
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };
      
    $.ajax(settings).done(function (response) {
        drawSystem(response.data.waypoints);
    });
}


getAgent();
