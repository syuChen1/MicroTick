import React from 'react';
import Link from 'next/link';
import { Container, Table } from 'react-bootstrap';

const LandingPage = ({ currentUser, tickets }) => {
  console.log(tickets);
  return (
    <Container>
      <h1>Tickets: </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Detail</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>${ticket.price}</td>
              <td>
                <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
                  <a>View</a>
                </Link>
              </td>
              <td>{ticket.orderId ? 'Reserved' : 'Avaliable'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
