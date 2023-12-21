// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { TemplateEngine } from "./skama_code/ui/templeting_engine.js";
import { init_login } from "./scripts/main.js";

let temp_engine = new TemplateEngine("html");
init_login(temp_engine);

temp_engine.add_event("#signin-link", "click", () => {
    init_login(temp_engine);
});
