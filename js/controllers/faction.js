import menu_mod from "./menu_mod.js";
import { Faction } from "../skama_code/api/faction.js";
import { Modal } from "../skama_code/ui/modal.js";

export default (temp_engine) => {
  let modal = new Modal("faction-modal", temp_engine);

  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine);
    modal.load("templates/factions/faction_modal.html");

    temp_engine.add_event("#btn-close", "click", () => {
      modal.close();
    });

    Faction.list_all((factions) => {
      add_factions(factions);

      temp_engine.add_event("#btn-faction", "click", (e) => {
        const faction_symbol = $(e.target).attr("data-symbol");
        const faction = factions.find((element) => {
          return element.symbol == faction_symbol;
        });

        $("#faction-title").html(faction.symbol);
        $("#faction-description").html(`Description: ${faction.description}`);
        $("#faction-headquarters").html(
          `Headquarters: ${faction.headquarters}`
        );

        modal.show();
      });
    });
  });

  temp_engine.render("templates/factions/faction.html");
};

function add_factions(factions) {
  factions.forEach((faction) => {
    const card = `
    <div class="faction-card">
      <h1>${faction.symbol}</h1>
      <h2>${faction.name}</h2>
      <button id="btn-faction" data-symbol="${faction.symbol}">Info</button>
    </div>
    `;

    $("#faction-container").append(card);
  });
}
