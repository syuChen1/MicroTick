import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server!
    let baseURL = 'http://www.microtick.xyz';
    if (process.env.NODE_ENV === 'development') {
      baseURL =
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
    }

    return axios.create({
      baseURL,
      headers: req.headers,
    });
  } else {
    //we are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
