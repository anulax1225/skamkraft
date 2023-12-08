"use strict";

// let canvas = document.getElementById("canvas-system");
// let ctx = canvas.getContext("2d");

// window.addEventListener("resize", function () {
//   resizeCanvas(canvas, ctx);
// });

// resizeCanvas(canvas, ctx);

// let offset = {
//   x: 0,
//   y: 0,
// };

// drawSystem(canvas, ctx, offset);

// canvas.addEventListener("mousedown", function (event) {
//   let rec = canvas.getBoundingClientRect();
//   let mousePos = { x: event.clientX - rec.x, y: event.clientY - rec.y };
//   offset.x = mousePos.x;
//   offset.y = mousePos.y;
//   drawSystem(canvas, ctx, offset);
// });

// async function drawSystem(canvas, ctx, offset) {
//   let waypoints = await listWaypointsInSystem(20, 1, "X1-KD70");
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   waypoints.forEach((waypoint) => {
//     ctx.beginPath();
//     ctx.arc(waypoint.x, waypoint.y, 10, 0, Math.PI * 2, false);
//     ctx.fill();
//     ctx.closePath();
//   });
// }

// function resizeCanvas(canvas, ctx) {
//   let header = document.getElementById("header");
//   let footer = document.getElementById("footer");

//   let availableHeight =
//     window.innerHeight - header.clientHeight - footer.clientHeight;

//   canvas.width = window.innerWidth - 18;
//   canvas.height = availableHeight - 20;

//   ctx.translate(canvas.width / 2, canvas.height / 2);
// }
