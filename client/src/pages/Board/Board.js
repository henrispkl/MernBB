import React, { useEffect, useState, useContext } from 'react';
import { Row, Typography, Col, Skeleton, Modal } from 'antd';
import API from '../../utils/API';
import Page from '../../components/Page/Page';
import styles from './Board.module.css';
import Category from '../../components/Category/Category';
import WidgetBar from '../../components/WidgetBar/WidgetBar';

// antd
const { Title } = Typography;

const Forum = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    API.get('/categories')
      .then(result => {
        setLoadingCategories(false);
        setCategories(result.data.categories);
        return API.get('/stats');
      })
      .catch(e => {
        Modal.error({
          title: 'An error occurred',
          content: e.message,
        });
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
          <WidgetBar />
        </Col>
      </Row>
    </Page>
  );
};

export default Forum;
