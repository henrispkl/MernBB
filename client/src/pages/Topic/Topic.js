import React, { useEffect, useState } from 'react';
import styles from './Topic.module.css';
import Page from '../../components/Page/Page';
import API from '../../utils/API';
import { Row, Input, Typography, Col, Pagination, Skeleton, Modal } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import Post from '../../components/Post/Post';
import { useHistory } from 'react-router-dom';
import WidgetBar from '../../components/WidgetBar/WidgetBar';
import AddPostForm from '../../components/AddPostForm/AddPostForm';

const Topic = props => {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [topic, setTopic] = useState({});
  const queryParams = props.location.search;
  const shortid = new URLSearchParams(queryParams).get('sid');
  const currentPage = new URLSearchParams(queryParams).get('page');
  const [pages, setPages] = useState({
    currentPage,
    totalPages: 1,
  });
  const history = useHistory();

  if (!queryParams) {
    history.goBack();
  }

  // Initial load
  useEffect(() => {
    API.get(`/topics${queryParams}`)
      .then(result => {
        setTopic(result.data);
        setPages({
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages,
        });
        setLoading(false);
      })
      .catch(e => {
        Modal.error({
          title: 'An error occurred',
          content: e.message,
        });
      });
  }, [queryParams]);

  const postReply = (message, setMessage, loading, setLoading) => {
    setLoading(true);

    API.post(`/posts/add`, {
      message,
      author: '5f245c890321ee179c3e6c99',
      topic: topic._id,
    })
      .then(result => {
        setLoading(false);
        setMessage('');

        const recentPageNumber = result.data.post.topicTotalPages;
        console.log(result.data);
        if (recentPageNumber == currentPage) {
          // history.go(0);
          setTopic(prevTopicState => {
            return {
              ...prevTopicState,
              posts: [...prevTopicState.posts, result.data.post],
            };
          });
        } else {
          console.log(result.data.post.topicTotalPages);
          history.push(`/topic?sid=${shortid}&page=${recentPageNumber}`);
        }
      })
      .catch(e => {
        setLoading(false);

        Modal.error({
          title: 'An error occurred',
          content: e.message,
        });
      });
  };

  const fetchPage = page => {
    setPageLoading(true);

    API.get(`/topics?sid=${shortid}&page=${page}`)
      .then(result => {
        setTopic(result.data);
        setPages({
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages,
        });
        setPageLoading(false);
        history.push(`/topic?sid=${shortid}&page=${page}`);
      })
      .catch(e => {
        Modal.error({
          title: 'An error occurred',
          content: e.message,
        });
      });
  };

  const pagination = (
    <div className={styles.Pagination}>
      <Pagination
        current={parseInt(pages.currentPage, 10)}
        total={parseInt(pages.totalPages, 10) * 10}
        showSizeChanger={false}
        onChange={fetchPage}
      />
    </div>
  );

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
              {pages.totalPages > 1 && pagination}
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
              {pages.totalPages > 1 && pagination}
              <AddPostForm postReply={postReply} />
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
