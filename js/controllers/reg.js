import { Auth } from "../skama_code/auth/auth.js";
import { My } from "../skama_code/api/agent.js";
import { Faction } from "../skama_code/api/faction.js"
import home from "./home.js";
import menu_mod from "./menu_mod.js";

export default function reg(temp_engine) {
    let auth = new Auth();

    temp_engine.after_render((temp_engine) => {
        menu_mod(temp_engine);

        Faction.list_all((factions) => {
            factions.forEach(faction => {
                const option = `<option>${faction.symbol}</option>`;
                $("#group-faction").append(option);
            });
        });

        temp_engine.add_event("#btn-register", "click", () => {
            const is_checked = $("#box-remember").is(":checked");
            const symbol = $("#input-name").val();
            const faction = $("#input-faction").val();
            auth.store = is_checked;
            auth.register({name: symbol, faction: faction});
        });

        temp_engine.add_event("#btn-cancel", "click", () => {
            $("#input-name").val("");
            $("#box-remember").prop("checked", false);
        });
    });

    auth.done((agent) => {
        My.agent = agent;
        if(auth.store) localStorage.setItem("token", agent.token);
        home(temp_engine);
    });

    auth.fail((errors) => {
        $(".errors").html("");
        errors.forEach(error => {
            $(".errors").append(`<p>${error}</p>`);
        });
    })

    temp_engine.render(`templates/auth/reg.html`);
}