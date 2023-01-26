import { Modal } from 'antd';
import type { ModalFuncProps } from 'antd';

type TPropsModal = ModalFuncProps;

export const useModal = (props: TPropsModal) => {
    return Modal[props.type]({
        ...props,
    });
};
