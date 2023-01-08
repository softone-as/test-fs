import React from 'react';
import Head from '../../Components/atoms/Commons/Head.atom';
import { Layout } from 'antd'

export type BlankProps = {
    children: React.ReactNode;
    title: string;
};

const { Content } = Layout;

export const Blank: React.FC<BlankProps> = ({ children, title }) => {
    return (
        <>
            {window.location.host !== process.env.STORY_HOST ? <Head title={title} /> : null}
            <Layout style={{ minHeight: '100vh' }}>
                <Content >
                    {children}
                </Content>
            </Layout>
        </>
    )
}


