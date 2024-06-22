import React from 'react';

import { PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TCOrderIndexProps } from 'apps/backoffice/@contracts/order/order/order-index.contract';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';
import { OrderIndexRequest } from 'apps/backoffice/src/modules/order/requests/order/order-index.request';
import { IOrder } from 'interface-models/order/order.interface';
import { Route, route } from '../../Common/Route/Route';
import { RowActionButtons } from '../../Components/molecules/RowActionButtons';
import { DataTable } from '../../Components/organisms/DataTable';
import { paginationTransform } from '../../Components/organisms/DataTable/DataTable';
import { ItemType } from '../../Components/organisms/DataTable/Entities';
import { MainLayout } from '../../Layouts/MainLayout';
import { TInertiaPage } from '../../Modules/Common/Entities';
import { deleteBulkOrder, deleteOrder } from '../../Modules/Order/Order/Action';
import { useTableFilter } from '../../Utils/hooks';
import { showModal } from '../../Utils/modal';
import { isMobileScreen } from '../../Utils/utils';

const OrdersPage: TInertiaPage<TCOrderIndexProps> = (props) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<OrderIndexRequest>();
    const isMobile = isMobileScreen();

    const columns: ColumnsType<IOrder> = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (user): React.ReactNode => user?.fullname,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (paymentMethod) => paymentMethod?.toUpperCase(),
        },
        {
            title: 'Total Item Price',
            dataIndex: 'totalItemPrice',
            key: 'totalItemPrice',
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
                                href: route(Route.OrderDetail, {
                                    id: record.id,
                                }),
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: route(Route.OrderEdit, { id: record.id }),
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
                                            deleteOrder(record.id as number),
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
                        selectedRowKeys && deleteBulkOrder(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
        },
    ];

    return (
        <MainLayout
            title="Order List"
            topActions={[
                <Button
                    key="add"
                    icon={<PlusOutlined />}
                    href={Route.OrderCreate}
                    type="primary"
                >
                    New Order
                </Button>,
            ]}
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                filterComponents={[
                    {
                        label: 'Payment method',
                        type: 'Select',
                        name: 'paymentMethod',
                        placeholder: 'Payment method',
                        options: props.paymentMethods,
                        defaultValue: filters?.paymentMethod,
                        width: 150,
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

export default OrdersPage;
