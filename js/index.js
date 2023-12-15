import {UIRenderer} from "./ui/templeting_engine.js";

let UI = new UIRenderer("html");
UI.render("templates/home.html")

function init_menu_link(tag, template) {
    UI.add_event(tag, "click", () => {
        UI.render(`templates/${template}`);
    })    
}

$(document).ready(() => {
    init_menu_link("#contracts-link", "contracts.html");
    init_menu_link("#ships-link", "ships.html");
    init_menu_link("#systems-link", "systems.html");
    init_menu_link("#signup-link", "register.html");
    init_menu_link("#signin-link", "login.html");
    init_menu_link(".nav-brand", "home.html");
});