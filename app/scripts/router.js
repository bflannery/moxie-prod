import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './Components/Containers/App';
import LandingPage from './Components/Containers/LandingPage';
import Register from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
import MoxieHome from './Components/Containers/MoxieHome';
import MoxieClientHome from './Components/Containers/MoxieClientHome';
import SubFolderPage from './Components/Containers/SubFolderPage';
import ClientFilesPage from './Components/Containers/ClientFilesPage';
import FilesPage from './Components/Containers/FilesPage';
import ResultsPage from './Components/Containers/ResultsPage';

const router = (

  <Router history ={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage}/>
       <Route path='/register' component={Register}/>
       <Route path='/home' component={MoxieHome}/>
       <Route path='/clients/:id' component = {MoxieClientHome}/>
       <Route path='/folders/:id' component = {SubFolderPage}/>
       <Route path='/forgotpassword' component={ForgotPassword}/>
       <Route path='/files' component = {FilesPage}/>
       <Route path="/files/search/:search" component={ResultsPage} />
       <Route path='/client-files/:id' component = {ClientFilesPage}/>
    </Route>
  </Router>
);

export default router;
