import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path={'/'} component={LandingPage} />
          <Route path={'/home'} component={LandingPage} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
