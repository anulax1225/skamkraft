let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUFJSUk9VVCIsInZlcnNpb24iOiJ2Mi4xLjQiLCJyZXNldF9kYXRlIjoiMjAyMy0xMi0wMiIsImlhdCI6MTcwMjAzODIwOCwic3ViIjoiYWdlbnQtdG9rZW4ifQ.iCm_0x9shooAE7028tBHw-p8NAXf8_EWBZl-wnqIpMIIRCe8A6rzEkaKnX-1OORBh31YQTekSOLdP5_FnA0AEP2KP00YzGEZWQBxSTndkpivtcS6X-arc4F6yJGvcLfT1m3ZD47LGylTELR3I-sXomX2Va8_13oN6kdDJyXpVWFe5OIC01bP_cwHpjztUTO-8ASPJ_8cLZH6GTSAzy5ozF1teTEdfq93s2i9oTPhynQKogdzaXAUIkAXv7hYv5XUbevorRaCfTl52CU7WK5__3org5ardHuITmbl0QyHYIWtkbpcZLcawfEGG0EK66iqwefdXIkTeWC3T1b_ERShMw";

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