import React from 'react';
import styles from './Subcategory.module.css';
import { MessageFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import Lastpost from '../../components/Lastpost/Lastpost';

// antd
const { Link } = Typography;

const Category = props => {
  const history = useHistory();

  const goToSubcategory = () => {
    history.push('/subcategory', {
      id: props.data._id,
      name: props.data.name,
      description: props.data.description,
    });
  };

  return (
    <tr className={styles.Subcategory}>
      <td className={styles.Info}>
        <div className={styles.Icon}>
          <MessageFilled />
        </div>
        <div className={styles.Text}>
          <div className={styles.Name}>
            <Link onClick={goToSubcategory}>{props.data.name}</Link>
          </div>
          <div className={styles.Desc}>{props.data.description}</div>
        </div>
      </td>
      <td className={styles.Topics}>{props.data.topics}</td>
      <td className={styles.Posts}>{props.data.posts}</td>
      <Lastpost data={props.data.lastpost} />
    </tr>
  );
};

export default Category;
