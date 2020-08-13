import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Skeleton } from 'antd';
import API from '../../utils/API';
import Page from '../../components/Page/Page';
import styles from './Board.module.css';

import Category from '../../components/Category/Category';

// antd
const { Title, Link } = Typography;

const Forum = () => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    API.get('/categories')
      .then(result => {
        setLoadingCategories(false);
        setCategories(result.data.categories);
        return API.get('/stats');
      })
      .catch(err => {
        console.log(err);
      });

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
    <Page>
      <Row>
        <Title style={{ margin: '60px 0', color: 'white' }}>Boards</Title>
      </Row>
      <Row>
        <Col span={18}>
          {loadingCategories ? (
            <div className={styles.LoadingCategories}>
              <Skeleton active />
              <Skeleton className={styles.Skeleton} active />
              <Skeleton className={styles.Skeleton} active />
            </div>
          ) : (
            categories.map(category => {
              return <Category data={category} key={category._id} />;
            })
          )}
        </Col>
        <Col span={5} offset={1}>
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
        </Col>
      </Row>
    </Page>
  );
};

export default Forum;
