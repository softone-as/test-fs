import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { CSSProperties } from 'react';

export const themeColors = {
    primary: '#006D75',
    secondary: '',
    success: '',
    warning: '',
    error: '',
    info: '',
};

export const iconActionTableStyle: CSSProperties = {
    color: themeColors.primary,
    fontSize: '14px',
};

export const sidebarThemeConfig: ThemeConfig = {
    components: {
        Menu: {
            colorItemText: '#ffffff',
            colorItemTextHover: '#ffffff',
            colorItemTextSelected: '#ffffff',
            colorItemBgHover: '#08979C',
            colorItemBgSelected: '#08979C',
            fontSize: 14,
            colorItemBg: themeColors.primary,
        },
    },
};

export const globalThemeConfig: ThemeConfig = {
    components: {
        Button: {
            colorPrimary: themeColors.primary,
            colorPrimaryHover: themeColors.primary,
        },
        Checkbox: {
            colorPrimary: themeColors.primary,
            colorPrimaryHover: themeColors.primary,
        },
        Table: {
            controlItemBgActive: '#E6FFFB',
            controlItemBgActiveHover: '#E6FFFB',
        },
    },
};
