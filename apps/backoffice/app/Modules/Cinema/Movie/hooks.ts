import { useState } from 'react';
import { bulkUpdatePlayUntil } from './Action';
import { FormInstance } from 'antd';

type TUseReschedulingMovie = {
    form: FormInstance;
    notifyNavigating: () => void;
    movieIds: [number, ...number[]];
    callback: () => void;
};

export const useBulkUpdateSchedule = (props: TUseReschedulingMovie) => {
    const [isLoading, setIsLoading] = useState(false);

    const onReschedule = async () => {
        setIsLoading(true);
        const payload = await props.form.validateFields();
        try {
            bulkUpdatePlayUntil({
                ids: props.movieIds,
                playUntil: payload.playUntil,
            });
            props.notifyNavigating();
            setIsLoading(false);
            props.callback && props.callback();
        } catch (error) {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        onReschedule,
    };
};
