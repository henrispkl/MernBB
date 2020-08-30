import React, { useEffect, useState } from 'react';
import styles from './Activity.module.css';
import { Row, Col, Typography, Skeleton } from 'antd';
import Page from '../../components/Page/Page';
import API from '../../utils/API';
import convertDate from '../../utils/convertDate';
import WidgetBar from '../../components/WidgetBar/WidgetBar';
import Post from '../../components/Post/Post';
import { Link } from 'react-router-dom';
import {
  MessageOutlined,
  UserAddOutlined,
  ClockCircleOutlined,
  CommentOutlined,
} from '@ant-design/icons';

// antd
const { Title } = Typography;

const Activity = props => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/stats/activity').then(result => {
      setActivities(result.data.activities);
      setLoading(false);
    });
  }, []);

  const activitiesMapper = activity => {
    switch (activity.type) {
      case 'user':
        return (
          <div className={styles.ActivityDiv} key={activity._id}>
            <div className={styles.Info}>
              <span>
                <UserAddOutlined className={styles.Icon} />
                Let's welcome our newest user,{' '}
                <Link to="/">{activity.username}</Link>
              </span>
              <time timestamp={activity.createdAt} className={styles.Date}>
                <ClockCircleOutlined className={styles.Icon} />
                {convertDate(activity.createdAt)}
              </time>
            </div>
          </div>
        );
      case 'topic':
        return (
          <div className={styles.ActivityDiv} key={activity._id}>
            <div className={styles.Info}>
              <span>
                <CommentOutlined className={styles.Icon} />
                <Link to="/">{activity.author.username}</Link> created a new
                topic:{' '}
                <Link to={`/topic?sid=${activity.shortid}`}>
                  {activity.title}
                </Link>{' '}
                in{' '}
                <Link to={`/subcategory?sid=${activity.subcategory.shortid}`}>
                  {activity.subcategory.name}
                </Link>
              </span>
              <time timestamp={activity.createdAt} className={styles.Date}>
                <ClockCircleOutlined className={styles.Icon} />
                {convertDate(activity.createdAt)}
              </time>
            </div>
          </div>
        );
      case 'post':
        return (
          <div className={styles.ActivityDiv} key={activity._id}>
            <div className={[styles.Info, styles.PostInfo].join(' ')}>
              <span>
                <MessageOutlined className={styles.Icon} />
                <Link to="/">{activity.author.username}</Link> posted a reply in
                the topic{' '}
                <Link to={`/topic?sid=${activity.topic.shortid}`}>
                  {activity.topic.title}
                </Link>
              </span>
              <time timestamp={activity.createdAt} className={styles.Date}>
                <ClockCircleOutlined className={styles.Icon} />
                {convertDate(activity.createdAt)}
              </time>
            </div>
            <Post data={activity} minimal notimestamp />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Page>
      <Row>
        <Title style={{ margin: '60px 0', color: 'white' }}>
          Recent activity
        </Title>
      </Row>
      <Row>
        <Col span={18}>
          <div className={styles.Activity}>
            {loading ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              activities.map(activitiesMapper)
            )}
          </div>
        </Col>
        <Col span={5} offset={1}>
          <WidgetBar />
        </Col>
      </Row>
    </Page>
  );
};

export default Activity;
