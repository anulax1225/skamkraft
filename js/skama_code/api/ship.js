// Copyright © 2023 Entreprise SkamKraft
"use strict";
import { SpaceTraders } from "./config.js";
import { My } from "./agent.js";

export class Ship {
  constructor(data) {
    this.symbol = data.symbol;
    this.registration = data.registration;
    this.nav = data.nav;
    this.crew = data.crew;
    this.frame = data.frame;
    this.reactor = data.reactor;
    this.engine = data.engine;
    this.cooldown = data.cooldown;
    this.modules = data.modules;
    this.mounts = data.mounts;
    this.cargo = data.cargo;
    this.fuel = data.fuel;
  }

  static list(callback) {
    const url = `${SpaceTraders.host}/my/ships`;
    $.ajax({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${My.agent.token}`,
      },
      success: (response) => {
        let listShips = [];
        response.data.forEach(ship => {
          listShips.push(new Ship(ship))
          
        });
        callback(listShips);
      },
      error: (err) => {
        error_handler(["Token invalide."]);
      },
    });
  }
  static get(shipSymbol, callback, error_handler) {
    const url = `${SpaceTraders.host}/my/ships/${shipSymbol}`;
    $.ajax({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${My.agent.token}`,
      },
      success: (response) => {
        callback(new Ship(response.data));
      },
      error: (err) => {
        error_handler(err);
      },
    });
  }
  static getPosition(callback) {
    const url = `${SpaceTraders.host}/my/ships/${this.name}/nav`;
    $.ajax({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        callback(response);
      },
      error: (err) => {
        error_handler(["Token invalide."]);
      },
    });
  }
}
