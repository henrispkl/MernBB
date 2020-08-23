import React from 'react';
import styles from './Post.module.css';
import NoAvatar from '../../assets/no-avatar.jpg';
import { Typography } from 'antd';
import moment from 'moment';

// antd
const { Link } = Typography;

const Post = props => {
  let dateContent = props.data.updatedAt;
  let finalDate = '';
  const date = new Date(dateContent);
  const dateNow = new Date();
  const diffTime = Math.abs(date - dateNow);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If last post is more than 3 days old, show full date
  if (diffDays > 3) {
    const year = date.getFullYear();
    let month = date.toLocaleString('default', {
      month: 'short',
    });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    let day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Add zero to days
    if (day < 10) {
      day = '0' + day;
    }

    finalDate = `${month} ${day}, ${year}, ${hours}:${minutes}`;
  } else {
    finalDate = moment(date).fromNow();
  }

  return (
    <div className={styles.Post}>
      <div className={styles.User}>
        <div className={styles.Username}>
          <Link href="/">{props.data.author.username}</Link>
        </div>
        <div className={styles.Usergroup}>
          {props.data.author.usergroup.name}
        </div>
        <div className={styles.Avatar}>
          <img src={NoAvatar} alt="" />
        </div>
        <div className={styles.Stats}></div>
      </div>
      <div className={styles.Message}>
        <div className={styles.MessageContent}>{props.data.message}</div>
        <time timestamp={date.toString()} className={styles.Date}>
          {finalDate}
        </time>
      </div>
    </div>
  );
};

export default Post;
