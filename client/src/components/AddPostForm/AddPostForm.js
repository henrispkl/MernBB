import React, { useState, useEffect, useContext } from 'react';
import styles from './AddPostForm.module.css';
import { Typography, Button, Input } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

// antd
const { TextArea } = Input;
const { Title } = Typography;

const AddPostForm = props => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      setDisabledButton(true);
    } else if (message.length < 3) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [loading, message]);

  if (state.isAuthenticated) {
    return (
      <div className={styles.AddPost}>
        <div className={styles.AddPostArea}>
          <Title level={4}>Post a reply</Title>
          <TextArea
            rows={6}
            className={styles.AddPostInput}
            value={message}
            onChange={e => {
              setMessage(e.target.value);
            }}
            disabled={loading}
          />
          <Button
            type="primary"
            icon={<MessageOutlined />}
            size="large"
            className={styles.AddPostButton}
            onClick={() => {
              props.postReply(message, setMessage, loading, setLoading);
            }}
            disabled={disabledButton}
          >
            Post
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.AddPost}>
      <div className={styles.AuthMessage}>
        You need to be logged in to reply to this topic.
        <br />
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default AddPostForm;
