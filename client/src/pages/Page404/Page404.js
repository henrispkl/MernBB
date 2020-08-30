import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Ooops, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back to homepage</Link>
        </Button>
      }
      style={{ margin: '20px 0' }}
    />
  );
};

export default Page404;
