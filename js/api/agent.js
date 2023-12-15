'use strict';
import { SpaceTraders } from "./config.js"

export class Agent {
  constructor(agent, token = "") {
    this.token = token;
    this.name = agent.symbol;
    this.credits = agent.credits;
    this.faction = agent.startingFaction;
    this.hq = agent.headquarters;
    this.shipsCpt = agent.shipCount;   
  }

  get_agent_system() {
    let metaSystem = this.hq.split("-");
    return metaSystem[0] + "-" + metaSystem[1]; 
  }
}

export class AgentBuilder {
  static async create(symbol, faction, callback, email = "") {
      const url = `${SpaceTraders.host}register`;
      await $.ajax({
        url: url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        processData: false,
        data: `{\n  "faction": "${faction}",\n  "symbol": "${symbol}",\n  "email": "${email}"\n}`,
        success: (reponse) => {
          let agent = new Agent(reponse.data.agent, reponse.data.token)
          callback(agent);
        },
      });
  }

  static async get(token, callback){
    const url = `${SpaceTraders.host}my/agent`;
    await $.ajax({
        url: url,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        success: (reponse) => {
          let agent = new Agent(reponse.data, token);
          callback(agent);
        },
    });
  }

  static async get_public(symbol, callback) {
    const url = `${SpaceTraders.host}agents/${symbol}`;
    const headers = { Accept: "application/json" };
    await $.ajax({
      url: url,
      method: "GET",
      headers: headers,
      success: (reponse) => {
        let agent = new Agent(reponse.data);
        callback(agent);
      },
    });
  }

  static async list(limit, page, callback, agents = []) {
    const url = `${SpaceTraders.host}agents`;
    const headers = { Accept: "application/json" };
    const data = { limit, page };
    await $.ajax({
      url: url,
      method: "GET",
      headers: headers,
      data: data,
      success: (reponse) => {
        reponse.data.forEach(agent => {
          agents.push(agent);
        });
        callback(agents, reponse.meta);
      },
    });
  }

  static async list_all(callback) {
    await this.list(1,1, (agents, meta) => {
      let maxPage = meta.total / 20;
      this.r_listing(1, maxPage, [], callback);
    });
  }

  static async r_listing(page, maxPage, agents, callback) {
    if (page < maxPage) {
      this.list(20, page++,() => {
        setTimeout(() => {
          this.r_listing(page++, maxPage, agents, callback); 
        }, 1000);
      }, agents);
    } else {
      callback(agents);
    }
  }
}



