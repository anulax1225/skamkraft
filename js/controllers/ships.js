import menu_mod from "./menu_mod.js";
import { Modal } from "../skama_code/ui/modal.js";
import { Ship } from "../skama_code/api/ship.js";

export default (temp_engine) => {
  let modal = new Modal("ship-modal", temp_engine);

  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine);
    modal.load("templates/ship/ship_modal.html");

    Ship.list((ship) => {
      ship.data.forEach(data => {
          console.log(data)
          $(".ships").html(
          `
            <div>
              <h5>${data.symbol}</h5>
                <p>fuel capacity: ${data.fuel.capacity}</p>
              <button id="FT">FICHE Technique<button>
            </div>
          `
          )
      });
    });

    temp_engine.add_event("#btn-close", "click", () => {
      modal.close();
    });
    temp_engine.add_event("#FT", "click", () => {
      modal.show();
    });

    
  });

  temp_engine.render("templates/ship/ship.html");
};
