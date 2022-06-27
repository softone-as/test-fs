import { format } from 'date-fns';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { id } from 'date-fns/locale';

import { ErrorType } from '../modules/Common/Entity/Common';

import { toastOption } from '../Enums/Toast';

export const getParams = (url: string, paramsName: string): string => {
    const currentUrl = new URL(url);
    const params = new URLSearchParams(currentUrl.search);
    const paramsValue = params.get(paramsName); // 'chrome-instant'
    return paramsValue;
};

export const getCurrentQueryParams = (): any => {
    const params = new URLSearchParams(window.location.search);

    const paramsObj = Array.from(params.keys()).reduce(
        (acc, val) => ({ ...acc, [val]: params.get(val) }),
        {},
    );

    return paramsObj;
};

export const formatDate = (
    date: string | Date,
    pattern = "dd MMMM YYY HH:mm 'WIB'",
): string => {
    return format(new Date(date), pattern, {
        locale: id,
    });
};

export const formatDateID = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('id-id', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatDateTimeID = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('id-id', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
};

export const getBooleanValue = (value: 1 | 0): string => {
    return value === 1 ? 'Yes' : 'No';
};

export const formatCurrency = (number: number): string => {
    return number?.toLocaleString('id-Id', {
        style: 'currency',
        currency: 'idr',
    });
};

export const capitalizeEachWord = (text: string): string => {
    return text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const setServerError = (
    error: ErrorType,
    setError: UseFormSetError<any>,
): void => {
    if (error?.statusCode === 422 && error?.errors?.length > 0) {
        // set server error validation
        error?.errors.map((err) => {
            setError(err.property as unknown as never, {
                type: 'server',
                message: err.message,
            });
        });
    } else if (error?.message) {
        toast.error(error.message, {
            ...toastOption,
        });
    }
};

export const notifySuccess = (text: string): React.ReactText =>
    toast.success(text, toastOption);

export const notifyError = (text: string): React.ReactText =>
    toast.error(text, toastOption);

export const confirmDelete = (): boolean => {
    return confirm('Anda yakin akan menghapus data ini?');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const transformArrayToCommaSeparated = (data: any): string => {
    const result = data
        ?.replaceAll('"', '')
        ?.replaceAll('[', '')
        ?.replaceAll(']', '');
    return result;
};
