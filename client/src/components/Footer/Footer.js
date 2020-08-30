import React, { useContext } from 'react';
import styles from './Footer.module.css';
import { Typography, Row, Col } from 'antd';
import {
  HeartOutlined,
  LoginOutlined,
  UserAddOutlined,
  FireOutlined,
  ProfileOutlined,
  BranchesOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../App';

// antd
const { Title, Text, Link } = Typography;

const Footer = () => {
  const { state } = useContext(AuthContext);
  return (
    <footer className={styles.Footer}>
      <Row>
        <Col span={12}>
          <Title level={2}>MERN Bulletin Board</Title>
          <Text>
            This is a bulletin board built using the MERN stack (Mongoose, Express,
            React and Node) and Ant Design as the UI framework. Using JSON
            Web Tokens, the user can{' '}
            <Link href='/register'>create an account</Link> and <Link href='/register'>authenticate</Link>,
            consuming an API with CRUDs and other operations for categories,
            subcategories, users, user groups, topics and posts.
          </Text>
          <br />
          <br />
          <Text>
            Made with <HeartOutlined style={{ color: 'red' }} /> by{' '}
            <Link href="https://henrispkl.github.io/portfolio/">Henri</Link>.
          </Text>
        </Col>
        <Col offset={4} span={8}>
          <Row>
            <Col span={12}>
              <Title level={4}>Useful links</Title>
              {state.isAuthenticated ? (
                <>
                  <Link href="/">
                    <ProfileOutlined /> Edit your profile
                  </Link>
                  <br />
                </>
              ) : (
                <>
                  <Link href="/login">
                    <LoginOutlined /> Sign in
                  </Link>
                  <br />
                  <Link href="/register">
                    <UserAddOutlined /> Create an account
                  </Link>
                  <br />
                </>
              )}
              <Link href="/activity">
                <FireOutlined /> View recent activity
              </Link>
            </Col>
            <Col span={12}>
              <Title level={4}>About the project</Title>
              <Link href="/">
                <BranchesOutlined /> GitHub repositoy
              </Link>
              <br />
              <Link href="https://github.com/henrispkl">
                <GithubOutlined /> My GitHub profile
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
