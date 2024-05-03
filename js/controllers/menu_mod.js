import { My } from "../skama_code/commun/my.js";
import login from "./login.js";
import profile from "./profile.js";

function loged_links(temp_engine) {
  $("#links").html(`
        <input type="image" alt="home" id="systems-link" src="/assets/menu/home.png"/>
        <input type="image" alt="contracts" id="contracts-link" src="/assets/menu/contracts.png"/>
        <input type="image" alt="ships" id="ships-link" src="/assets/menu/ships.png"/>
        <input type="image" alt="profile" id="profile-link" src="/assets/menu/info.png"/>
        <input type="image" alt="leaderboard" id="leaderboard-link" src="/assets/menu/leaderboard.png"/>
  `);
  temp_engine.add_event("#profile-link", "click", () => {
    profile(temp_engine);
  });
}

export default (temp_engine) => {
  if(My.agent) loged_links(temp_engine);
}
