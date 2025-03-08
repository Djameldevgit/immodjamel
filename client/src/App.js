import { useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
 
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts  } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
  
import Edicionusers from './pages/administration/users/edicionusers'
import { getUsers } from './redux/actions/userAction'
import UsersActionn from './pages/administration/users/UsersActionn'
import listadeusuariosbloqueadoss from './pages/administration/users/listadeusuariosbloqueadoss'
import { getBlockedUsers } from './redux/actions/userBlockAction'
import Paginabloqueos from './pages/paginabloqueos'
import Roles from './pages/administration/users/roles'
import Homepostspendientes from './pages/administration/homepostspendientes'
import { getPostsPendientes } from './redux/actions/postAproveAction'

function App() {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token, 'Vente'));
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
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

 
  


  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />





          <Route exact path="/register" component={Register} />
          <Route exact path="/administration/usersaction" component={auth.token ? UsersActionn : Login} />
          <Route exact path="/administration/usersedicion" component={auth.token ? Edicionusers : Login} />
          <Route exact path="/administration/listadeusuariosbloqueadoss" component={auth.token ? listadeusuariosbloqueadoss : Login} />
          <Route exact path="/paginabloqueos" component={auth.token ? Paginabloqueos : Login} />
          <Route exact path="/administration/roles" component={auth.token ? Roles : Login} />
          <Route exact path="/administracion/homepostspendientes" component={auth.token ? Homepostspendientes : Login} />
   






          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
          
        </div>
      </div>
    </Router>
  );
}

export default App;
