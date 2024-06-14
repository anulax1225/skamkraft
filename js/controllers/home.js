import menu_mod from "./menu_mod.js";

export default function home(temp_engine) {
  temp_engine.after_render(() => {
    $("body").css("background-image", "url('/assets/img/background.png')")
    menu_mod(temp_engine);
  });
  temp_engine.render("templates/home.html");
}
