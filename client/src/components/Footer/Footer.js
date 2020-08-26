import React from 'react';
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

const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <Row>
        <Col span={12}>
          <Title level={2}>MERN Bulletin Board</Title>
          <Text>
            This is a bulletin board built using the MERN (Mongoose, Express,
            React and Node) stack and Ant Design as an UI framework. Using Json
            Web Tokens, the user can{' '}
            <Link href="/register">create an account</Link> and authenticate,
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
              <Link href="/">
                <LoginOutlined /> Sign in
              </Link>
              <br />
              <Link href="/">
                <UserAddOutlined /> Create an account
              </Link>
              <br />
              <Link href="/">
                <FireOutlined /> View recent activity
              </Link>
              <br />
              <Link href="/">
                <ProfileOutlined /> Edit your profile
              </Link>
              <br />
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
