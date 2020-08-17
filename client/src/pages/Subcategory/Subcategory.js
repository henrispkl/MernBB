import React, { useState } from 'react';
import Page from '../../components/Page/Page';
import { Row, Typography, Skeleton } from 'antd';
import styles from './Subcategory.module.css';
import TopicList from '../../components/TopicList/TopicList';

// antd
const { Title } = Typography;

const Subcategory = props => {
  const [contentLoading, setContentLoading] = useState(true);

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
            id={props.location.state.id}
            contentLoading={contentLoading}
            setContentLoading={setContentLoading}
          />
        </div>
      </Row>
    </Page>
  );
};

export default Subcategory;
