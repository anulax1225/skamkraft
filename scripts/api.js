// Copyright © 2023 Entreprise SkamKraft

"use strict";

const spacetradersApiUrl = "https://api.spacetraders.io/v2/";

const REQUEST = async (url, method, headers, data) => {
  try {
    const response = await $.ajax(url, {
      method,
      headers,
      data,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export default {
  Agent: {
    create: (symbol, faction) => {
      const url = `${spacetradersApiUrl}register`;
      const headers = { "Content-Type": "application/json" };
      const data = JSON.stringify({ symbol, faction });

      return REQUEST(url, "POST", headers, data);
    },

    get: (token) => {
      const url = `${spacetradersApiUrl}my/agent`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      return REQUEST(url, "GET", headers);
    },

    getPublic: (symbol) => {
      const url = `${spacetradersApiUrl}agents/${symbol}`;
      const headers = { Accept: "application/json" };

      return REQUEST(url, "GET", headers);
    },

    list: (limit, page) => {
      const url = `${spacetradersApiUrl}agents`;
      const headers = { Accept: "application/json" };
      const data = { limit, page };

      return REQUEST(url, "GET", headers, data);
    },
  },

  Faction: {
    list: (limit, page) => {
      const url = `${spacetradersApiUrl}factions`;
      const headers = { Accept: "application/json" };
      const data = { limit, page };

      return REQUEST(url, "GET", headers, data);
    },
  },

  System: {
    list: (limit, page) => {
      const url = `${spacetradersApiUrl}systems/`;
      const headers = { Accept: "application/json" };
      const data = { limit, page };

      return REQUEST(url, "GET", headers, data);
    },

    get: (symbol) => {
      const url = `${spacetradersApiUrl}systems/${symbol}`;
      const headers = { Accept: "application/json" };

      return REQUEST(url, "GET", headers);
    },
  },

  Waypoint: {
    list: (limit, page, systemSymbol) => {
      const url = `${spacetradersApiUrl}systems/${systemSymbol}/waypoints`;
      const headers = { Accept: "application/json" };
      const data = { limit, page };

      return REQUEST(url, "GET", headers, data);
    },

    get: (systemSymbol, waypointSymbol, token) => {
      const url = `${spacetradersApiUrl}systems/${systemSymbol}/waypoints/${waypointSymbol}/market`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      return REQUEST(url, "GET", headers);
    },
  },

  Contract: {
    list: (token) => {
      const url = `${spacetradersApiUrl}my/contracts/`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      return REQUEST(url, "GET", headers);
    },

    get: async (contratId, token) => {
      const url = `${spacetradersApiUrl}my/contracts/${contratId}`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      return REQUEST(url, "GET", headers);
    },

    accept: async (contratId, token) => {
      const url = `${spacetradersApiUrl}my/contracts/${contratId}/accept`;
      const headers = {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      return REQUEST(url, "POST", headers);
    }
  },
};
