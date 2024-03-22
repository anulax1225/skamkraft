// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { TemplateEngine } from "./skama_code/ui/templeting_engine.js";
import login from "./controllers/login.js";
import home from "./controllers/home.js";
import { Auth } from "./skama_code/auth/auth.js";
import { AgentBuilder } from "./skama_code/api/agent.js";
import { My } from "./skama_code/api/agent.js";

let temp_engine = new TemplateEngine("html");

//Auto login
const auth = new Auth();

if (auth.relog()) {
AgentBuilder.get(localStorage.getItem("token"), (agent) => {
    My.agent = agent;
    home(temp_engine);
});
}

login(temp_engine);


