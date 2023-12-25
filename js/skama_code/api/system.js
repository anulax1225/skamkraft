// Copyright © 2023 Entreprise SkamKraft
'use strict';

import { SpaceTraders } from "./config.js";
import { Position } from "../commun/position.js";
import { Planet } from "./planet.js";

export class System {
    constructor(data) {
        this.name = data.symbol;
        this.sector = data.sectorSymbol;
        this.type = data.type;
        this.position = new Position(data.x, data.y);
        this.factions = data.factions;
    }

    get(name, callback, error_handler) {
        const url = `${SpaceTraders.host}/systems/${this.name}/waypoints/${name}`;
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

    list(limit, page, callback, planets = []) {
        const url = `${SpaceTraders.host}/systems/${this.name}/waypoints`
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

    list_all(callback) {
        this.list(20, 1, (planets, meta) => {
            let maxPage = meta.total / 20;
            this.#r_listing(2, maxPage, planets, callback);
        });
    }

    #r_listing(page, maxPage, planets, callback) {
        if (page < maxPage) {
            this.list(20, page++, () => {
                setTimeout(() => {
                    callback(planets);
                    this.#r_listing(page++, maxPage, planets, callback); 
                }, 1000);
            }, planets);
        } else {
            callback(planets);
        }
    }
}

export class SystemBuilder {
    static parse_system_name(name) {
        return name.split("-").slice(-1, 2).join("-");
    }

    static get(name, callback, error_handler) {
        const url = `${SpaceTraders.host}/systems/${name}/`;
        $.ajax({
            url: url,
            method: "GET",
            success: (reponse) => {
                let system = new System(reponse.data);
                callback(system);
            },
            error: (err) => {
                error_handler("System not found");
            }
        });
    } 

    static list(limit, page, callback, systems = []) {
        const url = `${SpaceTraders.host}/systems/`
        $.ajax({
            url: url,
            method: "GET",
            data: {
                limit: limit,
                page: page
            },
            success: (reponse) => {
                reponse.data.forEach(system => {
                    systems.push(new System(system));
                });
                callback(systems, reponse.meta);
            } 
        });
    }

    static list_all(callback) {
        this.list(20, 1, (systems, meta) => {
            let maxPage = meta.total / 20;
            this.#r_listing(2, maxPage, systems, callback);
        });
    }

    static #r_listing(page, maxPage, systems, callback) {
        if (page < maxPage) {
            this.list(20, page++, () => {
                setTimeout(() => {
                    callback(systems);
                    this.#r_listing(page++, maxPage, systems, callback); 
                }, 1000);
            }, systems);
        } else {
            callback(systems);
        }
    }
}