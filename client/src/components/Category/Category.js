import React from 'react';
import styles from './Category.module.css';
import Subcategory from '../Subcategory/Subcategory';
import {
  EditOutlined,
  BulbOutlined,
  MessageOutlined,
  CommentOutlined,
} from '@ant-design/icons';

const Category = props => {
  return (
    <table className={styles.CategoryTable}>
      <thead className={styles.Titles}>
        <tr>
          <th>
            <EditOutlined /> {props.data.name}
          </th>
          <th className={styles.Topics}>
            <BulbOutlined /> Topics
          </th>
          <th className={styles.Posts}>
            <CommentOutlined /> Posts
          </th>
          <th>
            <MessageOutlined /> Last post
          </th>
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
