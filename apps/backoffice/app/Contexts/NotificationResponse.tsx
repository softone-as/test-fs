import React, { createContext, useMemo, useState } from 'react';
import { useNotification } from '../Utils/notification';

export interface INotificationResponseContextState {
    notifications?: void;
    message?: string | null;
}

export interface INotificationResponseContext {
    notificationState: INotificationResponseContextState;
    setNotificationMessage: (message: string) => void;
}

export const NotificationResponseContext = createContext<
    Partial<INotificationResponseContext>
>({});

export const NotificationResponseProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [state, setState] = useState<INotificationResponseContextState>({
        message: '',
    });

    const handleSetState = (
        newState: Partial<INotificationResponseContextState>,
    ) => {
        setState((oldState) => ({ ...oldState, ...newState }));
    };

    const setNotificationMessage = (message: string) => {
        handleSetState({ message });
    };

    const notifications = useMemo(() => {
        if (state.message) {
            return useNotification({
                type: 'success', // it can enhanced for the error notification
                message: state.message,
            });
        }
    }, [state.message]);

    return (
        <NotificationResponseContext.Provider
            value={{
                notificationState: {
                    ...state,
                    notifications,
                },
                setNotificationMessage,
            }}
        >
            {children}
        </NotificationResponseContext.Provider>
    );
};
