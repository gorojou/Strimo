import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Invitacion from "../link/confirmar";
import Login from "../login_registro/index";
import Lobby from "../lobby/index";
import Pago from "../pago";
import Link from "../link";
import PreChat from "../chat";
import Chat from "../chat/chat.jsx";
import PrivateRoute from "./privateRoutes";
import Chats from "../chats";
import Explora from "../explora";
import Conciertos from "../conciertos";
import FotoPerfil from '../imagen_perfil'
import { AuthProvider } from "../context/authContext";
// import "./style.css";
function Index() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Lobby} />
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/pago/:id" component={Pago} />
          <PrivateRoute exact path="/invitacion/:id" component={Link} />
          <PrivateRoute exact path="/chats" component={Chats} />
          <PrivateRoute exact path="/confirmar/:id" children={<Invitacion />} />
          <PrivateRoute exact path="/chat" component={PreChat} />
          <PrivateRoute exact path="/foto-perfil" component={FotoPerfil} />
          <PrivateRoute exact path="/explora" component={Explora} />
          <PrivateRoute exact path="/conciertos" component={Conciertos} />
          <PrivateRoute exact path="/chat/:id" children={<Chat />} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default Index;
