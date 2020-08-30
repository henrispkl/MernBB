import React from 'react';
import styles from './Lastpost.module.css';
import NoAvatar from '../../assets/no-avatar-small.jpg';
import { Typography, Empty } from 'antd';
import convertDate from '../../utils/convertDate';

// antd
const { Link } = Typography;

const Lastpost = props => {
  let classNames = [styles.Lastpost];
  if (props.className) {
    classNames.push(props.className);
  }

  // If there's no data
  if (!props.data) {
    return (
      <td className={styles.NoData}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ margin: '0px' }}
          description='No last post'
        />
      </td>
    );
  }

  // Format date
  let date = convertDate(props.data.updatedAt);

  return (
    <td className={classNames.join(' ')}>
      <div className={styles.LastpostAvatar}>
        <img alt="" src={NoAvatar} />
      </div>
      <div className={styles.LastpostContent}>
        <Link href="/" style={{ alignSelf: 'flex-start' }}>
          {props.data.author.username}
        </Link>
        <div className={styles.LastPostDate}>{date}</div>
      </div>
    </td>
  );
};

export default Lastpost;
