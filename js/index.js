// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { UIRenderer } from "./ui/templeting_engine.js";
import { Initialzer } from "./commun/commun.js";
import { AgentBuilder } from "./api/agent.js";
import { Auth } from "./auth/auth.js";

let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiSEFSRElDSyIsInZlcnNpb24iOiJ2Mi4xLjQiLCJyZXNldF9kYXRlIjoiMjAyMy0xMi0wMiIsImlhdCI6MTcwMjY2Mjc2Mywic3ViIjoiYWdlbnQtdG9rZW4ifQ.PrvaOz3W79acq6RoxryMW53PRRz824_AM0VGLwfXCOsGCOCAIY-rn6-bZTOnLAtp4xPSDqEk4c38oWYAWW59p0iMDDLpur6ONnjT0RjjsQS9zr5BByfBpP36CT23IZSSzk3XxGrFolHJAyU3K1liYfNbsPuNTXlkHGNHq6yMqH4ZQUPFsXEsCkg9cUynkdLw3C39SvWhtJ89oblj_8tQp2k8dxhZemepuXtiI51eFMpv8A0WRAi7pVYo_ajJujY9QDLYn_m5hDZWTlQMIstjPaDl99p2IMweIMO2Q2G-0lKiWQ4sl6VW5tuVrz1HLYU6kyMjFQWNn6kFDE7LWMTrfw";
let UI = new UIRenderer("html");
let initer = new Initialzer(UI);
UI.render("templates/home.html");

let auth = new Auth();
auth.done((agent) => {
    console.log(agent);
}).fail((errs) => {
    errs.forEach(err => {
        console.log(err);
    });
});

await auth.register({
    symbol: "lkdsjfsjdlfjlk",
    faction: "COSMIC"
});

$(document).ready(() => {
    initer.init_menu_link("#contracts-link", "contracts.html");
    initer.init_menu_link("#ships-link", "ships.html");
    initer.init_menu_link("#systems-link", "systems.html");
    initer.init_menu_link("#signup-link", "register.html");
    initer.init_menu_link("#signin-link", "login.html");
    initer.init_menu_link(".nav-brand", "home.html");
});