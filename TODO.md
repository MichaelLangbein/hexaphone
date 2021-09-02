# TODOS

1. Tonality selection
   1. Create modal to select tonality
      1. Scroll
   2. Label based on tonality: there are major keys that use b's!
2. Tutorial
   1. Several slides of graphics
3. Ads
   1. https://www.google.com/adsense/signup/new/lead?gsessionid=uxpeelM8BpKF43M0T1CYRTqnFejkFP-peAKHNHRAl2I


Later
   1. Rotation / Scaling
      1. Board currently sized relative to window.innerHeight. Make that relative to ComponentHeight
         1. https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
   2. Highlight keys per chosen tonality
   3. Performance
      1. We're already...
         1. using sprites instead of graphics
         2. caching text as Bitmap
         3. reduced bloom-shader quality
      2. Findings with spectorjs:
         1. pixi has to redraw the whole board with every animation-frame
         2. something - probably the glow-shader, or the board-graphics-drawing process - causes a lot of jumping between the non-canvas framebuffers 1 and 2. Keeps jumping between texture 56 and 57 and buffer 5 and 4, drawing and clearing again.
      3. Adding a **FilterArea** while ticker-plugin on causes error (ticker alraedy defined)
      4. Somehow grouping keys so that they don't need to be redrawn when not changed?
