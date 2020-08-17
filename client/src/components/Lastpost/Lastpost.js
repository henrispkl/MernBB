import React from 'react';
import styles from './Lastpost.module.css';
import NoAvatar from '../../assets/no-avatar-small.jpg';
import moment from 'moment';
import { Typography } from 'antd';

// antd
const { Link } = Typography;

const Lastpost = props => {
  let classNames = [styles.Lastpost];
  if (props.className) {
    classNames.push(props.className);
  }

  // Format date
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
    <td className={classNames.join(' ')}>
      <div className={styles.LastpostAvatar}>
        <img alt="" src={NoAvatar} />
      </div>
      <div className={styles.LastpostContent}>
        <Link href="/" style={{ alignSelf: 'flex-start' }}>
          {props.data.author.username}
        </Link>
        <div className={styles.LastPostDate}>{finalDate}</div>
      </div>
    </td>
  );
};

export default Lastpost;
