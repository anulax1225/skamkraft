let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQ0hBRE9XIiwidmVyc2lvbiI6InYyLjEuNSIsInJlc2V0X2RhdGUiOiIyMDI0LTAxLTEzIiwiaWF0IjoxNzA2MjU0MjAzLCJzdWIiOiJhZ2VudC10b2tlbiJ9.ceCEMlAUIr4dxU1BWlpQwzyh8GxaphPM5qyFhV0qE5YX-p26x0AZ7BHdJKVpbIYENSIMks3sTDLfDu7bcHAOzCxSpR9XhNmJ1s3g84J4Sn6NaVHVPFalJiW8K3Cg3t7H6CPNG5FMpwjzGzn0M0EjSMS6EabIDC2wpPXvfktHMR3Z-ISflobnkkCwaNTmQJtumSZfDuwdkUnH_zwfedfqVGpBCAUIzlNcwB1ha19QXfx5h4lVt7aefPU2znEIMwBtsr1vx1uad0TqhOXF8x2BI_lWAQIeGT_dnPbhhoF0jBQEy9zNQXkZSeS0682j_D_yiVwnNlByZoI3VF0KesKB3A";

// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('test');

// create a rectangle object
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 100,
    height: 100
});
      
// "add" rectangle onto canvas
canvas.add(rect);