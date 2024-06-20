import menu_mod from "./menu_mod.js";
import { Auth } from "../skama_code/auth/auth.js"
import { My } from "../skama_code/commun/my.js"
import login from "./login.js";

export default function profile(temp_engine) {
    temp_engine.after_render(() => {
        $("body").css("background-image", "url('/assets/profile/background.png')")
        $('#name').append(My.agent.name);
        $('#faction').append(My.agent.faction);
        $('#credit').append(My.agent.credits);
        $('#hq').append(My.agent.hq);
        $('#shipcount').append(My.agent.ships_cpt);

        temp_engine.add_event('#btn-token', 'click', () => {
            navigator.clipboard.writeText(My.agent.token);
            alert('Token copied !');
        });

        temp_engine.add_event('#btn-logout', 'click', () => {
            const auth = new Auth();
            auth.unload_token();
            login(temp_engine);
        });

        menu_mod(temp_engine);
    });
    temp_engine.render("/templates/profile/profile.html");
}