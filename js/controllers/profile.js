import { Modal } from "../skama_code/ui/modal.js"

export default function profile(temp_engine) {
    let modal = new Modal("profile-modal", temp_engine);
    modal.load("templates/modal_profile.html");
    modal.after_load((temp_engine) => {
        modal.show();
    });
}