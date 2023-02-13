import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification/interface';

type TNotifData = ArgsProps;

export const useNotification = (data: TNotifData) => {
    return notification.open({
        ...data,
        type: data.type,
        message: data.message,
        description: data.description,
        duration: 1.5,
    });
};

export const getNotificationResponse = (
    type: ArgsProps['type'],
    message: string,
) => {
    return useNotification({
        type,
        message,
    });
};
