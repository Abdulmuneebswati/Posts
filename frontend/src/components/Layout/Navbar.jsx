import React, { useState } from 'react';

import { Button, Grid, Menu, Space, theme } from 'antd';

import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../store/redux/slices/authSlice';
import { menuItems, styles } from '../../constants';

const { useBreakpoint } = Grid;

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const [current, setCurrent] = useState('projects');
  const onClick = ({ key }) => {
    if (key === 'createposts') {
      navigate('/users/posts/create-post');
    }
    if (key === 'posts') {
      navigate('/users');
    }
    if (key === 'myposts') {
      navigate('/users/my-posts');
    }
  };
  const isAdmin = user.role === 'admin';
  return (
    <nav style={styles.header}>
      <div style={styles.container}>
        <div style={styles.menuContainer}>
          {isAdmin ? (
            'Admin'
          ) : (
            <Menu
              style={styles.menu}
              mode='horizontal'
              items={menuItems}
              onClick={onClick}
              overflowedIndicator={
                <Button
                  type='text'
                  icon={<MenuOutlined />}
                ></Button>
              }
            />
          )}
        </div>
        <Space>
          <Button
            onClick={handleLogout}
            type='primary'
          >
            Logout
          </Button>
        </Space>
      </div>
    </nav>
  );
}
