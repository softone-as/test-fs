import { Button, Form, Input, Select, Upload } from 'antd';
import React, { useContext, useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { TInertiaPage } from '../../../Modules/Common/Entities';
import {
    MovieCreateSchema,
    TCMovieFormProps,
} from 'apps/backoffice/@contracts/cinema/movie/movie-create.contract';
import { AppContext } from '../../../Contexts/App';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { Section } from '../../../Components/molecules/Section';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { MainLayout } from '../../../Layouts/MainLayout';
import { DatePicker } from '../../../Components/molecules/Pickers';
import { Route } from '../../../Common/Route/Route';

import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { createMovie, editMovie } from '../../../Modules/Cinema/Movie/Action';

const FormMoviePage: TInertiaPage<TCMovieFormProps> = (props) => {
    const zodSync = createSchemaFieldRule(MovieCreateSchema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (data): Promise<void> => {
        setIsLoading(true);

        try {
            await form.validateFields();

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('overview', data.overview);
            formData.append('playUntil', data.playUntil);
            formData.append('poster', data.poster);
            data.tags.forEach((tag, index) => {
                formData.append(`tags[${index}]`, tag);
            });

            props.isUpdate && props.data?.id
                ? editMovie(props.data.id, formData)
                : createMovie(formData);
            notifyNavigating && notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleChangeUpload = (
        info: UploadChangeParam<UploadFile<any>>,
    ): void => {
        if (info.file.status === 'removed') {
            form.setFieldValue('poster', undefined);
        } else {
            form.setFieldValue('poster', info.file);
        }
    };

    const defaultFileList: UploadFile<any>[] = props?.isUpdate
        ? [
              {
                  uid: props?.data?.poster as string,
                  name: props?.data?.poster.split('/').pop() as string,
                  url: props?.data?.poster as string,
              },
          ]
        : [];

    return (
        <MainLayout
            title={props.isUpdate ? 'Edit Movie' : 'Add New Movie'}
            breadcrumbs={
                props.isUpdate
                    ? Breadcrumbs.Movies.EDIT(props?.id as number)
                    : Breadcrumbs.Movies.CREATE
            }
        >
            <Section>
                <FormContainer
                    initialValues={
                        props?.isUpdate
                            ? {
                                  ...props.data,
                                  tags: props.data?.tags?.map((tag) => tag.id),
                              }
                            : undefined
                    }
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    centered
                    buttonAction={[
                        <Button
                            key="cancel"
                            href={Route.Movies}
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
                    errors={props.error}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[zodSync]}
                        required
                    >
                        <Input placeholder="Input title" />
                    </Form.Item>

                    <Form.Item
                        label="Overview"
                        name="overview"
                        rules={[zodSync]}
                        required
                    >
                        <Input.TextArea placeholder="Input overview" rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Poster"
                        name="poster"
                        rules={[zodSync]}
                        required
                    >
                        <Upload
                            accept="image/jpg"
                            beforeUpload={(): boolean => false}
                            listType="picture"
                            onChange={handleChangeUpload}
                            maxCount={1}
                            defaultFileList={defaultFileList}
                        >
                            <Button>Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Play Until"
                        name="playUntil"
                        rules={[zodSync]}
                        required
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Tags"
                        name="tags"
                        rules={[zodSync]}
                        required
                    >
                        <Select
                            placeholder="Pilih tag"
                            mode="multiple"
                            options={props.tags}
                        />
                    </Form.Item>
                </FormContainer>
            </Section>
        </MainLayout>
    );
};

export default FormMoviePage;
