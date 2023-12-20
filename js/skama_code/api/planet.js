// Copyright © 2023 Entreprise SkamKraft
'use strict';

import { SpaceTraders } from "./config.js";
import { Position } from "../commun/position.js";

class Market {
    constructor(market) {
        this.symbol = market.symbol;
        this.exports = market.exports;
        this.imports = market.imports;
        this.exchange = market.exchange;
        this.transctions = market.transctions;
        this.trade_goods = market.tradeGoods;
    }

    has_export(market_export) {

    }

    list_exports(callback) {

    }

    has_import(market_import) {

    }

    list_import(callback) {
        
    }
}

export class Planet {
    constructor(waypoint) {
        this.name = waypoint.symbol;
        this.type = waypoint.type;
        this.system = waypoint.systemSymbol;
        this.position = new Position(waypoint.x, waypoint.y);
        this.moons = waypoint.orbitals;
        this.orbits = waypoint.orbits;
        this.faction = waypoint.faction;
        this.traits = waypoint.traits;
        this.dangers = waypoint.modifiers;
        this.discovery = waypoint.char;
        this.is_under_construction = waypoint.isUnderConstruction;
    }

    get_market(callback, error_handler) {
        const url = `${SpaceTraders.host}/systems/${this.system}/waypoints/${this.name}/market`;
        $.ajax({
            url: url,
            method: "GET",
            success: (reponse) => {
                let market = new Market(reponse.data);
                callback(market);
            },
            error: (err) => {
                error_handler("Market not found");
            }
        });  
    }

    is_type(type) {
        return this.type === type ? true : false;
    }

    is_discovered() {
        return this.discovery.length > 0 ? true : false;
    }    
}

export class PlanetBuilder {
    static parse_system_name(name) {
        return name.split("-").slice(0, 2).join("-");
    }

    static get(name, callback, error_handler) {
        let system = PlanetBuilder.parse_system_name(name);
        const url = `${SpaceTraders.host}/systems/${system}/waypoints/${name}`;
        $.ajax({
            url: url,
            method: "GET",
            success: (reponse) => {
                let planet = new Planet(reponse.data);
                callback(planet);
            },
            error: (err) => {
                error_handler("Planet not found");
            }
        });
    } 

    static list(system, limit, page, callback, planets = []) {
        const url = `${SpaceTraders.host}/systems/${system}/waypoints`
        $.ajax({
            url: url,
            method: "GET",
            data: {
                limit: limit,
                page: page
            },
            success: (reponse) => {
                reponse.data.forEach(planet => {
                    planets.push(new Planet(planet));
                });
                callback(planets, reponse.meta);
            } 
        });
    }

    static list_all(system, callback) {
        this.list(system, 20, 1, (planets, meta) => {
            let maxPage = meta.total / 20;
            this.#r_listing(system, 2, maxPage, planets, callback);
        });
    }

    static #r_listing(system, page, maxPage, planets, callback) {
        if (page < maxPage) {
            this.list(20, page++,() => {
                setTimeout(() => {
                    callback(planets);
                    this.#r_listing(system, page++, maxPage, planets, callback); 
                }, 1000);
            }, planets);
        } else {
            callback(planets);
        }
    }
}