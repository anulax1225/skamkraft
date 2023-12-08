// Copyright © 2023 Entreprise SpaceTarders

"use strict";

export async function createAgent(symbol, faction) {
  let agent;

  await $.ajax("https://api.spacetraders.io/v2/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      symbol: symbol,
      faction: faction,
    }),
    success: function (response) {
      agent = response.data;
    },
    error: function (error) {
      return error;
    },
  });

  return agent;
}

export async function getAgent(token) {
  let agent;

  await $.ajax("https://api.spacetraders.io/v2/my/agent", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    success: function (response) {
      agent = response.data;
    },
    error: function (error) {
      return error;
    },
  });

  return agent;
}

export async function listAgents(limit, page) {
  let agents;

  await $.ajax("https://api.spacetraders.io/v2/agents", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    data: {
      limit: limit,
      page: page,
    },
    success: function (response) {
      agents = response.data;
    },
    error: function (error) {
      console.log(error);
    },
  });

  return agents;
}

export async function getPublicAgent(agentSymbol) {
  let agent;

  await $.ajax(`https://api.spacetraders.io/v2/agents/${agentSymbol}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    success: function (response) {
      agent = response.data;
    },
    error: function (error) {
      console.log(error);
    },
  });

  return agent;
}
