import Link from 'next/link';
import React from 'react';
import { Container, Table } from 'react-bootstrap';

const OrderIndex = ({ orders }) => {
  return orders.length !== 0 ? (
    // <ul>
    //   {orders.map((order) => {
    //     return (
    //       <li key={order.id}>
    //         {order.ticket.title} - {order.status}
    //       </li>
    //     );
    //   })}
    // </ul>
    <Container>
      <h1>Your Orders: </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Order Id</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.ticket.title}</td>
              <td>${order.ticket.price}</td>
              <td>
                {order.status !== 'expired' ? (
                  <Link href='/orders/[orderId]' as={`/orders/${order.id}`}>
                    <a>{order.id}</a>
                  </Link>
                ) : (
                  order.id
                )}
              </td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : (
    <h1 className='mt-4'>You have no avaliable orders</h1>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
