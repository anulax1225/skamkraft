// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { TemplateEngine } from "./skama_code/ui/templeting_engine.js";
import { login } from "./scripts/main.js";

let temp_engine = new TemplateEngine("html");
login(temp_engine);

temp_engine.add_event("#signin-link", "click", () => {
    login(temp_engine);
});
