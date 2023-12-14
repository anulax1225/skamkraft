// Copyright © 2023 Entreprise SkamCraft

"use strict";

import AUTH from "./auth.js";
import SpaceTraders from "./api.js";

$(document).ready(async function () {
  //Auth
  if (document.URL.includes("login.html")) {
    $("#btn-login").on("click", () => {
      AUTH.login();
    });
    return;
  }

  if (document.URL.includes("register.html")) {
    const factions = await SpaceTraders.Faction.list(10, 1);
    factions.forEach((faction) => {
      const option = `<option>${faction.symbol}</option>`;
      $("#group-faction").append(option);
    });

    $("#btn-register").on("click", () => {
      AUTH.register();
    });
    return;
  }

  if (!(await AUTH.isLogin())) window.location.href = "login.html";

  agent();

  //Buttons
  $("#btn-contract").on("click", () => {
    contract();
  });
  $("#btn-faction").on("click", () => {});
  $("#btn-ship").on("click", () => {});
  $("#btn-system").on("click", () => {});
  $("#btn-logout").on("click", () => {
    logout();
  });
});

function loadPage(page) {
  $("main").load(`templates/${page}.html`);
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

async function agent() {
  let token = localStorage.getItem("token");
  let agent = await SpaceTraders.Agent.get(token);

  $("#credits").text(agent.credits.toLocaleString() + " $");
}

async function contract() {
  const token = localStorage.getItem("token");
  const contracts = await SpaceTraders.Contract.list(token);

  $("main").empty();

  contracts.forEach((contract) => {
    let card = `<div class="card">
      <div class="card-title">
        <h1>${contract.id}</h1>
      </div>
      <div class="card-content">

      </div>

      <div class="card-footer">
        <button id="btn-accept-contract">Accepter</button>
        <button id="btn-reject-contract">Refuser</button>
      </div>
    </div>;`;
    $("main").append(card);
  });
}
