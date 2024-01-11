import { SystemBuilder } from "../skama_code/api/system.js";
import { Position } from "../skama_code/commun/position.js";
import menu_mod from "./menu_mod.js";

let canvas;
let last_target;

let offset = {
  x: 2,
  y: 2,
};
let max = 100;
let w = (window.innerWidth / 10) * 9;
let h = (window.innerHeight / 4) * 3;

function animate() {
  canvas.renderAll();
  setTimeout(animate, 1000);
}

function draw_planet(planet) {
  let shadow = new fabric.Shadow({
    color: "white",
    blur: 5,
    offsetX: 0,
    offsetY: 0,
  });

  fabric.Image.fromURL(
    "/assets/planets/planetproto.png",
    function (img_planet) {
      //FABRICJS
      img_planet.set({
        selectable: false,
        shadow: shadow,
        left: planet.position.x / offset.x + w / 2,
        top: planet.position.y / offset.y + h / 2,
        name: planet.name,
        type: planet.type,
      });
      canvas.add(img_planet);
    }
  );
}

function offsetOrbit(planet) {
  if (planet.orbits) {
    console.log("Orbits");
    let x = Math.floor(Math.random() * max - Math.random() * max);
    let y = Math.floor(Math.random() * max - Math.random() * max);
    planet.position.move(new Position(x, y));
  }
}

export default function system(system, temp_engine) {
  temp_engine.after_render((temp_engine) => {
    $("#sys-name").text(system);
    menu_mod(temp_engine);
    canvas = new fabric.Canvas("canvas", {
      width: w,
      height: h,
      backgroundColor: "rgb(7, 18, 41)",
      renderOnAddRemove: false,
      hoverCursor: "pointer",
    });
    SystemBuilder.get(system, (system) => {
      system.list_all(
        (planets) => {
          planets.forEach((planet) => {
            offsetOrbit(planet);
            draw_planet(planet);
          });
          animate();
        },
        (err) => {
          console.log(err);
        }
      );
    });
    canvas.on("mouse:up", (e) => {
      if (e.target.shadow.color == "red") {
        e.target.shadow.color = "white";
      } else {
        e.target.shadow.color = "red";
      }
      if (last_target) last_target.shadow.color = "white";
      last_target = e.target;
      canvas.renderAll();
    });
    $(window).on("resize", () => {
      canvas.setWidth((window.innerWidth / 10) * 9);
      canvas.setHeight((window.innerHeight / 4) * 3);
      canvas.renderAll();
    });
    canvas.on("mouse:wheel", (opt) => {
      let scale = 1.1;
      if (opt.e.deltaY < 0) {
        canvas.zoomToPoint(
          new fabric.Point(canvas.width / 2, canvas.height / 2),
          canvas.getZoom() * scale
        );
      } else if (opt.e.deltaY > 0) {
        canvas.zoomToPoint(
          new fabric.Point(canvas.width / 2, canvas.height / 2),
          canvas.getZoom() / scale
        );
      }
    });
  });
  temp_engine.render("templates/systems/system.html");
}
