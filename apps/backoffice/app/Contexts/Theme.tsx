import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

export interface IThemeContext {
    isDarkMode: boolean;
    handleSwitchTheme: (boolean: boolean) => void;
}

interface IThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<Partial<IThemeContext>>({});

export const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = (
    props,
) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies(['darkMode']);

    const handleSwitchTheme = (isDarkMode: boolean) => {
        setIsDarkMode(isDarkMode);
        setCookie('darkMode', isDarkMode, { path: '/' });
    };

    return (
        <ThemeContext.Provider
            {...props}
            value={{
                isDarkMode: cookies.darkMode
                    ? cookies.darkMode == 'true' && true
                    : isDarkMode,
                handleSwitchTheme,
            }}
        />
    );
};
