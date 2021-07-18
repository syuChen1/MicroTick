import 'bootstrap/dist/css/bootstrap.css';

// wrapper for the component we want to show on the screen
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
