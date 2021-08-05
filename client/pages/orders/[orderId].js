import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hookds/use-request';
import { Card } from 'react-bootstrap';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  return (
    <div>
      {order.status === 'created' ? (
        <div>
          <h4 className='my-3'>Time left to pay: {timeLeft} seconds</h4>
          <StripeCheckout
            token={({ id }) => doRequest({ token: id })}
            stripeKey='pk_test_51JIbdXEkhJSc50J8IfEZKdxJTSGKxetVXbBoQ6VvfPTpLVSkKZKf3SoNRzkR1GhYXS26T0lQSZURDj9aNyDkQUL000wFpMXiql'
            amount={order.ticket.price * 100}
            email={currentUser.email}
          />
          {errors}
          <button
            className='btn btn-secondary d-block my-3'
            onClick={() => Router.push('/orders')}
          >
            Go Back
          </button>
        </div>
      ) : (
        <Card text='center'>
          <Card.Header>Ticket Details</Card.Header>
          <Card.Body>
            <h3>{order.ticket.title}</h3>
            <h5>${order.ticket.price}</h5>
            <p className='my-0'>STAPLES Center</p>
            <p>1111 S Figueroa St, Los Angeles, CA 90015</p>
            <p>5 September 2021 @7:00pm</p>
            <button
              className='btn btn-secondary'
              onClick={() => Router.push('/orders')}
            >
              Go Back
            </button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
