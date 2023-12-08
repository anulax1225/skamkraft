"use strict";

export async function listSystems(limit, page) {
  let systems;

  await $.ajax("https://api.spacetraders.io/v2/systems/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    data: {
      limit: limit,
      page: page,
    },
    success: function (response) {
      systems = response.data;
    },
    error: function (error) {
      console.log(error);
    },
  });

  return systems;
}

export async function getSystem(systemSymbol) {
  let system;

  await $.ajax(`https://api.spacetraders.io/v2/systems/${systemSymbol}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    success: function (response) {
      system = response.data;
    },
    error: function (error) {
      console.log(error);
    },
  });

  return system;
}

export async function listWaypointsInSystem(limit, page, systemSymbol) {
  let waypoints;

  await $.ajax(
    `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      data: {
        limit: limit,
        page: page,
      },
      success: function (response) {
        waypoints = response.data;
      },
      error: function (error) {
        console.log(error);
      },
    }
  );

  return waypoints;
}

export async function getWaypoint(systemSymbol, waypointSymbol) {
  let waypoint;

  await $.ajax(
    `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      success: function (response) {
        waypoint = response.data;
      },
      error: function (error) {
        console.log(error);
      },
    }
  );

  return waypoint;
}

export async function getMarket(systemSymbol, waypointSymbol, token) {
  let market;

  await $.ajax(
    `https://api.spacetraders.io/v2/systems/X1-KD70/waypoints/X1-KD70-AA1X/market`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      success: function (response) {
        console.log(response);
        market = response;
      },
      error: function (error) {
        console.log(error);
      },
    }
  );

  return market;
}
