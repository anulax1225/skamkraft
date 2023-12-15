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
    let img
    let status
    let card
    console.log(contrat)
    if (contrat.type = "PROCUREMENT") {
      img = "/img/procurement.png"
    }
    else if (contrat.type = "TRANSPORT") {
      img = "/img/transportation.png"
    }
    else {
      img = "/img/shuttle.png"
    }
    if (contrat.accepted) {
      status = "accepted"
      card = 
        `                            
        <div class="card spacer" style="width: 20rem;">
          <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 style="color:white" class="card-title">${contrat.factionSymbol}</h5>
              <p style="color:white" class="card-text">${contrat.deadlineToAccept}</p>
              <p id="status-accepted" class="card-text">Status : ${status}</p>
              <button id="btn-infos" contratID="${contrat.id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Infos</button>                      
            </div>
        </div>
      `
    }
    else {
      status = "on hold"
      card =
        `                            
        <div class="card spacer" style="width: 20rem;">
          <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 style="color:white" class="card-title">${contrat.factionSymbol}</h5>
              <p style="color:white" class="card-text">${contrat.deadlineToAccept}</p>
              <p id="status-onhold" class="card-text">Status : ${status}</p>
              <p  id="revenu" class="card-text">Revenu : ${contrat.terms.payment.onAccepted} $</p>
              <button id="btn-infos" contratID="${contrat.id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Infos</button>
              <button id="btn-accept" contratID="${contrat.id}" class="btn-modify btn btn-primary" data-toggle="modal" data-target="#Modify" >Accepter</button>                       
            </div>
        </div>
      `
    }



    $('main').append(card)
    $('main').append(card)
    $('main').append(card)
    $('main').append(card)
    $('main').append(card)
    $('main').append(card)
    $('main').append(card)


    


    $('#btn-infos').on('click', async function () {
      const token = localStorage.getItem("token");
      const contrat = await SpaceTraders.Contract.get($(this).attr('contratID'), token);
      const modal = `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="title-modal">Informations</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Contrat ID : ${contrat.id} <br>
              Type : ${contrat.type} <br>
              Faction : ${contrat.factionSymbol} <br>
              DeadLine : ${contrat.deadlineToAccept}
            </div>
            <div class="modal-footer" id="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`
      $('main').append(modal)
    })

    $('#btn-accept').on('click', async function () {
      const token = localStorage.getItem("token");
      await SpaceTraders.Contract.accept($(this).attr('contratID'), token);
      $("#status-onhold").html("Status : accepté");
      document.getElementById("status-onhold").id = "status-accepted";
      agent();
      this.remove();
    })

  })
}
