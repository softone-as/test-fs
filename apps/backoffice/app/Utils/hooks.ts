import { useEffect, useRef, useState, useMemo } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { IndexRequest } from '../../src/common/request/index.request';
import { OrderDirectionType } from '../../src/common/enums/index.enum';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDidUpdateEffect = (fn: () => void, inputs: any) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            return fn();
        } else {
            didMountRef.current = true;
        }
    }, inputs);
};

type TOrderAntD = 'ascend' | 'descend' | undefined;

export type TPropsTableFilter<T> = Omit<IndexRequest, 'perPage' | 'order'> & {
    per_page?: number;
    order?: TOrderAntD;
} & T;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useTableFilter = <T>() => {
    const [status, setStatus] = useState({
        isFetching: false,
    });

    const [filters, setFilters] = useState<TPropsTableFilter<T> | any>(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filtersObj = {};
        for (const [key, value] of queryParams.entries()) {
            filtersObj[key] = value;
        }
        return filtersObj;
    });

    const existingParams = useMemo(
        () =>
            Object.keys(filters).reduce(
                (a, c) => (filters[c] ? { ...a, [c]: filters[c] } : a),
                {},
            ),
        [filters],
    ) as TPropsTableFilter<T>;

    const parseOrder = (order: TOrderAntD): OrderDirectionType => {
        switch (order) {
            case 'ascend':
                return 'ASC';
            case 'descend':
                return 'DESC';
            default:
                return undefined;
        }
    };

    return {
        setQueryParams: (propsParams: TPropsTableFilter<T>) => {
            const data = {
                ...existingParams,
                ...propsParams,
                order: parseOrder(propsParams.order),
            } as TPropsTableFilter<T>;

            if (!propsParams.order) {
                delete data.order;
                delete data.sort;
            }

            if (propsParams.search) {
                data.page = 1;
            }

            setFilters(data);
            Inertia.visit(window.location.pathname, {
                data: data,
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onBefore: () => {
                    setStatus({
                        isFetching: true,
                    });
                },
                onFinish: () => {
                    setStatus({
                        isFetching: false,
                    });
                },
            });
        },
        filters: filters as TPropsTableFilter<T>,
        status,
    };
};
