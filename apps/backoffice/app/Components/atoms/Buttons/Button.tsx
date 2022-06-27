import React, { useState } from 'react';
import classNames from 'classnames';

export enum ButtonVariant {
    MAIN = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    WARNING = 'warning',
}

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    isSmall?: boolean;
    disable?: boolean;
    variant?: ButtonVariant;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    isSmall,
    variant = ButtonVariant.MAIN,
    children,
    disable = false,
    className,
    ...rest
}) => {
    return (
        <button
            disabled={disable}
            className={classNames(`btn ${className}`, {
                btn_small: isSmall,
                [`btn_${variant}`]: true,
            })}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
