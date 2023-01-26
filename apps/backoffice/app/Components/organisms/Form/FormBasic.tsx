
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form, FormProps,
    Input,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Space,
    Switch,
    TimePicker,
    Upload
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const { Option } = Select;

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="62">+62</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

const suffixSelector = (
    <Form.Item name="suffix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
        </Select>
    </Form.Item>
);

type TFormBasic = {
    layout: string
}

/* eslint-disable @typescript-eslint/naming-convention */
function FormBasic<T extends object = TFormBasic>(props: FormProps<T>): JSX.Element {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)

    const wrapperOffset = props.layout == 'vertical' ? 0 : 6

    const onFinish = async (values: any) => {
        setIsLoading(true)
        await form.validateFields()
        console.log(form.validateFields());
        setIsLoading(false)
        console.log('Received values of form: ', values);
    };


    return (
        <Row justify='center' style={{ backgroundColor: '#fff', borderRadius: 8 }}>
            <Form
                {...props}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ prefix: '62', quantity: 3, status: true, suffix: 'USD', rate: 4, aggreement: true, 'checkbox-item': 'A' }}
                onFinish={onFinish}
                style={{ width: 600, margin: '2em 0' }}
                form={form}
                layout={props.layout}
            >
                <Form.Item label="Email" name='email' required>
                    <Input type='email' placeholder='Input' />
                </Form.Item>

                <Form.Item label="Password" name='password' required>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    required
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Description" name='description' required>
                    <TextArea placeholder='Textarea' />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    required
                >
                    <Select placeholder="Select">
                        <Option value="Men">Men</Option>
                        <Option value="Woman">Woman</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="DatePicker" name='date' required>
                    <DatePicker />
                </Form.Item>

                <Form.Item label="Time" name='time' required>
                    <TimePicker />
                </Form.Item>

                <Form.Item label="Quantity" name='quantity' required>
                    <InputNumber />
                </Form.Item>

                <Form.Item name="status" label="Status Active" tooltip="Check status"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item name="button" label="Button" required>
                    <Button>Button</Button>
                </Form.Item>

                <Form.Item label="Price" name='price' required>
                    <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="slider" label="Slider" required>
                    <Slider
                        marks={{
                            0: '0',
                            25: '100',
                            50: '200',
                            75: '300',
                            100: '400',
                        }}
                    />
                </Form.Item>


                <Form.Item name="rate" label="Rate" required>
                    <Rate />
                </Form.Item>

                <Form.Item label="Dragger" tooltip='Upload file' required>
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    required
                >
                    <Radio.Group>
                        <Radio.Button value="a">item 1</Radio.Button>
                        <Radio.Button value="b">item 2</Radio.Button>
                        <Radio.Button value="c">item 3</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="item" label="Item" required>
                    <Radio.Group>
                        <Radio value="a">item 1</Radio>
                        <Radio value="b">item 2</Radio>
                        <Radio value="c">item 3</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="checkbox-item" label="Item" tooltip='Choose at least one' required>
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                    Checbox
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="B" style={{ lineHeight: '32px' }}>
                                    Checbox
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="C" style={{ lineHeight: '32px' }}>
                                    Checbox
                                </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.List
                    name="names"
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item
                                    wrapperCol={{ span: 16 }}
                                    label={'Fields'}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input passenger's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="passenger name" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                            style={{ marginLeft: 6 }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item wrapperCol={{ span: 12, offset: wrapperOffset }}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item name="agreement" valuePropName="checked" wrapperCol={{ offset: wrapperOffset, span: 16 }}>
                    <Checkbox>I have read the agreement</Checkbox>
                </Form.Item>

                <Row justify={props.layout == 'vertical' ? 'start' : 'end'}>
                    <Space>
                        <Button>
                            Discard
                        </Button>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            Submit
                        </Button>
                    </Space>
                </Row>
            </Form>
        </Row>
    )
}


export default FormBasic;
