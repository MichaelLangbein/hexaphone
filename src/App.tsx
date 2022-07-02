import { IonApp } from '@ionic/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlayView from './components/PlayView';
import PrivacyView from './components/PrivacyView';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


/* Theme variables */
import './variables.css';
import './custom_styles.css';


const App: React.FC = () => (
  <IonApp>
      <BrowserRouter>
        <Routes>
          <Route path='/'         element={<PlayView />}    ></Route>
          <Route path='/privacy'  element={<PrivacyView />} ></Route>
        </Routes>
      </BrowserRouter>
  </IonApp>
);

export default App;
