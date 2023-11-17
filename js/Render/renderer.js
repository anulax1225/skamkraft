class renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.waypoints = [];
        this.ships = [];
    }
    
    drawSystem() {
        const canvas = document.getElementById("canvas");
        let w = canvas.width;
        let h = canvas.height; 
        const ctx = canvas.getContext("2d");

        this.waypoints.forEach(waypoint => {
            switch (waypoint.type) {
                case "PLANET": 
                    drawWaypoint(waypoint, ctx, w/2, h/2, 'green');
                    break;
                case "ASTEROID": 
                    drawWaypoint(waypoint, ctx, w/2, h/2, 'blue');
                    break;
                case "GAS_GIANT": 
                    drawWaypoint(waypoint, ctx, w/2, h/2, 'red');
                    break;    
            }
        
        });
    }

    drawShips() {

    }

    drawWaypoint(wayPoint, ctx, w, h, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(wayPoint.x/offset.x + w, wayPoint.y/offset.y + h, 1, 0, 2 * Math.PI);
        ctx.fill();
    }
}