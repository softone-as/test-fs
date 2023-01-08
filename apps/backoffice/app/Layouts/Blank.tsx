import React from 'react';
import Head from '../Components/atoms/Commons/Head.atom';
import { Layout } from 'antd'

type BlankProps = {
    children: React.ReactNode;
    title: string;
};


const { Content } = Layout;

const Blank: React.FC<BlankProps> = ({ children, title }) => {
    return (
        <>
            <Head title={title} />
            <Layout style={{ minHeight: '100vh' }}>
                <Content >
                    {children}
                </Content>
            </Layout>
        </>
    )
}

export default Blank;
