import React, { useState, useContext } from 'react';
import Page from '../../components/Page/Page';
import styles from './Login.module.css';
import { Row, Col, Typography, Form, Input, Button, Modal } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import API from '../../utils/API';
import { AuthContext } from '../../App';
import { useHistory, Link } from 'react-router-dom';

// antd
const { Title } = Typography;

const Login = props => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const onFinish = values => {
    setLoading(true);
    API.post('/users/login', {
      email: values.email,
      password: values.password,
    })
      .then(result => {
        dispatch({
          type: 'LOGIN',
          payload: {
            token: result.data.token,
            user: result.data.user,
          },
        });
        history.push('/');
      })
      .catch(e => {
        setLoading(false);
        Modal.error({
          title: 'Login failed',
          content: e.response.data.msg,
        });
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
                    message: 'Please enter a valid email',
                    type: 'email',
                  },
                ]}
              >
                <Input disabled={loading} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Password are at least 6 characters long',
                    min: 6,
                  },
                ]}
              >
                <Input.Password disabled={loading} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<LoginOutlined />}
                  disabled={loading}
                >
                  Login
                </Button>
                <Button type="link" htmlType="button">
                  <Link to='/register'>Create new account</Link>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Page>
  );
};

export default Login;
