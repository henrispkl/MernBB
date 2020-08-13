import React from 'react';
import styles from './Subcategory.module.css';
import { MessageFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import NoAvatar from '../../assets/no-avatar-small.jpg';

// antd
const { Link } = Typography;

const Category = props => {
  let lastPostDateContent = props.data.lastpost.updatedAt;

  const lastPostDate = new Date(lastPostDateContent);
  const lastPostYear = lastPostDate.getFullYear();
  let lastPostMonth = lastPostDate.toLocaleString('default', {
    month: 'short',
  });
  lastPostMonth =
    lastPostMonth.charAt(0).toUpperCase() + lastPostMonth.slice(1);
  let lastPostDay = lastPostDate.getDate();
  const lastPostHours = lastPostDate.getHours();
  const lastPostMinutes = lastPostDate.getMinutes();

  if (lastPostDay < 10) {
    lastPostDay = '0' + lastPostDay;
  }

  lastPostDateContent = `${lastPostMonth} ${lastPostDay}, ${lastPostYear}, ${lastPostHours}:${lastPostMinutes}`;

  return (
    <tr className={styles.Subcategory}>
      <td className={styles.Info}>
        <div className={styles.Icon}>
          <MessageFilled />
        </div>
        <div className={styles.Text}>
          <div className={styles.Name}>
            <Link href="/">{props.data.name}</Link>
          </div>
          <div className={styles.Desc}>{props.data.description}</div>
        </div>
      </td>
      <td className={styles.Topics}>{props.data.topics}</td>
      <td className={styles.Posts}>{props.data.posts}</td>
      <td className={styles.Lastpost}>
        <div className={styles.LastpostAvatar}>
          <img alt="" src={NoAvatar} />
        </div>
        <div className={styles.LastpostContent}>
          <Link href="/" style={{ alignSelf: 'flex-start' }}>
            {props.data.lastpost.author.username}
          </Link>
          <div className={styles.LastPostDate}>{lastPostDateContent}</div>
        </div>
      </td>
    </tr>
  );
};

export default Category;
