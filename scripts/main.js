"use strict";

import { createAgent } from "./agent.js";
import { getAgent } from "./agent.js";
import { listAgents } from "./agent.js";
import { getPublicAgent } from "./agent.js";

import { listSystems } from "./systems.js";
import { getSystem } from "./systems.js";
import { listWaypointsInSystem } from "./systems.js";
import { getWaypoint } from "./systems.js";
import { getMarket } from "./systems.js";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiVEVTVDUzNTYiLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDA4MzEzOTEsInN1YiI6ImFnZW50LXRva2VuIn0.H4C3rNwgaBf6ych4txV7WO3jwt-ZAsb6jWSnQ3EMZfO7BgVbUW00a3uMtiQ7qCBuZ91YnmtUL8PZSRnR1RzCAjUd6Y64Kwt8cARgSZ56a08zIreXQ66WsXpm-pVXHKlrD7LeA9sHzZGhD9yADnghbJmCy6UoiYhgr8I7OwL9EIf-nb3B5l2UTchiNHTNmKjsggycQDDaK2yCcKXhy6rro8-ptogU5QFFYiIbshCiEos4Sc-CHbKci-DQpzWb9FcsNntb1PdZcm2hhjGDi4KD8Q1Ccvd-m1vTH4SwV1xt66tT5SMMuBA7nblsC2DlNV682PZi27XcpibMIyWoSQ938w";

// const systemSym = "X1-KD70";
// const waypointSym = "X1-KD70-AA1X";

$(document).ready(async function () {
  let systemSymbol = await listSystems(1, 1);
  systemSymbol = systemSymbol[0].symbol;

  let waypointSymbol = await listWaypointsInSystem(1, 1, systemSymbol);
  waypointSymbol = waypointSymbol[0].symbol;

  let market = await getMarket(systemSymbol, waypointSymbol, token);
  console.log(market);
});
