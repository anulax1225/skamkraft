import { My } from "../skama_code/api/agent.js";
import home from "./home.js";
import login from "./login.js";
import reg from "./reg.js";
import systems from "./systems.js";
import contract from "./contracts.js";

function init_menu(temp_engine) {
  temp_engine.add_event("#reg-link", "click", () => {
    reg(temp_engine);
  });
  temp_engine.add_event("#login-link", "click", () => {
    login(temp_engine);
  });
  temp_engine.add_event("#systems-link", "click", () => {
    systems(temp_engine);
  });
  temp_engine.add_event("#home-link", "click", () => {
    home(temp_engine);
  });
  temp_engine.add_event("#logout-link", "click", () => {
    My.agent = null;
    localStorage.removeItem("token");
    login(temp_engine);
  });
  temp_engine.add_event("#contracts-link", "click", () => {
    contract(temp_engine);
  })
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

function unloged_links() {
  // $(".menu-links").html(`
  //       <li class="nav-link smooth" id="login-link">Log in</li>
  //       <li class="nav-link smooth" id="reg-link">New Agent</li>
  //   `);
}

export default function menu_mod(temp_engine) {
  init_menu(temp_engine);
  if (My.agent) {
    show_stats();
    loged_links();
  } else {
    unloged_links();
  }
}
