import { IonContent, IonPage, IonButton } from "@ionic/react";
import { Link } from 'react-router-dom';

export default function PrivacyView() {
    return <IonPage>
        <IonContent fullscreen>
            <div style={{margin: '5%'}}>
                <h1>Privacy</h1>
                <p>This app does not store or collect any user data.</p>
                <Link to={'/'}>
                    <IonButton>
                        Back
                    </IonButton>
                </Link>
            </div>

        </IonContent>
    </IonPage>;
}