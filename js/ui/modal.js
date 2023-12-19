export class Modal {
    constructor(name, template_engine, tag = "#block-content") {
        this.name = name;
        this.template_engine = template_engine;
        this.tag = tag;
        this.modal_class = "";
    }

    render(template) {
        this.template_engine.get_template((reponse) => {
            $(this.tag).html(`
                <dialog id="${this.name}" class="${this.modal_class} modal-disable">
                    ${reponse}
                </dialog>
            `);
        }, template);
    }

    add_class(modal_class) {
        this.modal_class = `${this.modal_class} ${modal_class}`;
    }

    show() {
        document.querySelector(`#${this.name}`).showModal(); 
    }

    close() {
        document.querySelector(`#${this.name}`).close();
    }
}