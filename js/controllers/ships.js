import menu_mod from "./menu_mod.js";
import { Modal } from "../skama_code/ui/modal.js";
import { Ship } from "../skama_code/api/ship.js";
import system from "./system.js";

export default (temp_engine) => {
  let modal = new Modal("ship-modal", temp_engine);

  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine);
    modal.load("templates/ship/ship_modal.html");

    Ship.list((ships) => {
      ships.forEach(ship => {
        $(".ships").append(
          `
            <div class="ships-list" data-id="${ship.symbol}">
              <h5>${ship.symbol}</h5>
                <p>fuel capacity: ${ship.fuel.capacity}</p>
              <button class="reg" data-symbol="${ship.symbol}">Name</button>
              <button class="nav" data-symbol="${ship.symbol}">Navigation</button>
              <button class="crew" data-symbol="${ship.symbol}">Crew</button>
              <button class="frame" data-symbol="${ship.symbol}">Frame</button>
              <button class="react" data-symbol="${ship.symbol}">Reactor</button>
              <button class="fuel" data-symbol="${ship.symbol}">Fuel</button>
            </div>
          `
          )
      });
      temp_engine.add_event(".reg", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos").html("");
            $(".infos").append(`<p>Name : ${ship.registration.name}</p>`);
            $(".infos").append(`<p>Faction : ${ship.registration.factionSymbol}</p>`);
            $(".infos").append(`<p>Role : ${ship.registration.role}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".nav", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos").html("");
            $(".infos").append(`<p>Current system : ${ship.nav.systemSymbol}</p>`);
            $(".infos").append(`<p>Current waypoint : ${ship.nav.waypointSymbol}</p>`);
            $(".infos").append(`<p>Current status : ${ship.nav.status}</p>`);
            $(".infos").append(`<p>Flight mode : ${ship.nav.flightMode}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".crew", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos").html("");
            $(".infos").append(`<p>Current member : ${ship.crew.current}</p>`);
            $(".infos").append(`<p>Capacity : ${ship.crew.capacity}</p>`);
            $(".infos").append(`<p>required member : ${ship.crew.required}</p>`);
            $(".infos").append(`<p>Moral : ${ship.crew.morale}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".frame", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos").html("");
            $(".infos").append(`<p>Name : ${ship.frame.name}</p>`);
            $(".infos").append(`<p>Description : ${ship.frame.description}</p>`);
            $(".infos").append(`<p>Fuel capacity : ${ship.frame.fuelCapacity}</p>`);
            $(".infos").append(`<p>Condition : ${ship.frame.condition}</p>`);
            $(".infos").append(`<p>Power : ${ship.frame.requirements.power}</p>`);
            $(".infos").append(`<p>Crew : ${ship.frame.requirements.crew}</p>`);

          }
        })
        modal.show();
      });
      temp_engine.add_event(".react", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos").html("");
            $(".infos").append(`<p>Name : ${ship.reactor.name}</p>`);
            $(".infos").append(`<p>Description : ${ship.reactor.description}</p>`);
            $(".infos").append(`<p>Condition : ${ship.reactor.condition}</p>`);
            $(".infos").append(`<p>Power : ${ship.reactor.powerOutput}</p>`);
            $(".infos").append(`<p>Crew : ${ship.reactor.requirements.crew}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".engine", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos").html("");
            $(".infos").append(`<p>Name : ${ship.engine.name}</p>`);
            $(".infos").append(`<p>Description : ${ship.engine.description}</p>`);
            $(".infos").append(`<p>Condition : ${ship.engine.condition}</p>`);
            $(".infos").append(`<p>Speed : ${ship.engine.speed}</p>`);
            $(".infos").append(`<p>Crew : ${ship.engine.requirements.crew}</p>`);
            $(".infos").append(`<p>Power : ${ship.engine.requirements.power}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".fuel", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos").html("");
            $(".infos").append(`<p>current fuel : ${ship.fuel.current}</p>`);
            $(".infos").append(`<p>Description : ${ship.fuel.capacity}</p>`);
            $(".infos").append(`<p>Condition : ${ship.fuel.consumed.amount}</p>`);
            $(".infos").append(`<p>Speed : ${ship.fuel.consumed.timestamp}</p>`);
          }
        })
        modal.show();
      });
      $(".ships-list").on("click", (e) => {
        const id_ship = $(e.target).attr("data-id");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            console.log("ok")
          }
        })

      });
    });

    temp_engine.add_event(".btn-close", "click", () => {
      modal.close();
    });
  });

  temp_engine.render("templates/ship/ship.html");

};
