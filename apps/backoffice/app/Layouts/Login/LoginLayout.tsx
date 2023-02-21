import React from 'react';
import { Layout, Row, Col } from 'antd';
import { themeColors } from '../../Utils/theme';
import { isMobileScreen } from '../../Utils/utils';

type TLoginLayout = {
    children: React.ReactNode;
    title: string;
};

const { Content } = Layout;

export const LoginLayout: React.FC<TLoginLayout> = ({ children }) => {
    const isMobile = isMobileScreen();

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Content
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row style={{ width: '100%' }}>
                        <Col span={isMobile ? 24 : 10}>
                            <div
                                style={{
                                    width: '20%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '64px',
                                    margin: '2rem',
                                    backgroundColor: themeColors.primary,
                                }}
                            >
                                {/* Apps Logo or Title */}
                                <img src="/img/company-logo.svg" width="80px" />
                            </div>
                            {children}
                        </Col>
                        <Col span={isMobile ? 24 : 14}>
                            <img
                                src={'/img/ilustration-login.png'}
                                alt="ilustration login"
                                width={'100%'}
                                height={'100%'}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};
