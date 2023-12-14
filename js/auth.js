// Copyright © 2023 Entreprise SkamCraft

"use strict";

import SpaceTraders from "./api.js";

const $inputToken = $("#input-token");
const $inputSymbol = $("#input-symbol");
const $inputFaction = $("#input-faction");
const $alert = document.querySelector("#box-alert");
const $error = $("#error-message");

const showError = (message) => {
  $alert.removeAttribute("hidden");
  $error.text(message);
};

const redirectToIndex = () => {
  window.location.href = "/index.html";
};

export default {
  login: async () => {
    const token = $inputToken.val();

    if (!token) {
      showError("Token manquant");
      return;
    }

    try {
      await SpaceTraders.Agent.get(token);
      localStorage.setItem("token", token);
      redirectToIndex();
    } catch {
      showError("Token invalide");
    }
  },

  register: async () => {
    const symbol = $inputSymbol.val();

    if (!symbol) {
      showError("Symbol manquant");
      return;
    }

    const faction = $inputFaction.val();

    console.log(faction);

    if (!faction) {
      showError("Faction manquante");
      return;
    }

    try {
      const agent = await SpaceTraders.Agent.create(symbol, faction);

      if (agent.token !== undefined) {
        localStorage.setItem("token", agent.token);
        redirectToIndex();
      } else {
        showError("Symbol ou faction invalide");
      }
    } catch {
      showError("Erreur lors de l'inscription");
    }
  },

  isLogin: async () => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    try {
      await SpaceTraders.Agent.get(token);
      return true;
    } catch {
      return false;
    }
  },
};
