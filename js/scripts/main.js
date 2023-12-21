import { Modal } from "../skama_code/ui/modal.js";
import { Auth } from "../skama_code/auth/auth.js";

let my_agent = null;

function init_menu(temp_engine) {
    temp_engine.add_event("#reg-link", "click", () => {
        reg(temp_engine);
    });
    temp_engine.add_event("#login-link", "click", () => {
        login(temp_engine);
    });
    temp_engine.add_event(".nav-brand", "click", () => {
        home(temp_engine);
    });
}

function loged_links() {
    $(".nav-links").prepend(`
        <li class="nav-link smooth" id="contracts-link">Contracts</li>
        <li class="nav-link smooth" id="ships-link">Ships</li>
    `);
}

function menu_mod(temp_engine) {
    init_menu(temp_engine);
    if(my_agent) {
        $(".pseudo").text(`Agent name : ${my_agent.name}`);
        loged_links();
    }
}

export function home(temp_engine) {
    temp_engine.after_render(menu_mod);
    temp_engine.render("templates/home.html");
}

export function reg(temp_engine) {
    let active = false;
    let auth = new Auth(true);
    let modal = new Modal("reg-modal", temp_engine);

    function render_reg() {
        temp_engine.render(`templates/reg.html`);
        modal.load("templates/reg_modal.html")
    }

    modal.add_class("ext-modal");
    temp_engine.after_render(menu_mod);

    render_reg();

    temp_engine.add_event("#ok", "click", () => {
        home(temp_engine);
    });

    temp_engine.add_event("#forget", "click", () => {
        my_agent = null;
        auth.unload_token();
        modal.close();
        render_reg();
    });

    temp_engine.add_event("#val", "click", () => {
        if (!active) {
            active = true;
            let name = $("#in-name").val();
            let faction = $("#in-faction").val();
            auth.register({
                name: name,
                faction: faction
            });
        }
    });

    temp_engine.add_event("#cancel", "click", () => {
        $("#in-name").val("");
        $("#in-faction").val("");
    });

    auth.done((agent) => {
        $(".show-token").text(agent.token);
        modal.show();
        my_agent = agent;
        active = false;
    }).fail((errs) => {
        $(".errors").html("");
        errs.forEach(err => {
            $(".errors").append(`
                <p>${err}</p>
            `);
        });
        active = false;
    });
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