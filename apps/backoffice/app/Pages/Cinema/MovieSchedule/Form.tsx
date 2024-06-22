import { Button, DatePicker, Form, InputNumber, Select } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import {
    TCMovieScheduleFormProps,
    MovieScheduleCreateSchema,
} from 'apps/backoffice/@contracts/cinema/movie-schedule/movie-schedule-create.contract';
import {
    createMovieSchedule,
    editMovieSchedule,
} from 'apps/backoffice/app/Modules/Cinema/MovieSchedule/Action';
import React, { useContext, useState } from 'react';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { Route } from '../../../Common/Route/Route';
import { Section } from '../../../Components/molecules/Section';
import { FormContainer } from '../../../Components/organisms/FormContainer';
import { AppContext } from '../../../Contexts/App';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaPage } from '../../../Modules/Common/Entities';
import dayjs from 'dayjs';

const FormMovieSchedulePage: TInertiaPage<TCMovieScheduleFormProps> = (
    props,
) => {
    const zodSync = createSchemaFieldRule(MovieScheduleCreateSchema);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { notifyNavigating } = useContext(AppContext);

    const onFinish = async (data): Promise<void> => {
        setIsLoading(true);

        try {
            await form.validateFields();
            props?.isUpdate && props.data?.id
                ? editMovieSchedule(props.data.id, data)
                : createMovieSchedule(data);
            notifyNavigating && notifyNavigating();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout
            title={
                props?.isUpdate
                    ? 'Edit Movie Schedule'
                    : 'Add New Movie Schedule'
            }
            breadcrumbs={
                props?.isUpdate
                    ? Breadcrumbs.MovieSchedules.EDIT(props?.data?.id as number)
                    : Breadcrumbs.MovieSchedules.CREATE
            }
        >
            <Section>
                <FormContainer
                    initialValues={
                        props?.isUpdate
                            ? {
                                  movieId: props?.data?.movie?.id,
                                  studioId: props?.data?.studio?.id,
                                  price: props?.data?.price,
                                  startTime: dayjs(props?.data?.startTime),
                                  endTime: dayjs(props?.data?.endTime),
                                  date: dayjs(props?.data?.date),
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
                            href={Route.MovieSchedules}
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
                    <Form.Item label="Movie" name="movieId" rules={[zodSync]}>
                        <Select
                            options={props.movies}
                            placeholder="Pilih movie"
                        />
                    </Form.Item>
                    <Form.Item label="Studio" name="studioId" rules={[zodSync]}>
                        <Select
                            options={props.studios}
                            placeholder="Pilih studio"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[zodSync]}
                    >
                        <DatePicker
                            picker="time"
                            format="HH:mm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="End Time"
                        name="endTime"
                        rules={[zodSync]}
                    >
                        <DatePicker
                            picker="time"
                            format="HH:mm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Price" name="price" rules={[zodSync]}>
                        <InputNumber
                            placeholder="Input price"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Date" name="date" rules={[zodSync]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </FormContainer>
            </Section>
        </MainLayout>
    );
};

export default FormMovieSchedulePage;
