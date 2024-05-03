import { Auth } from "../skama_code/auth/auth.js";
import { My } from "../skama_code/commun/my.js";
import { Faction } from "../skama_code/api/faction.js";
import home from "./home.js";
import login from "./login.js";
import menu_mod from "./menu_mod.js";

export default function register(temp_engine) {
  let auth = new Auth();

  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine);

    Faction.list_all((factions) => {
        factions.forEach((faction) => {
            let option;
            if (faction.isRecruiting) {
            option = `<option>${faction.symbol}</option>`;
            } else {
            option = `<option disabled>${faction.symbol}</option>`;
            }

            $("#group-faction").append(option);
        });
    });

    temp_engine.add_event("#btn-register", "click", () => {
        const is_checked = $("#in-remember").is(":checked");
        const symbol = $("#in-name").val();
        const faction = $("#in-faction").val();
        auth.store = is_checked;
        auth.register({ name: symbol, faction: faction });
    });

    temp_engine.add_event("#btn-cancel", "click", () => {
        $("#in-name").val("");
        $("#in-remember").prop("checked", false);
    });

    temp_engine.add_event("#btn-log", "click", () => {
        login(temp_engine);
    });
  });

  auth.done((agent) => {
        My.agent = agent;
        home(temp_engine);
  });

  auth.fail((errors) => {
    $(".errors").html("");
    errors.forEach((error) => {
        $(".errors").append(`<p>${error}</p>`);
    });
  });

  temp_engine.render(`templates/auth/register.html`);
}