import { Modal } from "../skama_code/ui/modal.js"
import { Auth } from "../skama_code/auth/auth.js"
import { My } from "../skama_code/commun/my.js"
import login from "./login.js";

export default function profile(temp_engine) {
    let modal = new Modal("modal_profile", temp_engine);
    modal.after_load(() => {
        modal.show();
        $('#name').append(My.agent.name);
        $('#faction').append(My.agent.faction);
        $('#credit').append(My.agent.credit);
        $('#hq').append(My.agent.hq);
        $('#shipcount').append(My.agent.ships_cpt);

        $('#btn-token').on('click', () => {
            navigator.clipboard.writeText(My.agent.token);
            alert('Token copied !');
        })

        $('#btn-logout').on('click', () => {
            const auth = new Auth();
            auth.unload_token();
            login(temp_engine);
        })
    });

    modal.load("templates/modal_profile.html");
}