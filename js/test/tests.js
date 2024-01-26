// Copyright © 2023 Entreprise SkamKraft
'use strict';

import { Timer } from "../skama_code/ui/timer.js";
import { Modal } from "../skama_code/ui/modal.js";
import { TemplateEngine } from "../skama_code/ui/templeting_engine.js";
import { Initialzer } from "../skama_code/commun/initialzer.js ";
import { AgentBuilder } from "../skama_code/api/agent.js";
import { Auth } from "../skama_code/auth/auth.js";
import { PlanetBuilder } from "../skama_code/api/planet.js";

let temp_path = "html";
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQ0hBRE9XIiwidmVyc2lvbiI6InYyLjEuNSIsInJlc2V0X2RhdGUiOiIyMDI0LTAxLTEzIiwiaWF0IjoxNzA2MjU0MjAzLCJzdWIiOiJhZ2VudC10b2tlbiJ9.ceCEMlAUIr4dxU1BWlpQwzyh8GxaphPM5qyFhV0qE5YX-p26x0AZ7BHdJKVpbIYENSIMks3sTDLfDu7bcHAOzCxSpR9XhNmJ1s3g84J4Sn6NaVHVPFalJiW8K3Cg3t7H6CPNG5FMpwjzGzn0M0EjSMS6EabIDC2wpPXvfktHMR3Z-ISflobnkkCwaNTmQJtumSZfDuwdkUnH_zwfedfqVGpBCAUIzlNcwB1ha19QXfx5h4lVt7aefPU2znEIMwBtsr1vx1uad0TqhOXF8x2BI_lWAQIeGT_dnPbhhoF0jBQEy9zNQXkZSeS0682j_D_yiVwnNlByZoI3VF0KesKB3A";

let tests = {
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
        modal.add_class("ext-modal")

        modal.load("templates/test_modal.html");

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
        PlanetBuilder.get("X1-TT23-FF1E", (planet) => {
            console.log(planet);
        }, (err) => {
            console.log(err);
        });
    },
    get_all_planets: function() {
        PlanetBuilder.list_all("X1-AG10", (planets) => {
            console.log(planets);
        });
    },
    get_all_agents: function() {
        AgentBuilder.list_all((agents) => {
            console.log(agents);
        });
    }
}

export default tests;