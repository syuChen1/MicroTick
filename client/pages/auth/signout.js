import React, { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hookds/use-request';
import { Container, Spinner } from 'react-bootstrap';

const signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <Container>
      <Spinner role='status' />
      <h1>Signing you out...</h1>
    </Container>
  );
};

export default signout;
