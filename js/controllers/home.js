import menu_mod from "./menu_mod.js";
import { My } from "../skama_code/api/agent.js";
import { Ship } from "../skama_code/api/ship.js";

export default function home(temp_engine) {
  console.log("test");
  temp_engine.after_render(menu_mod);
  temp_engine.render("templates/home.html");

  if (My.agent) {
    Ship.list((ships) => {
      ships[0].orbit(
        (response) => console.log(response),
        (err) => console.log(err)
      );
      ships[0].navigate(
        "X1-TN14-A2",
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
