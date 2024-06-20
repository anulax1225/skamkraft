import { Modal } from "../skama_code/ui/modal.js"
import { Auth } from "../skama_code/auth/auth.js"
import { My } from "../skama_code/commun/my.js"
import login from "./login.js";

export default function profile(temp_engine) {
    let modal = new Modal("modal-profile", temp_engine);
    modal.load("templates/modal_profile.html");
    modal.after_load(() => {
        modal.show();
        $('#name').append(My.agent.name);
        $('#faction').append(My.agent.faction);
        $('#credit').append(My.agent.credits);
        $('#hq').append(My.agent.hq);
        $('#shipcount').append(My.agent.ships_cpt);

        temp_engine.add_event('#btn-token', 'click', () => {
            navigator.clipboard.writeText(My.agent.token);
            alert('Token copied !');
        })

        temp_engine.add_event('#btn-logout', 'click', () => {
            const auth = new Auth();
            auth.unload_token();
            login(temp_engine);
        })

        temp_engine.add_event('#btn-close', 'click', () => {
            console.log("CLOSINF")
            modal.close();
        });
    });
}