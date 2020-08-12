import React from 'react';
import './App.css';
import { Layout, Menu, Row, Col } from 'antd';
import {
  LogoutOutlined,
  ProfileOutlined,
  FireOutlined,
} from '@ant-design/icons';
import Footer from './components/Footer/Footer';

// Pages
import Board from './pages/Board/Board';

// Antd
const { Header } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Header
        style={{ backgroundColor: 'white', padding: '0 100px', height: 'auto' }}
      >
        <Row>
          <Col span={12}>
            <div className="logo">MernBB</div>
          </Col>
          <Col span={12}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['Boards']}
              className="navBarMenu"
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
      </Header>

      {/* Pages */}
      <Board />

      <Footer />
    </Layout>
  </div>
);

export default App;
