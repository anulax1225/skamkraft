// Copyright © 2023 Entreprise SkamKraft
"use strict";
import { SpaceTraders } from "./config.js";
import { My } from "./agent.js";

export class Ship {
  constructor(data) {
    this.name = data.symbol;
    this.AgentName = data.registration;
    this.Nav = data.nav;
    this.crew = data.crew;
    this.engine = data.engine;
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
        callback(response);
      },
      error: (err) => {
        error_handler(["Token invalide."]);
      },
    });
  }
  static get(callback) {
    const url = `${SpaceTraders.host}/my/ships/${this.name}`;
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
