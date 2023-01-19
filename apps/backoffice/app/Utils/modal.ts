import { Modal } from 'antd';
import type { ModalFuncProps } from 'antd';

type IPropsModal = ModalFuncProps;

export const useModal = (props: IPropsModal) => {
    return Modal[props.type]({
        ...props,
    });
};
