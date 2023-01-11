import React from 'react';
import Head from '../../Components/atoms/Commons/Head.atom';
import { Layout, Row, Col } from 'antd'

type TLoginLayout = {
    children: React.ReactNode;
    title: string;
};

// Set context value for Toast Data

const { Content } = Layout;

export const LoginLayout: React.FC<TLoginLayout> = ({ children, title }) => {
    return (
        <>
            {window.location.host !== process.env.STORY_HOST ? <Head title={title} /> : null}
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Row>
                        <Col span={12} offset={6}>
                            {children}
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    )
}


