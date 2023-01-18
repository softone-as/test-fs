import React from 'react';
import { Layout, Row, Col } from 'antd'

type TLoginLayout = {
    children: React.ReactNode;
    title: string;
};

const { Content } = Layout;

export const LoginLayout: React.FC<TLoginLayout> = ({ children, title }) => {
    return (
        <>

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


