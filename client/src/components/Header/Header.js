import React, { useContext } from 'react';
import { Layout, Menu, Row, Col, Modal } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  FireOutlined,
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import styles from './Header.module.css';
import { AuthContext } from '../../App';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

// antd
const { Header: AntHeader } = Layout;

const Header = () => {
  const { dispatch, state } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  let boardsKey = '/';

  if (location.pathname === '/subcategory' || location.pathname === '/topic') {
    boardsKey = location.pathname;
  }

  const logout = () => {
    Modal.confirm({
      title: 'Logout?',
      onOk: () => {
        dispatch({
          type: 'LOGOUT',
        });
        history.push('/');
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
            activeKey={location.pathname}
            selectedKeys={[location.pathname]}
            className={styles.HeaderMenu}
          >
            <Menu.Item key={boardsKey} icon={<ProfileOutlined />}>
              <NavLink to="/">Boards</NavLink>
            </Menu.Item>
            <Menu.Item key="/activity" icon={<FireOutlined />}>
              Recent activity
            </Menu.Item>
            {state.isAuthenticated && (
              <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Menu.Item>
            )}
            {state.isAuthenticated && (
              <Menu.Item key="/user" icon={<UserOutlined />}>
                <NavLink to="/">{state.user.username}</NavLink>
              </Menu.Item>
            )}
            {!state.isAuthenticated && (
              <Menu.Item key="/login" icon={<LoginOutlined />}>
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
            )}
            {!state.isAuthenticated && (
              <Menu.Item key="/register" icon={<UserAddOutlined />}>
                <NavLink to="/register">Register</NavLink>
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
