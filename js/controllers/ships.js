import menu_mod from "./menu_mod.js";
import { Modal } from "../skama_code/ui/modal.js";
import { Ship } from "../skama_code/api/ship.js";


export default (temp_engine) => {
  let modal = new Modal("ship-modal", temp_engine);
  let slideIndex = 1;

  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine, null);
    $("body").css("background-image", "url('/assets/spaceships/hangar.png')")
    modal.load("templates/ships/ships_modal.html");

    Ship.list((ships) => {
      ships.forEach(ship => {
        console.log(ship)
        $(".block-ships").prepend(
          `
            <div class="ships-list" data-id="${ship.symbol}">
              <h5>${ship.symbol}</h5>
              <img 
                class="imgShip" 
                src="/assets/spaceships/${ship.registration.role}.png" 
                alt="" />
                <div class="buttonShip">
                  <button id="" class="reg btn-ships" data-symbol="${ship.symbol}">Name</button>
                  <button id="" class="nav btn-ships" data-symbol="${ship.symbol}">Navigation</button>
                  <button id="" class="crew btn-ships" data-symbol="${ship.symbol}">Crew</button>
                  <button id="" class="frame btn-ships" data-symbol="${ship.symbol}">Frame</button>
                  <button id="" class="react btn-ships" data-symbol="${ship.symbol}">Reactor</button>
                  <button id="" class="fuel btn-ships" data-symbol="${ship.symbol}">Fuel</button>
              </div> 
            </div>
            
          `
          )
      });
      showSlides(1)

      temp_engine.add_event(".reg", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos-ships").html("");
            $(".infos-ships").append(`<p class="ship-info">Name : ${ship.registration.name}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Faction : ${ship.registration.factionSymbol}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Role : ${ship.registration.role}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".nav", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos-ships").html("");
            $(".infos-ships").append(`<p class="ship-info">Current system : ${ship.nav.systemSymbol}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Current waypoint : ${ship.nav.waypointSymbol}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Current status : ${ship.nav.status}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Flight mode : ${ship.nav.flightMode}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".crew", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos-ships").html("");
            $(".infos-ships").append(`<p class="ship-info">Current member : ${ship.crew.current}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Capacity : ${ship.crew.capacity}</p>`);
            $(".infos-ships").append(`<p class="ship-info">required member : ${ship.crew.required}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Moral : ${ship.crew.morale}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".frame", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos-ships").html("");
            $(".infos-ships").append(`<p class="ship-info">Name : ${ship.frame.name}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Description : ${ship.frame.description}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Fuel capacity : ${ship.frame.fuelCapacity}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Condition : ${ship.frame.condition}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Power : ${ship.frame.requirements.power}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Crew : ${ship.frame.requirements.crew}</p>`);

          }
        })
        modal.show();
      });
      temp_engine.add_event(".react", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos-ships").html("");
            $(".infos-ships").append(`<p class="ship-info">Name : ${ship.reactor.name}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Description : ${ship.reactor.description}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Condition : ${ship.reactor.condition}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Power : ${ship.reactor.powerOutput}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Crew : ${ship.reactor.requirements.crew}</p>`);
          }
        })
        modal.show();
      });
      temp_engine.add_event(".fuel", "click", (e) => {
        const id_ship = $(e.target).attr("data-symbol");
        ships.forEach(ship =>{
          if(ship.symbol==id_ship)
          {
            $(".infos-ships").html("");
            $(".infos-ships").append(`<p class="ship-info">current fuel : ${ship.fuel.current}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Description : ${ship.fuel.capacity}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Condition : ${ship.fuel.consumed.amount}</p>`);
            $(".infos-ships").append(`<p class="ship-info">Speed : ${ship.fuel.consumed.timestamp}</p>`);
          }
        })
        modal.show();
      });
      
    });

    function showSlides(n) {
      let i;
      slideIndex += n;
      let slides = $(".ships-list");
      if (slideIndex > slides.length) slideIndex = 1;    
      if (slideIndex < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      slides[slideIndex-1].style.display = "block";
    }

    temp_engine.add_event(".btn-close-ships", "click", () => {
      modal.close();
    });
    temp_engine.add_event(".prev", "click", () => {
      showSlides(-1);      
    });
    temp_engine.add_event(".next", "click", () => {
      showSlides(1);     
    });
  });
  
  temp_engine.render("templates/ships/ships.html");

};