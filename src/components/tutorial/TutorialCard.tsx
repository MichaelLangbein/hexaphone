import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonModal, IonRow } from '@ionic/react';
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
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{args.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {args.children}
                </IonCardContent>
            </IonCard>
            <IonGrid>
                <IonRow>
                    { args.buttons.map((b, i) => {
                        return  <IonCol key={i}><IonButton onClick={b.action}>{b.label}</IonButton></IonCol>;
                    })}
                </IonRow>
            </IonGrid>
        </IonModal>
    </>;
};

export default TutorialCard;