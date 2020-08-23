import React, { useEffect, useState } from 'react';
import styles from './Topic.module.css';
import Page from '../../components/Page/Page';
import API from '../../utils/API';
import { Row, Input, Typography, Button, Col } from 'antd';
import { CommentOutlined, MessageOutlined } from '@ant-design/icons';
import Post from '../../components/Post/Post';
import { useHistory } from 'react-router-dom';
import WidgetBar from '../../components/WidgetBar/WidgetBar';

// antd
const { TextArea } = Input;
const { Title } = Typography;

const Topic = props => {
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState({});
  const topicShortId = new URLSearchParams(props.location.search).get('sid');
  const history = useHistory();

  if (!topicShortId) {
    history.goBack();
  }

  useEffect(() => {
    API.get(`/topics?sid=${topicShortId}`).then(result => {
      setTopic(result.data.topic);
      setLoading(false);
    });
  }, [topicShortId]);

  return (
    <Page>
      <Row className={styles.MainRow}>
        <Col span={18}>
          <div className={styles.Topic}>
            <div className={styles.Header}>
              <div className={styles.Title}>{topic.title && topic.title}</div>
            </div>
            {topic.subtitle && (
              <div className={styles.Subtitle}>
                <CommentOutlined /> {topic.subtitle}
              </div>
            )}
            {topic.posts &&
              topic.posts.map(post => {
                return <Post key={post._id} data={post} />;
              })}
            <div className={styles.AddPost}>
              <div className={styles.AddPostArea}>
                <Title level={4}>Post a reply</Title>
                <TextArea rows={6} className={styles.AddPostInput} />
                <Button
                  type="primary"
                  icon={<MessageOutlined />}
                  size="large"
                  className={styles.AddPostButton}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Col>

        <Col span={5} offset={1}>
          <WidgetBar />
        </Col>
      </Row>
    </Page>
  );
};

export default Topic;
