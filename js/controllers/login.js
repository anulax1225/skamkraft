import { Modal } from "../skama_code/ui/modal.js";
import { Auth } from "../skama_code/auth/auth.js";
import { My } from "../skama_code/api/agent.js";
import home from "./home.js";
import menu_mod from "./menu_mod.js";

export default function login(temp_engine) {
  let auth = new Auth(true);
  let modal = new Modal("login-modal", temp_engine);

  function render_login() {
    temp_engine.render(`templates/auth/login.html`);
  }

  modal.add_class("ext-modal");
  temp_engine.after_render((temp_engine) => {
    modal.load("templates/auth/login_modal.html");
    menu_mod(temp_engine);
    temp_engine.add_event("#ok", "click", () => {
      home(temp_engine);
    });

    temp_engine.add_event("#forget_login", "click", () => {
      My.agent = null;
      auth.unload_token();
      modal.close();
      render_login();
    });

    temp_engine.add_event("#val", "click", () => {
      let token = $("#in-token").val();
      auth.login(token);
    });

    temp_engine.add_event("#cancel", "click", () => {
      $("#in-token").val("");
    });
  });

  render_login();

  auth
    .done((agent) => {
      modal.show();
      My.agent = agent;
    })
    .fail((errs) => {
      $(".errors").html("");
      errs.forEach((err) => {
        $(".errors").append(`
                <p>${err}</p>
            `);
      });
    });

  auth.relog();
}
