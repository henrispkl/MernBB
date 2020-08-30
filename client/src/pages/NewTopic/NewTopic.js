import React, { useState, useEffect, useContext } from 'react';
import Page from '../../components/Page/Page';
import styles from './NewTopic.module.css';
import { Row, Col, Typography, Form, Input, Button, Modal, Spin } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import API from '../../utils/API';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../App';

// antd
const { Title, Text } = Typography;
const { TextArea } = Input;

const NewTopic = props => {
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState(null);
  const history = useHistory();
  const { state } = useContext(AuthContext);
  const queryParams = props.location.search;
  const shortid = new URLSearchParams(queryParams).get('sid');

  useEffect(() => {
    API.get(`/subcategories/info?sid=${shortid}`).then(result => {
      setSubcategory(result.data);
    });
  }, []);

  const onFinish = data => {
    setLoading(true);

    const topicData = {
      ...data,
      author: state.user.id,
      subcategory: subcategory._id,
    };

    API.post('/topics/add', topicData, {
      headers: { Authorization: `Bearer ${state.token}` },
    })
      .then(result => {
        console.log(result.data);
        history.push(`/topic?sid=${result.data.topic.shortid}`);
      })
      .catch(e => {
        setLoading(false);
        Modal.error({
          title: 'Failed to post a new topic',
          content: e.message,
        });
      });
  };

  return (
    <Page>
      <Row className={styles.MainRow}>
        <Col span={24}>
          <div className={styles.NewTopic}>
            <Title level={3}>New topic</Title>
            <Text>
              Posting in{' '}
              <Link to={`/subcategory?sid=${shortid}`}>
                {subcategory ? (
                  subcategory.name
                ) : (
                  <Spin size="small" style={{ marginLeft: '5px' }} />
                )}
              </Link>
            </Text>
            <Form
              name="login"
              onFinish={onFinish}
              style={{ marginTop: '40px' }}
            >
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'The title must be at least 5 characters long',
                    min: 5,
                  },
                ]}
              >
                <Input placeholder="Title" disabled={loading} />
              </Form.Item>
              <Form.Item name="subtitle">
                <Input placeholder="Subtitle (optional)" disabled={loading} />
              </Form.Item>
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message:
                      'The message of the topic must be at least 5 characters long',
                    min: 5,
                  },
                ]}
              >
                <TextArea placeholder="Message" rows={8} disabled={loading} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<CommentOutlined />}
                  disabled={loading}
                >
                  Create new topic
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Page>
  );
};

export default NewTopic;
