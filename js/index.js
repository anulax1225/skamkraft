// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { TemplateEngine } from "./skama_code/ui/templeting_engine.js";
import login from "./controllers/login.js";

let temp_engine = new TemplateEngine("html");
login(temp_engine);


