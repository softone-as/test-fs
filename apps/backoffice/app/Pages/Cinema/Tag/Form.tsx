import { Button, Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import {
    TCTagFormProps,
    TagCreateSchema,
} from 'apps/backoffice/@contracts/cinema/tag/tag-create.contract';
import {
    createTag,
    editTag,
} from 'apps/backoffice/app/Modules/Cinema/Tag/Action';
import React, { useContext, useState } from 'react';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { Route } from '../../../Common/Route/Route';
import { Section } from '../../../Components/molecules/Section';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { AppContext } from '../../../Contexts/App';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaPage } from '../../../Modules/Common/Entities';

const FormTagPage: TInertiaPage<TCTagFormProps> = (props) => {
    const zodSync = createSchemaFieldRule(TagCreateSchema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (data): Promise<void> => {
        setIsLoading(true);

        try {
            await form.validateFields();
            props?.isUpdate && props.data?.id
                ? editTag(props.data.id, data)
                : createTag(data);
            notifyNavigating && notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout
            title={props?.isUpdate ? 'Edit Tag' : 'Add New Tag'}
            breadcrumbs={
                props?.isUpdate
                    ? Breadcrumbs.Tags.EDIT(props?.data?.id as number)
                    : Breadcrumbs.Tags.CREATE
            }
        >
            <Section>
                <FormContainer
                    initialValues={
                        props?.isUpdate ? { name: props.data?.name } : undefined
                    }
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    centered
                    buttonAction={[
                        <Button
                            key="cancel"
                            href={Route.Tags}
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
                        label="Name"
                        name="name"
                        rules={[zodSync]}
                        required
                    >
                        <Input placeholder="Input name" />
                    </Form.Item>
                </FormContainer>
            </Section>
        </MainLayout>
    );
};

export default FormTagPage;
