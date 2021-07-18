import React from 'react';
import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  const response = await axios.get('/api/user/currentuser');

  return response.data;
};

export default LandingPage;
