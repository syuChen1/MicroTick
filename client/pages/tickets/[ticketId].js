import React from 'react';
import useRequest from '../../hookds/use-request';
import Router from 'next/router';
import { Card } from 'react-bootstrap';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <Card text='center'>
      <Card.Header>Ticket Details</Card.Header>
      <Card.Body>
        <h3>{ticket.title}</h3>
        <h5>${ticket.price}</h5>
        <p className='my-0'>STAPLES Center</p>
        <p>1111 S Figueroa St, Los Angeles, CA 90015</p>
        <p>5 September 2021 @7:00pm</p>
        {errors}
        <button
          className='btn btn-secondary mx-1'
          size='lg'
          onClick={() => Router.push('/')}
        >
          Go Back
        </button>
        <button
          className='btn btn-primary mx-1'
          size='lg'
          onClick={() => doRequest()}
        >
          Purchase
        </button>
      </Card.Body>
    </Card>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
