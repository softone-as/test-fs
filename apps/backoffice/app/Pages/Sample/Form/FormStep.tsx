
import { CheckCircleFilled, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form, FormProps,
    Input,
    Row,
    Select,
    Space,
    Steps,
    Typography,
    Upload
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

import { PageHeader } from '../../../Components/molecules/Headers';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';

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

/* eslint-disable @typescript-eslint/naming-convention */
function FormStep<T extends object = any>(props: FormProps<T>): JSX.Element {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = async (values: any) => {
        setIsLoading(true)
        await form.validateFields()
        setIsLoading(false)
        console.log('Received values of form: ', values);
    };

    const description = 'This is a description.';

    return (
        <Layout >
            <PageHeader title='Add Data' />
            <Row justify='center' style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Finished',
                            description,
                        },
                        {
                            title: 'In Progress',
                            description,
                        },
                        {
                            title: 'Waiting',
                            description,
                        },
                    ]}
                    style={{ margin: '2rem 4rem' }}
                />
                {current < 2 ? (
                    <Form
                        {...props}
                        initialValues={{ prefix: '62', name: 'John Doe', division: ['Industry'], suffix: 'USD' }}
                        onFinish={onFinish}
                        style={{ width: 550, margin: '2em 0' }}
                        form={form}
                        layout='vertical'
                        requiredMark='optional'
                    >
                        <Typography.Paragraph style={{ opacity: '65%' }}>
                            These are instructions in the form layout to fill in the fields so that they conform to the rules
                        </Typography.Paragraph>

                        <Form.Item label="Name" name='name' required>
                            <Input placeholder='Input' />
                        </Form.Item>

                        <Form.Item
                            name="division"
                            label="Division"
                            required
                        >
                            <Select placeholder="Select" mode='multiple'>
                                <Option value="Industry">Department of Industry</Option>
                                <Option value="Business">Department of Business</Option>
                                <Option value="IT">Department of Information and Technology</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            tooltip='Distinctively monetize cost effective networks for cross-media bandwidth'
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="Description" name='description' >
                            <TextArea placeholder='Textarea' />
                        </Form.Item>

                        <Form.Item
                            name="upload"
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            tooltip='upload file'
                        >
                            <Upload name="logo" action="/upload.do">
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>

                        <Row justify='end'>
                            <Space>
                                <Button type='link'>
                                    Cancel
                                </Button>
                                <Button onClick={prev}>
                                    Previous
                                </Button>
                                <Button type="primary" htmlType="submit" disabled={isLoading} onClick={next}>
                                    Next
                                </Button>
                            </Space>
                        </Row>
                    </Form>
                ) : (
                    <Space direction='vertical' align='center' style={{ padding: '4rem', textAlign: 'center' }}>
                        <CheckCircleFilled style={{ fontSize: 63, color: '#52C41A' }} />

                        <Typography.Title level={2} style={{ marginTop: '1rem', marginBottom: 0 }}>
                            This is result title
                        </Typography.Title>

                        <Typography.Paragraph style={{ opacity: '45%' }} >
                            Objectively scale orthogonal collaboration and idea-sharing after enterprise-wide manufactured products.
                            <br />Compellingly strategize high-quality niche markets through sustainable.
                        </Typography.Paragraph>

                        <Button type='primary'>
                            Ok
                        </Button>
                    </Space>
                )}
            </Row>
        </Layout>
    )
}


export default FormStep;
