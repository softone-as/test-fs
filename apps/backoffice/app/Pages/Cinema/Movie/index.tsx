import React, { useState } from 'react';

import {
    CalendarOutlined,
    PlusOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { DatePicker, Form, Modal, Popover, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TCMovieIndexProps } from 'apps/backoffice/@contracts/cinema/movie/movie-index.contract';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';
import { MovieIndexRequest } from 'apps/backoffice/src/modules/cinema/requests/movie/movie-index.request';
import dayjs from 'dayjs';
import { IMovie } from 'interface-models/movie/movie.interface';
import { Route, route } from '../../../Common/Route/Route';
import { RowActionButtons } from '../../../Components/molecules/RowActionButtons';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { TInertiaPage } from '../../../Modules/Common/Entities';
import { useTableFilter } from '../../../Utils/hooks';
import { isMobileScreen, truncate } from '../../../Utils/utils';
import { showModal } from '../../../Utils/modal';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { MainLayout } from '../../../Layouts/MainLayout';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { FORMAT_DATE_BASE } from '../../../Common/Constants/formatter.constant';
import {
    deleteBulkMovie,
    deleteMovie,
    sync,
} from '../../../Modules/Cinema/Movie/Action';
import { createSchemaFieldRule } from 'antd-zod';
import { useBulkUpdateSchedule } from '../../../Modules/Cinema/Movie/hooks';
import { MovieBulkUpdatePlayUntilSchema } from 'apps/backoffice/@contracts/cinema/movie/movie-edit.contract';

const MoviesPage: TInertiaPage<TCMovieIndexProps> = (props) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<MovieIndexRequest>();
    const isMobile = isMobileScreen();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
    const zodSync = createSchemaFieldRule(MovieBulkUpdatePlayUntilSchema);
    const [form] = Form.useForm();

    const columns: ColumnsType<IMovie> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'title',
                order: filters.order,
                sort: filters.sort,
            }),
        },
        {
            title: 'Overview',
            dataIndex: 'overview',
            key: 'overview',
            render: (overview): React.ReactNode => {
                if (overview.length < 20) return overview;

                return (
                    <Popover content={overview}>
                        {truncate(overview, 20)}
                    </Popover>
                );
            },
        },
        {
            title: 'Tag',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags) =>
                tags?.map((tag, index) => <Tag key={index}>{tag.name}</Tag>),
        },
        {
            title: 'Play Until',
            key: 'playUntil',
            dataIndex: 'playUntil',
            render: (playUntil) =>
                playUntil ? dayjs(playUntil).format(FORMAT_DATE_BASE) : '-',
        },
        {
            title: isMobile ? null : 'Action',
            key: 'action',
            width: '142px',
            render: (text, record): React.ReactNode => {
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: route(Route.MovieDetail, {
                                    id: record.id,
                                }),
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: route(Route.MovieEdit, { id: record.id }),
                                title: 'edit',
                            },
                            {
                                type: 'delete',
                                title: 'delete',
                                onClick: (): void => {
                                    showModal({
                                        title: 'Are You Sure? ',
                                        type: 'confirm',
                                        variant: 'danger',
                                        onOk: () =>
                                            deleteMovie(record.id as number),
                                    });
                                },
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const batchActionMenus: ItemType[] = [
        {
            key: 'delete',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                showModal({
                    title: 'Are You Sure?',
                    type: 'confirm',
                    variant: 'danger',
                    onOk: () =>
                        selectedRowKeys && deleteBulkMovie(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
        },
        {
            key: 'reschedule',
            label: 'Update Schedule',
            onClick: (_, selectedRowKeys): void => {
                selectedRowKeys && setSelectedRowKeys(selectedRowKeys);
                setIsRescheduling(true);
            },
            icon: <CalendarOutlined />,
        },
    ];

    const defaultValuePlayUntil = filters?.playUntil
        ?.split(',')
        .map((date) => dayjs(date)) as [dayjs.Dayjs, dayjs.Dayjs];

    const callbackReschedule = (): void => {
        setIsRescheduling(false);
        setSelectedRowKeys([]);
        form.resetFields();
    };

    const { onReschedule, isLoading } = useBulkUpdateSchedule({
        form,
        notifyNavigating: () => {
            setIsRescheduling(false);
        },
        movieIds: selectedRowKeys as [number, ...number[]],
        callback: callbackReschedule,
    });

    return (
        <MainLayout
            title="Movie List"
            topActions={[
                <Button
                    key="add"
                    icon={<PlusOutlined />}
                    href={Route.MovieCreate}
                    type="primary"
                >
                    New Movie
                </Button>,
                <Button
                    key="sync"
                    icon={<PlusOutlined />}
                    onClick={(): void => {
                        showModal({
                            title: 'Are You Sure?',
                            type: 'confirm',
                            variant: 'primary',
                            onOk: () => sync(),
                        });
                    }}
                    type="primary"
                >
                    Sync
                </Button>,
            ]}
        >
            <Modal
                title="Reschedule Movie"
                open={isRescheduling}
                onCancel={(): void => setIsRescheduling(false)}
                onOk={onReschedule}
                centered
                okButtonProps={{
                    loading: isLoading,
                }}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Play Until"
                        name="playUntil"
                        rules={[zodSync]}
                        required
                    >
                        <DatePicker />
                    </Form.Item>
                </Form>
            </Modal>

            <DataTable
                batchActionMenus={batchActionMenus}
                filterComponents={[
                    {
                        label: 'Tag',
                        type: 'Select',
                        name: 'tagId',
                        placeholder: 'Tag',
                        options: props.tags,
                        defaultValue: filters?.tagId,
                        width: 100,
                    },
                    {
                        label: 'Play Until',
                        type: 'DateRangePicker',
                        name: 'playUntil',
                        range: 10,
                        defaultValue: defaultValuePlayUntil,
                    },
                ]}
                onChange={implementTableFilter}
                columns={columns}
                dataSource={props.data}
                rowKey="id"
                search={filters.search}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default MoviesPage;
