import { Link } from '@inertiajs/inertia-react';
import React, { MouseEventHandler } from 'react';

import {
    ActionButtonsContainer,
    ActionButtonsDeleteIcon,
    ActionButtonsValidateContainer,
    ActionButtonsDetailContainer,
    ActionButtonsDetailIcon,
    ActionButtonsEditIcon,
    ActionButtonsValidateIcon
} from './ActionButtons.molecule.styled';

type ActionButtonsProps = {
    updateLink?: string;
    validateLink?: string;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
    isShowDetail?: boolean;
    detailLink?: string;
    hideUpdate?: boolean;
    hideValidate?: boolean;
    hideDelete?: boolean;
    position?: 'flex-end' | 'center' | 'flex-start';
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
    updateLink,
    onDelete,
    isShowDetail,
    detailLink,
    validateLink,
    hideUpdate = false,
    hideValidate = true,
    hideDelete = false,
    position = 'flex-start',
}) => {
    return (
        <ActionButtonsContainer position={position}>
            {isShowDetail && (
                <Link href={detailLink}>
                    <ActionButtonsDetailContainer>
                        <ActionButtonsDetailIcon />
                    </ActionButtonsDetailContainer>
                </Link>
            )}

            {!hideUpdate && (
                <Link href={updateLink}>
                    <ActionButtonsDetailContainer>
                        <ActionButtonsEditIcon />
                    </ActionButtonsDetailContainer>
                </Link>
            )}

            {!hideDelete && (
                <ActionButtonsDetailContainer onClick={onDelete}>
                    <ActionButtonsDeleteIcon />
                </ActionButtonsDetailContainer>
            )}

            {!hideValidate && (
                <Link href={validateLink}>
                    <ActionButtonsValidateContainer>
                        <ActionButtonsValidateIcon />
                    </ActionButtonsValidateContainer>
                </Link>
            )}
        </ActionButtonsContainer>
    );
};

export default ActionButtons;
