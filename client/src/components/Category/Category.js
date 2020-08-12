import React from 'react';
import styles from './Category.module.css';
import Subcategory from '../Subcategory/Subcategory';

const Category = props => {
  return (
    <table className={styles.CategoryTable}>
      <thead className={styles.Titles}>
        <tr>
          <th>{props.data.name}</th>
          <th className={styles.Topics}>Topics</th>
          <th className={styles.Posts}>Posts</th>
          <th>Last post</th>
        </tr>
      </thead>
      <tbody className={styles.Body}>
        {props.data.subcategories.map(subcategory => {
          return <Subcategory data={subcategory} key={subcategory._id} />;
        })}
      </tbody>
    </table>
  );
};

export default Category;
