import { Inertia } from '@inertiajs/inertia';
import React, { createContext, useEffect, useRef, useState } from 'react'

export interface IAppContext {
    appState: IAppContextState
    setAppState: React.Dispatch<React.SetStateAction<IAppContextState>>
}
export interface IAppContextState {
    isReady: boolean;
    isNavigating: boolean;
    isRefreshing: boolean;
}

interface IAppProviderProps {
    children: React.ReactNode;
}

export const AppContext = createContext<Partial<IAppContext>>({})


export const AppProvider: React.FunctionComponent<IAppProviderProps> = (props) => {
    const [state, setState] = useState<IAppContextState>({
        isReady: false,
        isNavigating: false,
        isRefreshing: false,
    })

    const stateRef = useRef(state);
    const currentPathRef = useRef(window.location.pathname);

    const handleSetState = (newState: Partial<IAppContextState>) => {
        stateRef.current = { ...stateRef.current, ...newState }
        setState((oldState) => ({ ...oldState, ...newState }))
    }

    useEffect(() => {
        const inertiaStart = Inertia.on('start', (event) => {
            const isNavigating = currentPathRef.current !== event.detail.visit.url.pathname
            currentPathRef.current = event.detail.visit.url.pathname

            handleSetState({ isReady: true, isRefreshing: true, isNavigating })
        })

        const inertiaFinish = Inertia.on('finish', () => {
            handleSetState({ isNavigating: false, isRefreshing: false })
        })

        return () => {
            inertiaStart()
            inertiaFinish()
        }
    }, [])

    return <AppContext.Provider {...props} value={{ appState: state, setAppState: setState }} />
}
