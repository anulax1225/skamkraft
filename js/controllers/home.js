import { AgentBuilder, My } from "../skama_code/api/agent.js";
import { Auth } from "../skama_code/auth/auth.js";
import menu_mod from "./menu_mod.js";

export default function home(temp_engine) {
  //Auto login
  const auth = new Auth();

  if (auth.relog()) {
    AgentBuilder.get(localStorage.getItem("token"), (agent) => {
      My.agent = agent;
      menu_mod(temp_engine);
    });
  }

  temp_engine.after_render(menu_mod);
  temp_engine.render("templates/home.html");
}
