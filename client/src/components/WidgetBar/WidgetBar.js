import React, { useState, useEffect } from 'react';
import { Skeleton, Typography } from 'antd';
import styles from './WidgetBar.module.css';
import API from '../../utils/API';

// antd
const { Link } = Typography;

const WidgetBar = () => {
  const [stats, setStats] = useState({});
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
    <div className={styles.Widget}>
      <div className={styles.WidgetTitle}>Statistics</div>

      {loadingStats ? (
        <div className={styles.StatsLoading}>
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
  );
};

export default WidgetBar;
