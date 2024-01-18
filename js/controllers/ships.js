import menu_mod from "./menu_mod.js";
import { Modal } from "../skama_code/ui/modal.js";
import { Ship } from "../skama_code/api/ship.js";

export default (temp_engine) => {
  let modal = new Modal("ship-modal", temp_engine);

  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine);
    modal.load("templates/ship/ship_modal.html");

    Ship.list((ships) => {
      ships.forEach(ship => {
        $(".ships").append(
          `
            <div>
              <h5>${ship.symbol}</h5>
                <p>fuel capacity: ${ship.fuel.capacity}</p>
              <button id="FT" data-symbol="${ship.symbol}">FICHE Technique<button>
            </div>
          `
          )
          temp_engine.add_event("#FT", "click", (e) => {
            const id_ship = $(e.target).attr("data-symbol");
            if(ship.symbol=id_ship)
            {
            $(".Ship-id").text("ID : " + ship.symbol);
            $(".Ship-registration").text("Registration : " + ship.registration);
            $(".Ship-nav").text("Nav : " + ship.nav);
            $(".Ship-crew").text("Crew : " + ship.crew);
            $(".Ship-frame").text("Frame : " + ship.frame );
            $(".Ship-reactor").text("Reactor : " + ship.reactor );
            $(".Ship-engine").text("Engine : " + ship.engine);
            $(".Ship-cooldown").text("Cooldown : " + ship.cooldown);
            $(".Ship-modules").text("Modules : " + ship.modules );
            $(".Ship-mounts").text("Mounts : " + ship.mounts );
            $(".Ship-cargo").text("Cargo : " + ship.cargo);
            $(".Ship-fuel").text("Fuel : " + ship.fuel);
            }
            modal.show();
          });
      });
      
    });

    temp_engine.add_event(".btn-close", "click", () => {
      modal.close();
    });
    

    
  });

  temp_engine.render("templates/ship/ship.html");
};
