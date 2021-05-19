import { IonApp } from '@ionic/react';
import PlayView from './components/PlayView';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


/* Theme variables */
import './variables.css';


const App: React.FC = () => (
  <IonApp>
    <PlayView />
  </IonApp>
);

export default App;
