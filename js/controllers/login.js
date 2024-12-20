import { Auth } from "../skama_code/auth/auth.js";
import { My } from "../skama_code/commun/my.js";
import home from "./home.js";
import menu_mod from "./menu_mod.js";
import register from "./register.js";

export default function login(temp_engine) {
  const auth = new Auth();

  temp_engine.after_render((temp_engine) => {
    $("body").css("background-image", "url('/assets/img/background.png')")
    menu_mod(temp_engine, null);

    temp_engine.add_event("#btn-login", "click", () => {
      const is_checked = $("#in-remember").is(":checked");
      const token = $("#in-token").val();
      auth.store = is_checked;
      auth.login(token);
    });

    temp_engine.add_event("#btn-cancel", "click", () => {
      $("#in-token").val("");
      $("#in-remember").prop("checked", false);
    });

    temp_engine.add_event("#btn-register", "click", () => {
      register(temp_engine);
    });
  });

  auth.done((agent) => {
    My.agent = agent;
    home(temp_engine);
  });

  auth.fail((errors) => {
    $(".errors").html("");
    errors.forEach((error) => {
      $(".errors").append(`<p>${error}</p>`);
    }); 
  });

  temp_engine.render("templates/auth/login.html");
}
