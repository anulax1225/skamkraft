import {UIRenderer} from "./ui/templeting_engine.js";

let UI = new UIRenderer("html");


UI.render("templates/home.html");

UI.add_event("#btn1", "click", () => {
    UI.render("templates/test2.html");
});
UI.add_event("#btn2", "click", () => {
    UI.render("templates/test.html");
})