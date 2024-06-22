import { CloseCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Form,
    Grid,
    Input,
    InputNumber,
    Row,
    Select,
    Typography,
} from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import {
    OrderCreateSchema,
    TCOrderFormProps,
} from 'apps/backoffice/@contracts/order/order/order-create.contract';
import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { Route } from '../../Common/Route/Route';
import { Section } from '../../Components/molecules/Section';
import { AppContext } from '../../Contexts/App';
import { MainLayout } from '../../Layouts/MainLayout';
import { TInertiaPage } from '../../Modules/Common/Entities';
import { createOrder, editOrder } from '../../Modules/Order/Order/Action';

const FormOrderPage: TInertiaPage<TCOrderFormProps> = (props) => {
    const zodSync = createSchemaFieldRule(OrderCreateSchema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);
    const screens = Grid.useBreakpoint();

    const onFinish = async (data): Promise<void> => {
        setIsLoading(true);

        try {
            await form.validateFields();

            props.isUpdate && props.data?.id
                ? editOrder(props.data.id, data)
                : createOrder(data);
            notifyNavigating && notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const orderItemsWatch = Form.useWatch('orderItems', form);

    useEffect(() => {
        if (orderItemsWatch && orderItemsWatch.length > 0) {
            form.setFieldsValue({
                orderItems: orderItemsWatch.map((orderItem) => {
                    return {
                        ...orderItem,
                        subTotalPrice: orderItem?.qty * orderItem?.price || 0,
                    };
                }),
            });
        }
    }, [orderItemsWatch]);

    useEffect(() => {
        if (orderItemsWatch && orderItemsWatch.length > 0) {
            const totalItemPrice = orderItemsWatch.reduce((acc, orderItem) => {
                return acc + orderItem?.subTotalPrice;
            }, 0);
            form.setFieldsValue({ totalItemPrice });
        }
    }, [orderItemsWatch]);

    return (
        <MainLayout
            title={props.isUpdate ? 'Edit Order' : 'Add New Order'}
            breadcrumbs={
                props.isUpdate
                    ? Breadcrumbs.Order.EDIT(props?.id as number)
                    : Breadcrumbs.Order.CREATE
            }
        >
            <Section>
                <Form
                    initialValues={
                        props?.isUpdate
                            ? {
                                  paymentMethod: props?.data?.paymentMethod,
                                  totalItemPrice: props?.data?.totalItemPrice,
                                  orderItems: props?.data?.orderItems?.map(
                                      (orderItem) => ({
                                          movieScheduleId:
                                              orderItem?.movieSchedule?.id,
                                          qty: orderItem?.qty,
                                          price: orderItem?.price,
                                          subTotalPrice:
                                              orderItem?.subTotalPrice,
                                      }),
                                  ),
                              }
                            : {
                                  orderItems: [
                                      {
                                          movieScheduleId: undefined,
                                          qty: undefined,
                                          price: undefined,
                                          subTotalPrice: undefined,
                                          snapshots: undefined,
                                      },
                                  ],
                              }
                    }
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    disabled={isLoading}
                >
                    <Form.Item
                        label="Payment Method"
                        name="paymentMethod"
                        rules={[zodSync]}
                        required
                    >
                        <Select
                            placeholder="Pilih payment method"
                            options={props.paymentMethods}
                        />
                    </Form.Item>

                    <Typography.Title level={4}>Order Items</Typography.Title>
                    <Form.List name="orderItems">
                        {(fields, { add, remove }): React.ReactNode => (
                            <>
                                {fields.map((field) => (
                                    <Row gutter={[24, 0]} wrap={!screens.lg}>
                                        <Col
                                            flex={
                                                screens.lg
                                                    ? '0 1 450px'
                                                    : undefined
                                            }
                                            span={24}
                                        >
                                            <Form.Item
                                                key={field.key}
                                                label="Movie Schedule"
                                                name={[
                                                    field.name,
                                                    'movieScheduleId',
                                                ]}
                                                rules={[zodSync]}
                                                required
                                            >
                                                <Select
                                                    options={
                                                        props?.movieSchedules
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            flex={
                                                screens.lg
                                                    ? '0 1 150px'
                                                    : undefined
                                            }
                                            span={24}
                                        >
                                            <Form.Item
                                                key={field.key}
                                                label="Quantity"
                                                name={[field.name, 'qty']}
                                                rules={[zodSync]}
                                                required
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            flex={
                                                screens.lg
                                                    ? '0 1 200px'
                                                    : undefined
                                            }
                                            span={24}
                                        >
                                            <Form.Item
                                                key={field.key}
                                                label="Price"
                                                name={[field.name, 'price']}
                                                rules={[zodSync]}
                                                required
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            flex={
                                                screens.lg
                                                    ? '0 1 200px'
                                                    : undefined
                                            }
                                            span={24}
                                        >
                                            <Form.Item
                                                key={field.key}
                                                label="Subtotal Price"
                                                name={[
                                                    field.name,
                                                    'subTotalPrice',
                                                ]}
                                                rules={[zodSync]}
                                                required
                                            >
                                                <InputNumber
                                                    disabled
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            flex={
                                                screens.lg
                                                    ? '0 1 40px'
                                                    : undefined
                                            }
                                            span={24}
                                            style={{
                                                minWidth: 'unset',
                                                display: screens.lg
                                                    ? 'flex'
                                                    : undefined,
                                                alignItems: 'center',
                                            }}
                                        >
                                            {fields.length > 1 && (
                                                <div>
                                                    <CloseCircleOutlined
                                                        onClick={(): void =>
                                                            remove(field.name)
                                                        }
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: '21px',
                                                            display: 'flex',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={(): void => add()}
                                        block
                                    >
                                        Add Order Item
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item
                        label="Total Item Price"
                        name="totalItemPrice"
                        rules={[zodSync]}
                        required
                    >
                        <Input disabled />
                    </Form.Item>

                    <Row justify="end">
                        <Button
                            key="cancel"
                            href={Route.Orders}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Section>
        </MainLayout>
    );
};

export default FormOrderPage;
