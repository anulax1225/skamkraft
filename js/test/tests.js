import { Timer } from "../ui/timer.js";
import { Modal } from "../ui/modal.js";
import { TemplateEngine } from "../ui/templeting_engine.js";
import { Initialzer } from "../commun/initialzer.js ";
import { AgentBuilder } from "../api/agent.js";
import { Auth } from "../auth/auth.js";
import { PlanetBuilder } from "../api/planet.js";

let temp_path = "html";
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiSEFSRElDSyIsInZlcnNpb24iOiJ2Mi4xLjQiLCJyZXNldF9kYXRlIjoiMjAyMy0xMi0wMiIsImlhdCI6MTcwMjY2Mjc2Mywic3ViIjoiYWdlbnQtdG9rZW4ifQ.PrvaOz3W79acq6RoxryMW53PRRz824_AM0VGLwfXCOsGCOCAIY-rn6-bZTOnLAtp4xPSDqEk4c38oWYAWW59p0iMDDLpur6ONnjT0RjjsQS9zr5BByfBpP36CT23IZSSzk3XxGrFolHJAyU3K1liYfNbsPuNTXlkHGNHq6yMqH4ZQUPFsXEsCkg9cUynkdLw3C39SvWhtJ89oblj_8tQp2k8dxhZemepuXtiI51eFMpv8A0WRAi7pVYo_ajJujY9QDLYn_m5hDZWTlQMIstjPaDl99p2IMweIMO2Q2G-0lKiWQ4sl6VW5tuVrz1HLYU6kyMjFQWNn6kFDE7LWMTrfw";

let tests  = {
    timer: function() {
        let timer = new Timer(1, 0.1666, "m");
        timer.on("step", (time) => {
            console.log(time);
        })
        timer.on("end", () => {
            console.log("pattes fini");
        });
        timer.start();
    },
    render_template: function() {
        let UI = new TemplateEngine(temp_path);
        let initer = new Initialzer(UI);

        UI.render("templates/home.html");
        UI.frag_load("#test", "templates/login.html");

        $(document).ready(() => {
            initer.init_menu_link("#contracts-link", "contracts.html");
            initer.init_menu_link("#ships-link", "ships.html");
            initer.init_menu_link("#systems-link", "systems.html");
            initer.init_menu_link("#signup-link", "register.html");
            initer.init_menu_link("#signin-link", "login.html");
            initer.init_menu_link(".nav-brand", "home.html");
        });
    },
    authentication: function() {
        let auth = new Auth(true);
        auth.done((agent) => {
            console.log(agent);
        }).fail((errs) => {
            errs.forEach(err => {
                console.log(err);
            });
        });
        auth.login(token);
        auth.relog();

        //auth.register({
        //    symbol: "lkdsjfsjdlfjlk",
        //    faction: "COSMIC"
        //});
    },
    modal: function() {

        let template_engine = new TemplateEngine(temp_path);
        
        let timer = new Timer(60, 1, "s");
        timer.on("step", (time) => {
            $("#timer").html(`
                <p>${time}</p>
            `);
        });
        template_engine.render("templates/login.html");

        let modal = new Modal("test-modal", template_engine);
        modal.add_class("my-modal")

        modal.render("templates/test_modal.html");

        template_engine.add_event("#valid", "click", () => {
            modal.show();
            timer.start();
        });

        template_engine.add_event("#ok", "click", () => {
            modal.close();
            timer.stop();
        });
    },
    get_planet: function() {
        PlanetBuilder.get("X1-TT23", "X1-TT23-FF1E", (planet) => {
            console.log(planet);
        }, (err) => {
            console.log(err);
        });
    },

}

export default tests;