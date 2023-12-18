class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get_canvas_pos(w, h) {
        return new Position(x - w/2, y - h/2)
    }
}

export class Planet {
   constructor(waypoint) {
    this.symbol = waypoint.symbol;
    this.type = waypoint.type;
    this.system = waypoint.systemSymbol;
    this.position = new Position(x, y);
    this.moons = waypoint.orbitals;
    this.orbits = waypoint.orbits;
    this.faction = waypoint.faction;
    this.traits = waypoint.traits;
    this.dangers = waypoint.modifiers;
    this.discovery = waypoint.char;
    this.is_under_construction = waypoint.isUnderConstruction;
   }
}

export class PlanetBuilder {
    
}