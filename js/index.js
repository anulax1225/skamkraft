// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { TemplateEngine } from "./skama_code/ui/templeting_engine.js";
import home from "./controllers/home.js";

let temp_engine = new TemplateEngine("html");
home(temp_engine);


