# TODOS

0. Errors
   1. Board sometimes massively zoomed in. Fixed upon reload.
   2. Just entering http://hexaph.one leads to 404.
1. Tutorial
   1. More slides
   2. graphics
   3. Errors on moving forward and back
2. Ads
   1. https://www.google.com/adsense/signup/new/lead?gsessionid=uxpeelM8BpKF43M0T1CYRTqnFejkFP-peAKHNHRAl2I
   2. Google claims they cannot find that page.
      1. Maybe need to deploy google-header first?
3. Layout
   1. Buttons: confirm click with `swoop` animation
   2. Loading: not only loader-spinner. Add '... loading' text and a larger spinner.
   3. Allow to cancel loading.
   4. Keys:
      1. Better glow animation
      2. Also shine on neighbors
      3. Maybe highlight I, III, V, VII?
4. OSC
   1. Make an OSC client
      1. Form to connect to an OSC server (SonicPi)
      2. Then send all clicks out to server; deactivate immediate sound output.
5. Publish to android store


## Instructions

1. Android build
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
