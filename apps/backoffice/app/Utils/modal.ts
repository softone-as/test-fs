import { Modal } from 'antd';

import type { ModalFuncProps } from 'antd';
import { themeColors } from './theme';

type TPropsModal = ModalFuncProps;

export const useModal = (props: TPropsModal) => {
    return Modal[props.type]({
        ...props,
        okButtonProps: {
            style: {
                backgroundColor: themeColors.primary,
                borderColor: themeColors.primary,
            },
            className: 'btn-modal',
        },
        cancelButtonProps: {
            className: 'btn-modal btn-modal__cancel',
        },
    });
};
