import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
import { Row } from 'react-table';
import {
    MenuButtonContainer,
    MenuButtonContentContainer,
    MenuButtonsDeleteIcon,
    MenuButtonsEditIcon,
} from './MenuButton.molecule.styled';

type MenuButtonProps = {
    createHref?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    selectedRows: Row<object>[];
    hideDelete?: boolean;
};

const MenuButton: React.FC<MenuButtonProps> = ({
    createHref,
    selectedRows,
    hideDelete = false,
}) => {
    return (
        <MenuButtonContentContainer>
            {createHref && (
                <Link href={createHref}>
                    <MenuButtonContainer>
                        <MenuButtonsEditIcon />
                    </MenuButtonContainer>
                </Link>
            )}

            {!hideDelete && (
                <MenuButtonContainer disabled={selectedRows.length === 0}>
                    <MenuButtonsDeleteIcon />
                </MenuButtonContainer>
            )}
        </MenuButtonContentContainer>
    );
};

export default MenuButton;
