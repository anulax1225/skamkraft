import { My } from "../skama_code/commun/my.js";
import profile from "./profile.js";
import contracts from "./contracts.js";
import ships from "./ships.js";
import leaderboard from "./leaderboard.js";

function loged_links(temp_engine, lister) {
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
  temp_engine.add_event("#contracts-link", "click", () => {
    if(lister) lister.stop();
    contracts(temp_engine);
  })
  temp_engine.add_event("#ships-link", "click", () => {
    if(lister) lister.stop();
    ships(temp_engine);
  })
  temp_engine.add_event("#leaderboard-link", "click", () => {
    if(lister) lister.stop();
    leaderboard(temp_engine);
  })
}

export default (temp_engine, lister) => {
  if(My.agent) loged_links(temp_engine, lister);
}
