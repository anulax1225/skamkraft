import menu_mod from "./menu_mod.js";
import { My } from "../skama_code/api/agent.js";
import { AgentBuilder } from "../skama_code/api/agent.js";
import { Auth } from "../skama_code/auth/auth.js";

export default function home(temp_engine) {
  const auth = new Auth()

  if (auth.relog()) {
    AgentBuilder.get(localStorage.getItem("token"), (agent) => {
      My.agent = agent;
      menu_mod(temp_engine);
    })
  }
  console.log("test");
  temp_engine.after_render(menu_mod);
  temp_engine.render("templates/home.html");
}
