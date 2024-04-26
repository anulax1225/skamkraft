import { My } from "../skama_code/api/agent.js";
import login from "./login.js";

function init_menu(temp_engine) {
  temp_engine.add_event("#login-link", "click", () => {
    login(temp_engine);
  });
}

function loged_links() {
  $("#links").html(`
        <input type="image" alt="home" id="systems-link" src="/assets/menu/home.png"/>
        <input type="image" alt="contracts" id="contracts-link" src="/assets/menu/contracts.png"/>
        <input type="image" alt="ships" id="ships-link" src="/assets/menu/ships.png"/>
        <input type="image" alt="info" src="/assets/menu/info.png"/>
        <input type="image" alt="leaderboard" src="/assets/menu/leaderboard.png"/>
    `);
}

export default function menu_mod(temp_engine) {
  init_menu(temp_engine);
  if (My.agent) {
    loged_links();
  } else {
    unloged_links();
  }
}
