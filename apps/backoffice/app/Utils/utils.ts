import { useMediaQuery } from 'react-responsive';
import { TErrorProps, TValidationError } from '../Modules/Inertia/Entities';
import { notification } from 'antd';
import { format } from 'date-fns';
import { TMDB_IMAGE_URL } from '../Modules/TMDB/constants';
import { IPermission } from 'interface-models/iam/permission.interface';

export const isMobileScreen = (): boolean => {
    return useMediaQuery({ query: '(max-width: 767px)' });
};

export const setServerError = (
    error: TErrorProps,
    setFields: (fields: any[]) => void,
): void => {
    const fieldErrors = error?.errors as TValidationError[];
    if (error?.statusCode === 422 && fieldErrors?.length > 0) {
        // set server error validation
        fieldErrors?.map((err) => {
            setFields([
                {
                    name: err.property,
                    errors: err.message,
                },
            ]);
        });
    } else if (error?.message) {
        notification.error({
            message: error.message,
        });
    }
};

export const formatDate = (
    date: string | Date | null | undefined,
    pattern = 'yyyy-MM-dd H:i:s',
): string => {
    if (!date) return '';
    return format(new Date(date), pattern);
};

export const debounce = (
    fn: (...args: any[]) => any,
    delay: number,
): ((...args: any[]) => void) => {
    let timer;
    return (...args: any[]): void => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

export const truncate = (str: string, n: number): string => {
    return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

export const formatUrlImage = (url: string, isTMDB?: boolean): string => {
    const localUrl = `/${url.split('/').pop()}`;
    return isTMDB ? `${TMDB_IMAGE_URL}/${url}` : localUrl;
};

export const isPermissionExist = (
    permissions: IPermission[],
    permission: string | string[],
): boolean => {
    if (typeof permission === 'string') {
        return permissions?.some((item) => item.key === permission);
    }
    return permissions?.some((item) => permission.includes(item.key));
};
