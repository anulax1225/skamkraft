import {UIRenderer} from "./ui/templeting_engine.js";
import { Agent, AgentBuilder } from "./api/agent/agent.js";

AgentBuilder.listAll((agents) => {
    console.log(agents);
});

AgentBuilder.create("ZEUslkdjlka", "COSMIC", (agent) => {
    console.log(agent);
});

let UI = new UIRenderer("html");

UI.render("templates/test.html");

UI.add_event("#btn1", "click", () => {
    UI.render("templates/test2.html");
});
UI.add_event("#btn2", "click", () => {
    UI.render("templates/test.html");
})