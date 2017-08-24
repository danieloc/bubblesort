import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';
import Mindmap from './components/Mindmap';
import GoalPage from './components/GoalPage';
import Archived from './components/Archived';
import Landing from './components/Landing/LandingPage';

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/landing');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/mindmap');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing} onLeave={clearMessages} onEnter={skipIfAuthenticated}/>
      <Route path="/mindmap" component={Mindmap} onEnter={ensureAuthenticated} onLeave={clearMessages} />
      <Route path="/nodes" component={GoalPage} onEnter={ensureAuthenticated} onLeave={clearMessages} />
      <Route path="/archived" component={Archived} onEnter={ensureAuthenticated} onLeave={clearMessages} />
      <Route path="/landing" component={Landing} onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
