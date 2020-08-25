import React, { useState, useContext } from 'react';
import Page from '../../components/Page/Page';
import styles from './Register.module.css';
import { Row, Col, Typography, Form, Input, Button, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import API from '../../utils/API';
import { AuthContext } from '../../App';
import { useHistory } from 'react-router-dom';

// antd
const { Title } = Typography;

const Login = props => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const onFinish = values => {
    setLoading(true);
    API.post('/users/register', {
      email: values.email,
      username: values.username,
      password: values.password,
    })
      .then(() => {
        return API.post('/users/login', {
          email: values.email,
          password: values.password,
        });
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
          <div className={styles.Register}>
            <Title level={3}>Register an account</Title>
            <Form
              name="register"
              onFinish={onFinish}
              labelCol={{ span: 4 }}
              style={{ marginTop: '40px' }}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Username must be at least 3 characters long',
                    min: 3,
                  },
                ]}
              >
                <Input disabled={loading} />
              </Form.Item>
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
                    message: 'Password must be at least 6 characters long',
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
                  icon={<UserAddOutlined />}
                  disabled={loading}
                >
                  Create account
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
