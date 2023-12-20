// Copyright © 2023 Entreprise SkamKraft
'use strict';
export class Initialzer {
    constructor(UI) {
        this.UI = UI;
    }

    init_menu_link(tag, template) {
        this.UI.add_event(tag, "click", () => {
            this.UI.render(`templates/${template}`);
        })    
    }
}