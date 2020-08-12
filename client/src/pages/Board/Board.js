import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Skeleton } from 'antd';
import API from '../../utils/API';
import Page from '../../components/Page/Page';
import styles from './Board.module.css';

import Category from '../../components/Category/Category';

// antd
const { Title } = Typography;

const Forum = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/categories')
      .then(result => {
        setLoading(false);
        setCategories(result.data.categories);
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
          {loading ? (
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
        <Col span={6}>Side</Col>
      </Row>
    </Page>
  );
};

export default Forum;
