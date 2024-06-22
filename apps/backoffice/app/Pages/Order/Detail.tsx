import { EditOutlined } from '@ant-design/icons';
import { Descriptions, Space } from 'antd';
import { TCOrderDetailProps } from 'apps/backoffice/@contracts/order/order/order-detail.contract';
import React, { useMemo } from 'react';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { Route, route } from '../../Common/Route/Route';
import { Button } from '../../Components/atoms/Button';
import { Section } from '../../Components/molecules/Section';
import { DataTable } from '../../Components/organisms/DataTable';
import { MainLayout } from '../../Layouts/MainLayout';
import { TInertiaPage } from '../../Modules/Common/Entities';
import { defaultSizeSpace } from '../../Utils/theme';
import { formatDate } from '../../Utils/utils';

const OrderDetailPage: TInertiaPage<TCOrderDetailProps> = (props) => {
    const { data } = props;

    const orderItemColumns = [
        {
            title: 'No',
            key: 'no',
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Movie',
            dataIndex: 'movie',
            key: 'movie',
        },
        {
            title: 'Studio',
            dataIndex: 'studio',
            key: 'studio',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => formatDate(date, 'dd MMM yyyy'),
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (startTime) => formatDate(startTime, 'HH:mm'),
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (endTime) => formatDate(endTime, 'HH:mm'),
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Sub Total Price',
            dataIndex: 'subTotalPrice',
            key: 'subTotalPrice',
        },
    ];

    const dataTableOrderItem = useMemo(() => {
        return data.orderItems.map((orderItem) => ({
            movie: orderItem.movieSchedule?.movie?.title,
            studio: orderItem.movieSchedule?.studio?.studioNumber,
            date: orderItem.movieSchedule?.date,
            startTime: orderItem.movieSchedule?.startTime,
            endTime: orderItem.movieSchedule?.endTime,
            qty: orderItem.qty,
            price: orderItem.price,
            subTotalPrice: orderItem.subTotalPrice,
            key: orderItem.id,
        }));
    }, [data.orderItems]);

    return (
        <MainLayout
            title="Detail Order"
            breadcrumbs={Breadcrumbs.Order.DETAIL(props.data.id as number)}
            topActions={
                <Button
                    type="primary"
                    href={route(Route.OrderEdit, { id: props.data.id })}
                    icon={<EditOutlined />}
                >
                    Edit
                </Button>
            }
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="Order Info">
                    <Descriptions size="small" bordered column={2}>
                        <Descriptions.Item label="User">
                            {data.user?.fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Item Price">
                            {data?.totalItemPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Method">
                            {data?.paymentMethod}
                        </Descriptions.Item>
                    </Descriptions>
                </Section>

                <Section title="Order Items">
                    <DataTable
                        columns={orderItemColumns}
                        dataSource={dataTableOrderItem}
                        scroll={{ x: 'max-content' }}
                        showSearch={false}
                        showRowSelection={false}
                    />
                </Section>
            </Space>
        </MainLayout>
    );
};

export default OrderDetailPage;
