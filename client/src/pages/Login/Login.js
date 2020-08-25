import React from 'react';
import Page from '../../components/Page/Page';
import styles from './Login.module.css';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import API from '../../utils/API';

// antd
const { Title } = Typography;

const Login = props => {
  const onFinish = values => {
    console.log(values);
    API({
      method: 'post',
      url: '/users/login',
      data: values,
    }).then(result => {
      console.log(result);
    }).catch(e => {
      console.log(e);
    });
  };

  return (
    <Page>
      <Row className={styles.MainRow}>
        <Col span={24}>
          <div className={styles.Login}>
            <Title level={3}>Login</Title>
            <Form
              name="login"
              onFinish={onFinish}
              labelCol={{ span: 4 }}
              style={{ marginTop: '40px' }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email',
                    type: 'email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password',
                    min: 6,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<LoginOutlined />}
                >
                  Login
                </Button>
                <Button type="link" htmlType="button">
                  Create new account
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        {/* <Col span={5} offset={1}>
          <WidgetBar />
        </Col> */}
      </Row>
    </Page>
  );
};

export default Login;
