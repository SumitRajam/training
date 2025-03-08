import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const { Content } = Layout;

const AppLayout: React.FC = () => {
    return (
        <Layout className="min-h-screen">
            <Navbar />
            <Content className="p-2 bg-gray-100">
                <div className='container p-4 bg-white'>
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
};

export default AppLayout;
