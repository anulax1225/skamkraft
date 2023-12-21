import { Modal } from "../skama_code/ui/modal.js";
import { Auth } from "../skama_code/auth/auth.js";

let my_agent = null;

function home(temp_engine) {
    temp_engine.render("templates/home.html");
}


function menu_mod() {
    if(my_agent && my_agent.name) $(".pseudo").text(`Agent name : ${my_agent.name}`);
}

export function login(temp_engine) {
    let auth = new Auth(true);
    let modal = new Modal("login-modal", temp_engine);

    function render_login() {
        temp_engine.render(`templates/login.html`);
        modal.load("templates/login_modal.html")
    }

    modal.add_class("ext-modal");
    temp_engine.after_render(menu_mod);

    render_login();

    temp_engine.add_event("#ok", "click", () => {
        home(temp_engine);
    });

    temp_engine.add_event("#forget", "click", () => {
        my_agent = null;
        auth.unload_token();
        modal.close();
        render_login();
    });

    temp_engine.add_event("#val", "click", () => {
        let token = $("#in-token").val();
        auth.login(token);
    });

    temp_engine.add_event("#cancel", "click", () => {
        $("#in-token").val("");
    });

    auth.done((agent) => {
        modal.show();
        my_agent = agent;
    }).fail((errs) => {
        $(".errors").html("");
        errs.forEach(err => {
            $(".errors").append(`
                <p>${err}</p>
            `);
        });
    });

    auth.relog();
}