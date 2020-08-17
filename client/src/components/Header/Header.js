import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import {
  LogoutOutlined,
  ProfileOutlined,
  FireOutlined,
} from '@ant-design/icons';
import styles from './Header.module.css';

// antd
const { Header: AntHeader } = Layout;

const Header = () => {
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
            <Menu.Item key="Logout" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
