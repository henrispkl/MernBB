import React from 'react';
import styles from './Post.module.css';
import NoAvatar from '../../assets/no-avatar.jpg';
import { Typography } from 'antd';
import convertDate from '../../utils/convertDate';

// antd
const { Link } = Typography;

const Post = props => {
  const dateContent = props.data.updatedAt;
  const date = new Date(dateContent);
  const finalDate = convertDate(dateContent);

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
        <div className={styles.Stats}>
          <span>
            <b>Topics:</b> {props.data.author.topicCount}
          </span>
          <span>
            <b>Posts:</b> {props.data.author.postCount}
          </span>
          <span>
            <b>Register date:</b> <br />
            {convertDate(props.data.author.registerDate)}
          </span>
        </div>
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
