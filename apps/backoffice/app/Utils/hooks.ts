import { useEffect, useRef, useState, useMemo } from 'react';
import { Inertia } from '@inertiajs/inertia';

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

type PropsParams = {
    [K: string]: string | number | boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useTableFilter = <T = any>() => {
    const [status, setStatus] = useState({
        isFetching: false,
    });

    const [filters, setFilters] = useState(() => {
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
    );

    return {
        setQueryParams: (propsParams: PropsParams) => {
            const data = {
                ...existingParams,
                ...propsParams,
            };
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
        // implementFilterTable: (
        //     pagination: TablePaginationConfig,
        //     filterTable: Record<string, FilterValue>,
        //     sorter: SorterResult<T>,
        // ) => {
        //     const tableFilters = {};
        //     if (!Number.isNaN(pagination.current))
        //         tableFilters["page"] = pagination.current;
        //     if (!Number.isNaN(pagination.pageSize))
        //         tableFilters["per_page"] = pagination.pageSize;

        //     if (sorter?.order) {
        //         if (sorter?.columnKey) tableFilters["sort"] = sorter?.columnKey;

        //         if (sorter.order === "ascend") tableFilters["order"] = "asc";
        //         else if (sorter.order === "descend")
        //             tableFilters["order"] = "desc";
        //     } else {
        //         tableFilters["sort"] = undefined;
        //         tableFilters["order"] = undefined;
        //     }

        //     const data = { ...existingParams, ...tableFilters };

        //     setFilters(data);
        //     Inertia.visit(window.location.pathname, {
        //         data: data,
        //         preserveState: true,
        //         preserveScroll: true,
        //         replace: true,
        //         onBefore: () => {
        //             setStatus({
        //                 isFetching: true,
        //             });
        //         },
        //         onFinish: () => {
        //             setStatus({
        //                 isFetching: false,
        //             });
        //         },
        //     });
        // },
        filters: filters as Record<any, string>,
        status,
    };
};
