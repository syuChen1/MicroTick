import React from 'react';
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Nav.Link key={label} href={href} className='mx-3'>
          {label}
        </Nav.Link>
      );
    });

  return (
    <Navbar bg='dark' variant='dark' expand='sm' className='mb-4'>
      <Container>
        <Navbar.Brand href='/'>MicroTick</Navbar.Brand>

        <Nav className='ms-auto d-flex align-items-center '>{links}</Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
