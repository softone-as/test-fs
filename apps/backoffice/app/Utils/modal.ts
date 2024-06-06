import { Modal, ModalFuncProps } from 'antd';
import { themeColors } from './theme';

type TPropsModal = ModalFuncProps & {
    variant?: 'danger' | 'primary';
};

export const showModal = (
    props: TPropsModal,
): {
    destroy: () => void;
    update: (configUpdate) => void;
} | void => {
    const getStyleOnOkButton = (
        variant: TPropsModal['variant'],
    ): Record<string, any> | undefined => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: themeColors.primary,
                    borderColor: themeColors.primary,
                };

            case 'danger':
                return {
                    backgroundColor: themeColors.error,
                    borderColor: themeColors.error,
                };

            default:
                break;
        }
    };

    if (!props.type) {
        return;
    }

    return Modal[props.type]({
        ...props,
        okButtonProps: {
            style: {
                ...props.okButtonProps,
                ...getStyleOnOkButton(props.variant),
            },
            className: 'btn-modal',
        },
        cancelButtonProps: {
            className: 'btn-modal btn-modal__cancel',
        },
    });
};
