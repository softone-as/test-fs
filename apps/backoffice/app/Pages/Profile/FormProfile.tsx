import { Button, DatePicker, Form, Input, Radio } from 'antd';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { createYupSync } from '../../Utils/utils';
import { PageHeader } from '../../Components/molecules/Headers';
import { FormContainer } from '../../Components/organisms/FormContainer';
import { MainLayout as Layout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { Section } from '../../Components/molecules/Section';
import { AppContext } from '../../Contexts/App';
import { IProfileForm } from '../../Modules/Profile/Entities';
import { editProfile } from '../../Modules/Profile/Action';
import { IUser } from '../../Modules/User/Entities';
import { GenderEnum } from '../../../../../interface-models/iam/user.interface'

const schema: yup.SchemaOf<IProfileForm> = yup.object().shape({
    fullname: yup.string().required('Field fullname is required'),
    email: yup.string().email().required('Field email is required'),
    phoneNumber: yup.string().required('Field phone number is required'),
    identityNumber: yup.string().required('Field identityNumber is required'),
    gender: yup.string().optional(),
    birthDate: yup.string().optional(),
})

interface IProps extends TInertiaProps {
    data: IUser,
}

const FormProfilePage: React.FC = (props: IProps) => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const { notifyNavigating } = useContext(AppContext)

    const onFinish = async () => {
        setIsLoading(true)
        const data = form.getFieldsValue()

        try {
            await form.validateFields()
            // TODO: do post API
            editProfile(data)
            notifyNavigating()
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
        }
    };

    const onReset = () => {
        form.resetFields()
    }

    const { fullname, email, phoneNumber, identityNumber, gender, birthDate } = props.data

    return (
        <Layout breadcrumbItems={Breadcrumbs.Profile.EDIT}>
            <PageHeader title='Edit Profile' />

            <Section>
                <FormContainer
                    onFinish={onFinish}
                    form={form}
                    layout='vertical'
                    centered
                    buttonAction={[
                        <Button onClick={onReset}>
                            Discard
                        </Button>,
                        <Button type="primary" htmlType="submit" disabled={form.getFieldsError().filter(({ errors }) => errors.length).length > 0 && isLoading}  >
                            Submit
                        </Button>
                    ]}
                >
                    <Form.Item label="Full Name" name='fullname' rules={[yupSync]} required>
                        <Input placeholder='Input' defaultValue={fullname} />
                    </Form.Item>

                    <Form.Item label="Email" name='email' rules={[yupSync]} required>
                        <Input type='email' placeholder='Input' defaultValue={email} />
                    </Form.Item>

                    <Form.Item label="Phone Number" name='phoneNumber' rules={[yupSync]} required>
                        <Input placeholder='Input' defaultValue={phoneNumber} />
                    </Form.Item>

                    <Form.Item label="Identity Number" name='identityNumber' rules={[yupSync]} required>
                        <Input placeholder='Input' defaultValue={identityNumber} />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        required
                    >
                        <Radio.Group>
                            <Radio.Button defaultChecked={GenderEnum.LakiLaki == gender} value={GenderEnum.LakiLaki}>{GenderEnum.LakiLaki}</Radio.Button>
                            <Radio.Button defaultChecked={GenderEnum.Perempuan == gender} value={GenderEnum.Perempuan}>{GenderEnum.Perempuan}</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Birth Date" name='birthDate' rules={[yupSync]}>
                        <DatePicker defaultValue={birthDate as any} />
                    </Form.Item>

                </FormContainer>
            </Section>
        </Layout >
    );
};

export default FormProfilePage;
