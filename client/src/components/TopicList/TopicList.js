import React, { useState, useEffect } from 'react';
import styles from './TopicList.module.css';
import { Skeleton, Pagination, Typography } from 'antd';
import {
  BulbOutlined,
  CommentOutlined,
  MessageOutlined,
  CopyFilled,
  CopyOutlined,
} from '@ant-design/icons';
import API from '../../utils/API';
import Lastpost from '../Lastpost/Lastpost';

// antd
const { Link } = Typography;

const TopicList = props => {
  const { contentLoading, setContentLoading } = props;
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState({
    currentPage: null,
    totalPages: null,
  });

  // Initial load
  useEffect(() => {
    API.get(`/subcategories/${props.id}/topics`)
      .then(result => {
        setTopics(result.data.topics);
        setPages(prevPages => ({
          ...prevPages,
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages * 10,
        }));
        setContentLoading(false);
        setLoading(false);
      })
      .catch(e => console.log(e));
  }, [props.id, setContentLoading]);

  const fetchPage = page => {
    setLoading(true);

    API.get(`/subcategories/${props.id}/topics?page=${page}`)
      .then(result => {
        setTopics(result.data.topics);
        setPages(prevPages => ({
          ...prevPages,
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages * 10,
        }));
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <table className={styles.TopicList}>
      <thead className={styles.Titles}>
        <tr>
          <th className={styles.Name}>
            <BulbOutlined /> Topic name
          </th>
          <th className={styles.Posts}>
            <CommentOutlined /> Posts
          </th>
          <th className={styles.LastPost}>
            <MessageOutlined /> Last post
          </th>
        </tr>
      </thead>
      <tbody className={styles.Body}>
        {!contentLoading && (
          <tr>
            <td>
              <Pagination
                defaultCurrent={pages.currentPage}
                total={pages.totalPages}
                showSizeChanger={false}
                onChange={fetchPage}
              />
            </td>
            <td></td>
            <td></td>
          </tr>
        )}
        {loading ? (
          <tr>
            <td colSpan={3}>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </td>
          </tr>
        ) : (
          topics.map(topic => {
            return (
              <tr key={topic._id} className={styles.Topic}>
                <td className={styles.TopicInfo}>
                  <span className={styles.TopicIcon}>
                    <CopyFilled />
                  </span>
                  <span className={styles.TopicNameContainer}>
                    <span className={styles.TopicName}>
                      <Link href={`/topic?sid=${topic.shortid}`}>
                        {topic.title}
                      </Link>
                    </span>
                    <br />
                    <span className={styles.TopicSubtitle}>
                      {topic.subtitle}
                    </span>
                  </span>
                </td>
                <td className={styles.TopicPosts}>{topic.posts.length}</td>
                <Lastpost
                  data={topic.lastpost}
                  className={styles.TopicLastpost}
                />
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default TopicList;
