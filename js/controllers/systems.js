import { CanvasRenderer } from "../skama_code/rendering/canvas_render.js";
import menu_mod from "./menu_mod.js";

export default (temp_engine) => {
  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine);
    const size = getSize();
    const canvas = new CanvasRenderer("canvas", size.width, size.height);

    window.addEventListener("resize", () => {
      console.log("tttt");
      const size = getSize();
      canvas.resize(size.width, size.height);
    });
  });

  temp_engine.render("templates/systems/systems.html");
};

function getSize() {
  return {
    width: $("#canvas-container").width(),
    height: window.innerHeight,
  };
}
