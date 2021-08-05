import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hookds/use-request';
import { Form } from 'react-bootstrap';

const signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <Form onSubmit={onSubmit} className='mt-4'>
      <h1>Sign In</h1>
      <div className='form-group my-3'>
        <label>Email Address</label>
        <input
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group my-3'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className='btn btn-primary'>Sign In</button>
    </Form>
  );
};

export default signin;
