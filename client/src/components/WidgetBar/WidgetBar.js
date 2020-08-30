import React, { useState, useEffect } from 'react';
import { Skeleton, Typography } from 'antd';
import {
  ClockCircleOutlined,
  FireOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import styles from './WidgetBar.module.css';
import API from '../../utils/API';
import NoAvatar from '../../assets/no-avatar-small.jpg';
import { Link as RouterLink } from 'react-router-dom';
import convertDate from '../../utils/convertDate';

// antd
const { Link } = Typography;

const WidgetBar = () => {
  const [stats, setStats] = useState({ activeTopics: [] });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    API.get('/stats')
      .then(result => {
        setLoadingStats(false);
        setStats(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.Widget}>
        <div className={styles.WidgetTitle}>
          <BarChartOutlined /> Statistics
        </div>

        {loadingStats ? (
          <div className={styles.WidgetLoading}>
            <Skeleton active />
          </div>
        ) : (
          <div className={styles.Stats}>
            <div className={styles.Stat}>
              <div className={styles.StatNumber}>{stats.topics}</div>
              <div className={styles.StatText}>topics</div>
            </div>
            <div className={styles.Stat}>
              <div className={styles.StatNumber}>{stats.posts}</div>
              <div className={styles.StatText}>posts</div>
            </div>
            <div className={styles.Stat}>
              <div className={styles.StatNumber}>{stats.users}</div>
              <div className={styles.StatText}>users</div>
            </div>
            <div className={styles.Stat}>
              <div className={styles.NewestUserStat}>
                <Link href="/">{stats.newestuser}</Link>
              </div>
              <div className={styles.StatText}>newest user</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.Widget}>
        <div className={styles.WidgetTitle}>
          <FireOutlined /> Hot topics
        </div>
        {loadingStats ? (
          <div className={styles.WidgetLoading}>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <div className={styles.Topics}>
            {stats.activeTopics.map(topic => {
              return (
                <div className={styles.RecentTopic} key={topic._id}>
                  <img src={NoAvatar} alt='' />{' '}
                  <div>
                    <RouterLink to={`/topic?sid=${topic.shortid}`}>
                      {topic.title}
                    </RouterLink>
                    <br />
                    <time timestamp={topic.updatedAt} className={styles.Date}>
                      <ClockCircleOutlined className={styles.Icon} />
                      {convertDate(topic.updatedAt)}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default WidgetBar;
