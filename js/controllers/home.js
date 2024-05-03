import menu_mod from "./menu_mod.js";

export default function home(temp_engine) {
  temp_engine.after_render(menu_mod);
  temp_engine.render("templates/home.html");
}
