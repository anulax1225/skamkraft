import { CanvasRenderer } from "../skama_code/ui/canvas_render.js";
import menu_mod from "./menu_mod.js";
import { My } from "../skama_code/api/agent.js";
import { SystemBuilder } from "../skama_code/api/system.js";

export default (temp_engine) => {
  temp_engine.after_render((temp_engine) => {
    menu_mod(temp_engine);
    //create canvas
    const size = getSize();
    const canvas = new CanvasRenderer("canvas", size.width, size.height);

    //auto resize canvas
    window.addEventListener("resize", () => {
      const size = getSize();
      canvas.resize(size.width, size.height);
    });

    //display planets
    SystemBuilder.get(getAgentSystem(), (system) => {
      system.list_all_planets((planets) => {
        planets.forEach(planet => {
          canvas.obj_from_img('../../assets/planets/planetproto.png', planet.position);
        });
      });
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

function getAgentSystem(){
  const hq = My.agent.hq;
  const systemName = hq.split('-');
  return systemName[0] + '-' + systemName[1];
}
