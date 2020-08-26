import React, { useState } from 'react';
import Page from '../../components/Page/Page';
import { Row, Typography, Skeleton, Col } from 'antd';
import styles from './Subcategory.module.css';
import TopicList from '../../components/TopicList/TopicList';
import WidgetBar from '../../components/WidgetBar/WidgetBar';

// antd
const { Title } = Typography;

const Subcategory = props => {
  const [contentLoading, setContentLoading] = useState(true);
  const queryParams = props.location.search;
  const shortid = new URLSearchParams(queryParams).get('sid');

  return (
    <Page>
      <Row>
        <Title
          title={props.location.state.description}
          style={{ color: 'white', margin: '60px 0' }}
        >
          {props.location.state.name}
        </Title>
      </Row>
      <Row>
        <Col span={18}>
          <div
            className={styles.SkeletonContainer}
            style={{ display: contentLoading ? 'block' : 'none' }}
          >
            <Skeleton active />
            <Skeleton className={styles.Skeleton} active />
            <Skeleton className={styles.Skeleton} active />
          </div>
          <div
            className={styles.TopicListContainer}
            style={{ display: contentLoading ? 'none' : 'block' }}
          >
            <TopicList
              sid={shortid}
              contentLoading={contentLoading}
              setContentLoading={setContentLoading}
            />
          </div>
        </Col>
        <Col span={5} offset={1}>
          <WidgetBar />
        </Col>
      </Row>
    </Page>
  );
};

export default Subcategory;
