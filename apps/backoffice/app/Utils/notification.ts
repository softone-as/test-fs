import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification/interface';

type INotifData = ArgsProps;

export const useNotification = (data: INotifData) => {
    return notification.open({
        ...data,
        type: data.type,
        message: data.message,
        description: data.description,
        duration: 1.5,
    });
};
