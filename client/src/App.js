import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route,   Redirect } from 'react-router-dom';


import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'

import { getUsers } from './redux/actions/userAction'
import UsersActionn from './pages/administration/users/UsersActionn'
import Listadeusuariosbloqueadoss from './pages/administration/users/listadeusuariosbloqueadoss'
import { getBlockedUsers } from './redux/actions/userBlockAction'
import Paginabloqueos from './pages/paginabloqueos'
import Roles from './pages/administration/users/roles'
import Homepostspendientes from './pages/administration/homepostspendientes'
import { getPostsPendientes } from './redux/actions/postAproveAction'
import Profile from './pages/profile'
import Post from './pages/post'
import Edicionusers from './pages/administration/users/edicionusers'
import NotFound from './components/NotFound'
import Home from './pages/home'
import Reportuser from './pages/administration/users/reportuser';
//import Bloqueos from './pages/bloqueos'

 
function App() {
  const { auth, status, modal, call }= useSelector(state => state); //, userBlockReducer }
  const dispatch = useDispatch();
  
  // Verificamos si el usuario está bloqueado
  //const blockedUser = userBlockReducer.blockedUsers.find(blockedUser => blockedUser.user._id === auth.user?._id);

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
      dispatch(getUsers(auth.token));
      dispatch(getBlockedUsers(auth.token));
      dispatch(getPostsPendientes(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {} else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  }, []);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
         
        <Header /> 
          
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Switch>
             
             
              <div>
                  <Route exact path="/administration/usersaction" render={() => auth.token ? <UsersActionn /> : <Redirect to="/login" />} />
                <Route exact path="/administration/usersedicion" render={() => auth.token ? <Edicionusers /> : <Redirect to="/login" />} />
                <Route exact path="/administration/listadeusuariosbloqueadoss" render={() => auth.token ? <Listadeusuariosbloqueadoss /> : <Redirect to="/login" />} />
                <Route exact path="/administration/paginabloqueos" render={() => auth.token ? <Paginabloqueos /> : <Redirect to="/login" />} />
                <Route exact path="/administration/homepostspendientes" render={() => auth.token ? <Homepostspendientes /> : <Redirect to="/login" />} />
                <Route exact path="/administration/roles" render={() => auth.token ? <Roles /> : <Redirect to="/login" />} />
                <Route exact path="/administration/users/reportuser" render={() => auth.token ? <Reportuser /> : <Redirect to="/login" />} />
                
                  <Route exact path="/" render={() => <Home />} />   
                <Route exact path="/login" render={() => auth.token ? <Redirect to={`/profile/${auth.user._id}`} /> : <Login />} />
                <Route exact path="/register" render={() => auth.token ? <Redirect to={`/profile/${auth.user._id}`} /> : <Register />} />
                <Route exact path="/profile/:id" render={(props) => auth.token ? <Profile {...props} /> : <Redirect to="/login" />} />
                <Route exact path="/post/:id" component={Post} />
              </div>
          

              <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
