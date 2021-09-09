# TODOS

1. Tutorial
   1. graphics
2. Ads
   1. https://www.google.com/adsense/signup/new/lead?gsessionid=uxpeelM8BpKF43M0T1CYRTqnFejkFP-peAKHNHRAl2I
3. Android build
   1. https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile
   2. first build: `ionic build`
   3. create android project for first time: `ionic cap add android`
   4. update android project from web project: `ionic cap copy`
      1. update android project from web project after adding another capacitor-plugin (or any other (half-)native code): `ionic cap sync`
   5. open android-code: `ionic cap open android`



## Later
   1. Rotation / Scaling
      1. Board currently sized relative to window.innerHeight. Make that relative to ComponentHeight
         1. https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
   2. Performance
      1. We're already...
         1. using sprites instead of graphics
         2. caching text as Bitmap
         3. reduced bloom-shader quality
      2. Findings with spectorjs:
         1. pixi has to redraw the whole board with every animation-frame
         2. something - probably the glow-shader, or the board-graphics-drawing process - causes a lot of jumping between the non-canvas framebuffers 1 and 2. Keeps jumping between texture 56 and 57 and buffer 5 and 4, drawing and clearing again.
      3. Adding a **FilterArea** while ticker-plugin on causes error (ticker already defined)
      4. Somehow grouping keys so that they don't need to be redrawn when not changed?
