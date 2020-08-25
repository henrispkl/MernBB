import React, { useContext } from 'react';
import { Layout, Menu, Row, Col, Modal } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  FireOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './Header.module.css';
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

// antd
const { Header: AntHeader } = Layout;

const Header = () => {
  const { dispatch, state } = useContext(AuthContext);

  const logout = () => {
    Modal.confirm({
      title: 'Logout?',
      onOk: () => {
        dispatch({
          type: 'LOGOUT',
        });
      },
    });
  };

  return (
    <AntHeader
      style={{
        backgroundColor: 'white',
        padding: '0 100px',
        height: 'auto',
      }}
    >
      <Row>
        <Col span={12}>
          <div className={styles.LogoContainer}>
            <a href="/" className={styles.Logo}>
              MernBB
            </a>
          </div>
        </Col>
        <Col span={12}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['Boards']}
            className={styles.HeaderMenu}
          >
            <Menu.Item key="Boards" icon={<ProfileOutlined />}>
              Boards
            </Menu.Item>
            <Menu.Item key="RecentActivity" icon={<FireOutlined />}>
              Recent activity
            </Menu.Item>
            {state.isAuthenticated ? (
              <Menu.Item
                key="Logout"
                icon={<LogoutOutlined />}
                onClick={logout}
              >
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item key="Login" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}
            {state.isAuthenticated && (
              <Menu.Item key="User" icon={<UserOutlined />}>
                <Link to="/">{state.user.username}</Link>
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
