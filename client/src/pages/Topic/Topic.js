import React, { useEffect, useState } from 'react';
import styles from './Topic.module.css';
import Page from '../../components/Page/Page';
import API from '../../utils/API';
import {
  Row,
  Input,
  Typography,
  Button,
  Col,
  Pagination,
  Skeleton,
} from 'antd';
import { CommentOutlined, MessageOutlined } from '@ant-design/icons';
import Post from '../../components/Post/Post';
import { useHistory } from 'react-router-dom';
import WidgetBar from '../../components/WidgetBar/WidgetBar';

// antd
const { TextArea } = Input;
const { Title } = Typography;

const Topic = props => {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [topic, setTopic] = useState({});
  const [message, setMessage] = useState('');
  const [pages, setPages] = useState(null);
  const queryParams = props.location.search;
  const shortid = new URLSearchParams(queryParams).get('sid');
  const history = useHistory();

  if (!queryParams) {
    history.goBack();
  }

  // Initial load
  useEffect(() => {
    API.get(`/topics${queryParams}`).then(result => {
      setTopic(result.data);
      setPages({
        currentPage: result.data.currentPage,
        totalPages: result.data.totalPages * 10,
      });
      setLoading(false);
    });
  }, [queryParams]);

  const postReply = () => {
    API.post(`/posts/add`, {
      message,
      author: '5f245c890321ee179c3e6c99',
      topic: topic._id,
    })
      .then(result => {
        // history.push(`/topics?sid=${shortid}&page=${}`);
        history.go(0);
      })
      .catch(e => console.log(e));
  };

  const fetchPage = page => {
    setPageLoading(true);

    API.get(`/topics?sid=${shortid}&page=${page}`)
      .then(result => {
        setTopic(result.data);
        setPages({
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages * 10,
        });
        setPageLoading(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <Page>
      <Row className={styles.MainRow}>
        <Col span={18}>
          {loading ? (
            <div className={styles.Loading}>
              <Skeleton className={styles.Skeleton} active avatar />
              <Skeleton className={styles.Skeleton} active avatar />
              <Skeleton className={styles.Skeleton} active avatar />
              <Skeleton className={styles.Skeleton} active avatar />
              <Skeleton className={styles.Skeleton} active avatar />
              <Skeleton className={styles.Skeleton} active avatar />
            </div>
          ) : (
            <div className={styles.Topic}>
              <div className={styles.Header}>
                <div className={styles.Title}>{topic.title && topic.title}</div>
              </div>
              {topic.subtitle && (
                <div className={styles.Subtitle}>
                  <CommentOutlined /> {topic.subtitle}
                </div>
              )}
              {pages.totalPages > 10 && (
                <div className={styles.PaginationTop}>
                  <Pagination
                    defaultCurrent={pages.currentPage}
                    total={pages.totalPages}
                    showSizeChanger={false}
                    onChange={fetchPage}
                  />
                </div>
              )}
              {pageLoading ? (
                <div className={styles.PageLoading}>
                  <Skeleton className={styles.Skeleton} active avatar />
                  <Skeleton className={styles.Skeleton} active avatar />
                  <Skeleton className={styles.Skeleton} active avatar />
                  <Skeleton className={styles.Skeleton} active avatar />
                  <Skeleton className={styles.Skeleton} active avatar />
                  <Skeleton className={styles.Skeleton} active avatar />
                </div>
              ) : (
                topic.posts.map(post => {
                  return <Post key={post._id} data={post} />;
                })
              )}
              {pages.totalPages > 10 && (
                <div className={styles.PaginationBottom}>
                  <Pagination
                    defaultCurrent={pages.currentPage}
                    total={pages.totalPages}
                    showSizeChanger={false}
                    onChange={fetchPage}
                  />
                </div>
              )}
              <div className={styles.AddPost}>
                <div className={styles.AddPostArea}>
                  <Title level={4}>Post a reply</Title>
                  <TextArea
                    rows={6}
                    className={styles.AddPostInput}
                    value={message}
                    onChange={e => {
                      setMessage(e.target.value);
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<MessageOutlined />}
                    size="large"
                    className={styles.AddPostButton}
                    onClick={postReply}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Col>

        <Col span={5} offset={1}>
          <WidgetBar />
        </Col>
      </Row>
    </Page>
  );
};

export default Topic;
