// Copyright © 2023 Entreprise SkamKraft
"use strict";

import { SpaceTraders } from "../skama_code/api/config.js";

import menu_mod from "./menu_mod.js";
import { My } from "../skama_code/api/agent.js";
import { Contract } from "../skama_code/api/contract.js";
import { Modal } from "../skama_code/ui/modal.js";


export default (temp_engine) => {

  let modal = new Modal("contract-modal", temp_engine);

  temp_engine.after_render((temp_engine) => {
    modal.load("templates/contracts/contracts_modal.html");

    Contract.list(10, 1, (contracts) => {

      //Evenements
      temp_engine.add_event(".btn-accept", "click", (e) => {
        contracts.forEach((contract) => {
          if ($(e.target).attr("data-id") == contract.id) {
            contract.accept(() => {
              $(e.target).parent().children(".status-onhold").html("Status : accepté");
              $(e.target).parent().children(".status-onhold").attr("class", 'status-accepted');
              $(e.target).remove();

            });
          }
        });
      });

      temp_engine.add_event(".btn-infos", "click", (e) => {
        contracts.forEach((contract) => {

          const id_contract = $(e.target).attr("data-id");

          $(".contract-id").text("ID : " + contract.id);
          $(".contract-faction").text("Faction : " + contract.faction);
          $(".contract-type").text("Type : " + contract.type);
          $(".contract-expiration").text("Expiration : " + contract.expiration);
          $(".contract-payment-accepted").text("Payment : " + contract.paymentAccepted + " $");
          $(".contract-payment-fulfill").text("Payment fulfill : " + contract.paymentFulfill + " $");
          $(".contract-tradeSymbol").text("Trade Symbol : " + contract.tradeSymbol);
          $(".contract-destinationSymbol").text("Destination : " + contract.destination);

          modal.show();

        });

      });

      contracts.forEach(contract => {
        let img
        let status
        let card

        if (contract.type = "PROCUREMENT") {
          img = "/assets/contracts/procurement.png"
        }
        else if (contract.type = "TRANSPORT") {
          img = "/assets/contracts/transportation.png"
        }
        else {
          img = "/assets/contracts/shuttle.png"
        }

        if (contract.accepted) {
          status = "accepted"
          card =
            `                            
                    <div class="card spacer" style="width: 20rem;">
                      <img src="${img}" class="card-img-top" alt="">
                        <div class="card-body">
                          <h5 style="color:white" class="card-title">${contract.faction}</h5>
                          <p style="color:white" class="card-text">${contract.deadline}</p>
                          <p class="card-text status-accepted">Status : ${status}</p>
                          <button data-id="${contract.id}" class="btn-infos" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Infos</button>                      
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
                          <h5 style="color:white" class="card-title">${contract.faction}</h5>
                          <p style="color:white" class="card-text">${contract.deadline}</p>
                          <p class="card-text status-onhold">Status : ${status}</p>
                          <p style="color:white" class="card-text revenu">Revenu : ${contract.paymentAccepted} $</p>
                          <button type="button" class="btn btn-primary btn-infos" data-bs-toggle="modal" data-bs-target="#exampleModal">Infos</button>
                          <button data-id="${contract.id}" class="btn-modify btn btn-primary btn-accept" data-toggle="modal" data-target="#Modify" >Accepter</button>                       
                        </div>
                    </div>
                  `
        }

        $('.contracts').append(card);

      });

    })

    temp_engine.add_event(".btn-close", "click", () => {
      modal.close();
    });

    menu_mod(temp_engine);
  });

  temp_engine.render("templates/contracts/contracts.html")
}