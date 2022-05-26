# TODOS

1. Tutorial
   1. Slides explaining labels, tonality, and timbre
      1. Requires a service that holds the current state of (some-menu)-is-open
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
