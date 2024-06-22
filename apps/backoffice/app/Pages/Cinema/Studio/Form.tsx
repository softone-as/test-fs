import { Button, Form, InputNumber } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import {
    TCStudioFormProps,
    StudioCreateSchema,
} from 'apps/backoffice/@contracts/cinema/studio/studio-create.contract';
import {
    createStudio,
    editStudio,
} from 'apps/backoffice/app/Modules/Cinema/Studio/Action';
import React, { useContext, useState } from 'react';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { Route } from '../../../Common/Route/Route';
import { Section } from '../../../Components/molecules/Section';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { AppContext } from '../../../Contexts/App';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaPage } from '../../../Modules/Common/Entities';

const FormStudioPage: TInertiaPage<TCStudioFormProps> = (props) => {
    const zodSync = createSchemaFieldRule(StudioCreateSchema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (data): Promise<void> => {
        setIsLoading(true);

        try {
            await form.validateFields();
            props?.isUpdate && props.data?.id
                ? editStudio(props.data.id, data)
                : createStudio(data);
            notifyNavigating && notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout
            title={props?.isUpdate ? 'Edit Studio' : 'Add New Studio'}
            breadcrumbs={
                props?.isUpdate
                    ? Breadcrumbs.Studios.EDIT(props?.data?.id as number)
                    : Breadcrumbs.Studios.CREATE
            }
        >
            <Section>
                <FormContainer
                    initialValues={props?.isUpdate ? props.data : undefined}
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    centered
                    buttonAction={[
                        <Button
                            key="cancel"
                            href={Route.Studios}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>,
                    ]}
                    disabled={isLoading}
                    errors={props?.error}
                >
                    <Form.Item
                        label="Nomor Studio"
                        name="studioNumber"
                        rules={[zodSync]}
                        required
                    >
                        <InputNumber
                            placeholder="Input nomor Studio"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Kapasitas Kursi"
                        name="seatCapacity"
                        rules={[zodSync]}
                        required
                    >
                        <InputNumber
                            placeholder="Input kapasitas kursi"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </FormContainer>
            </Section>
        </MainLayout>
    );
};

export default FormStudioPage;
