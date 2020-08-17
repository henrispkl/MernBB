import React from 'react';
import styles from './Page.module.css';

const Page = props => {
  return (
    <div className={styles.Page}>
      <div className={styles.MainLayout}>
        <div className={styles.HeaderImage} />
        {props.children}
      </div>
    </div>
  );
};

export default Page;
