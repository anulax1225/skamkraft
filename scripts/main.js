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
  $("#btn-faction").on("click", () => { });
  $("#btn-ship").on("click", () => { });
  $("#btn-system").on("click", () => { });
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

  $('main').empty()

  contracts.forEach(contrat => {
    console.log(contrat);
    const card =
      `                            
        <div class="card" style="width: 20rem;">
              <img src="/img/contrat.jpg" class="card-img-top" alt="">
              <div class="card-body">
                  <h5 style="color:white" class="card-title">${contrat.factionSymbol}</h5>
                  <p style="color:white" class="card-text">${contrat.accepted}</p>
                  <button id="btn-infos" contratID="${contrat.id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Infos</button>
                  <button id="btn-accepter" class="btn-modify btn btn-primary" data-toggle="modal" data-target="#Modify" >Accepter</button>                       
              </div>
          </div>
      `

    $('main').append(card)
    $('#btn-infos').on('click', async function () {
      const token = localStorage.getItem("token");
      const contrat = await SpaceTraders.Contract.get($(this).attr('contratID'), token);
      const modal = `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">${contrat.id}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>`
      $('main').append(modal)
    })
  })
}
