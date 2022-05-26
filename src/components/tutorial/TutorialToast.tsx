import { IonToast } from '@ionic/react';
import { FC } from 'react';


export interface TutorialToastArgs {
    open: boolean,
    message: string,
    onDidPresent: () => void,
    buttons: {
        type: 'next' | 'previous',
        action: () => void,
    }[]
}

const TutorialToast: FC<TutorialToastArgs> = (args: TutorialToastArgs) => {
    return <>
        <IonToast
            isOpen={args.open}
            onDidPresent={args.onDidPresent}
            message={args.message}
            position="top"
            buttons={
                args.buttons.map(b => {
                    if (b.type === 'previous') {
                        return {
                            side: 'start',
                            text: 'back',
                            handler: b.action
                        }
                    } else {
                        return {
                            text: 'next',
                            role: 'next',
                            handler: b.action
                        }
                    }
                })
            }
        />
    </>
};

export default TutorialToast;