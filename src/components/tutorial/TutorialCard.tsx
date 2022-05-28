import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonModal, IonRow } from '@ionic/react';
import { FC } from 'react';


export interface TutorialCardArgs {
    children: JSX.Element | JSX.Element[],
    open: boolean,
    title: string,
    buttons: {
        label: string,
        action: () => void
    }[],
};

const TutorialCard: FC<TutorialCardArgs> = (args: TutorialCardArgs) => {

    return <>
        <IonModal isOpen={args.open}>
            <IonContent>
                <div style={{ margin: '5%' }}>
                    <h2>{args.title}</h2>
                    {args.children}
                    <IonGrid>
                        <IonRow>
                            {args.buttons.map((b, i) => {
                                return <IonCol key={i}><IonButton onClick={b.action} expand="block">{b.label}</IonButton></IonCol>;
                            })}
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonModal>
    </>;
};

export default TutorialCard;