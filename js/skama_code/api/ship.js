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

  static list(callback, error_handler) {
    const url = `${SpaceTraders.host}/my/ships`;
    $.ajax({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${My.agent.token}`,
      },
      success: (response) => {
        const ships = [];
        const meta = response.meta;
        response.data.forEach((ship) => {
          ships.push(new Ship(ship));
        });
        callback(ships, meta);
      },
      error: (err) => {
        error_handler(err);
      },
    });
  }

  static purchase(shipType, waypointSymbol, callback, error_handler) {
    const url = `${SpaceTraders.host}/my/ships`;
    $.ajax({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${My.agent.token}`,
      },
      data: `{\n  "shipType": "${shipType}",\n  "waypointSymbol": "${waypointSymbol}"\n}`,
      success: (response) => {
        callback(new Ship(response.data.ship));
      },
      error: (err) => {
        error_handler(err);
      },
    });
  }

  refresh(callback, error_handler) {
    const url = `${SpaceTraders.host}/my/ships/${this.symbol}`;
    $.ajax({
      url: url,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${My.agent.token}`,
      },
      success: (response) => {
        const new_ship = new Ship(response.data);
        callback(new_ship);
      },
      error: (err) => {
        error_handler(err);
      },
    });
  }

  orbit(callback, error_handler) {
    if (this.nav.status == "IN_ORBIT")
      return error_handler("Ship already in orbit.");

    const url = `${SpaceTraders.host}/my/ships/${this.symbol}/orbit`;
    $.ajax({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${My.agent.token}`,
      },
      success: (response) => {
        callback(response.data);
      },
      error: (err) => {
        error_handler(err);
      },
    });
  }
}
