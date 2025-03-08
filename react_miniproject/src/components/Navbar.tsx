import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Menu, Button } from 'antd';
import { MenuUnfoldOutlined, HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { key: '1', icon: <HomeOutlined />, label: <Link to="/" onClick={() => setIsDrawerOpen(false)}>Home</Link> },
        { key: '2', icon: <UserOutlined />, label: <Link to="/users" onClick={() => setIsDrawerOpen(false)}>Users</Link> },
        { key: '3', icon: <SettingOutlined />, label: <Link to="/settings" onClick={() => setIsDrawerOpen(false)}>Settings</Link> },
    ];

    return (
        <>
            <Header className="px-6 shadow-md flex items-center justify-between" style={{ backgroundColor: '#ffffff' }}>
                {isMobile && (
                    <Button
                        type="text"
                        icon={<MenuUnfoldOutlined className="text-xl" />}
                        onClick={() => setIsDrawerOpen(true)}
                    />
                )}
                <h2 className="m-0 text-xl font-semibold text-gray-800">Admin Dashboard</h2>
                {!isMobile && (
                    <Menu
                        mode="horizontal"
                        className="border-none"
                        style={{ backgroundColor: '#ffffff' }}
                        items={menuItems}
                    />
                )}
            </Header>

            {isMobile && (
                <Drawer
                    title="Menu"
                    placement="left"
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                >
                    <Menu mode="vertical" items={menuItems} />
                </Drawer>
            )}
        </>
    );
};

export default Navbar;
