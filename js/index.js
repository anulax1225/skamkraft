// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { Modal } from "./skama_code/ui/modal.js";
import { TemplateEngine } from "./skama_code/ui/templeting_engine.js";
import { AgentBuilder } from "./skama_code/api/agent.js";
import { Auth } from "./skama_code/auth/auth.js";

let temp_engine = new TemplateEngine("html");
let auth = new Auth(true);
let modal = new Modal("login-modal", temp_engine);

temp_engine.add_event("#ok", "click", () => {
    temp_engine.render("templates/home.html");
});

temp_engine.add_event("#forget", "click", () => {
    auth.unload_token();
    modal.close();
});

temp_engine.add_event("#val", "click", () => {
    let token = $("#in-token").val();
    auth.login(token);
});

temp_engine.add_event("#cancel", "click", () => {
    $("#in-token").val("");
});

temp_engine.render("templates/login.html");

modal.add_class("ext-modal");
modal.render("templates/login_modal.html");

auth.done((agent) => {
    modal.show();
}).fail((errs) => {
    $(".errors").html("");
    errs.forEach(err => {
        $(".errors").append(`
            <p>${err}</p>
        `);
    });
});

auth.relog();

