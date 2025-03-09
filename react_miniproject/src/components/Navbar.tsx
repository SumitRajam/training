import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Menu, Button } from 'antd';
import { MenuUnfoldOutlined, HomeOutlined, UserOutlined, ApartmentOutlined, LogoutOutlined, AlipaySquareFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        Cookies.remove('mini_token', { secure: true, sameSite: 'Strict' });
        navigate('/');
    };

    const menuItems = [
        { key: '1', icon: <HomeOutlined />, label: <Link to="/dashboard" onClick={() => setIsDrawerOpen(false)}>Home</Link> },
        { key: '2', icon: <UserOutlined />, label: <Link to="/dashboard/manage-users" onClick={() => setIsDrawerOpen(false)}>Users</Link> },
        { key: '3', icon: <ApartmentOutlined />, label: <Link to="/dashboard/manage-companies" onClick={() => setIsDrawerOpen(false)}>Companies</Link> },
        { key: '4', icon: <AlipaySquareFilled />, label: <Link to="/dashboard/posts" onClick={() => setIsDrawerOpen(false)}>Posts</Link> },
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
                    <div className='flex align-center'>
                        <Menu
                            mode="horizontal"
                            className="border-none"
                            style={{ backgroundColor: '#ffffff', width: '400px' }}
                            items={menuItems}
                        />
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            style={{ color: '#f44336', marginTop: '15px' }}
                        >
                            Log out
                        </Button>
                    </div>
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
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{ color: '#f44336', marginTop: '10px' }}
                    >
                        Log out
                    </Button>
                </Drawer>
            )}
        </>
    );
};

export default Navbar;
