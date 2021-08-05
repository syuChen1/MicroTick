import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hookds/use-request';
import { Container } from 'react-bootstrap';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onsubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <Container>
      <h1>Create a Ticket</h1>
      <form onSubmit={onsubmit}>
        <div className='form-group my-1'>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control my-1'
          />
        </div>
        <div className='form-group my-1'>
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className='form-control my-1'
          />
        </div>
        {errors}
        <button className='btn btn-primary my-3'>Submit</button>
      </form>
    </Container>
  );
};

export default NewTicket;
