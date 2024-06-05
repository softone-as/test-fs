import { notification as antNotification } from 'antd';
import type { ArgsProps } from 'antd/es/notification/interface';

type TNotifData = ArgsProps;

export const notification = (data: TNotifData): void => {
    return antNotification.open({
        ...data,
        type: data.type,
        message: data.message,
        description: data.description,
        duration: 1.5,
    });
};
