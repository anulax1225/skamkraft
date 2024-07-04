// Copyright © 2023 Entreprise SkamKraft
"use strict";
import { TemplateEngine } from "./skama_code/ui/templeting_engine.js";
import register from "./controllers/register.js";
import { Auth } from "./skama_code/auth/auth.js";
import { AgentBuilder } from "./skama_code/api/agent.js";
import { My } from "./skama_code/commun/my.js";
import home  from "./controllers/home.js";

let temp_engine = new TemplateEngine("html");

//Auth
const auth = new Auth;
if(auth.relog())
{
  AgentBuilder.get(localStorage.getItem('token'), (agent) => {
    My.agent = agent;
    home(temp_engine);
  }, (err) => {
    register(temp_engine);
  });
}
else 
{
    register(temp_engine);
}
