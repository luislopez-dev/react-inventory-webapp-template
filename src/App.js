/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './home/homeComponent';
import Login from './login/loginComponent';
import Register from './register/registerComponent';
import Update from './update/updateComponent';
import Create from './create/createComponent';
import ProtectedRoute from './ProtectedRoute';
import NavbarComponent from "./Navbar/NavbarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>

     <NavbarComponent /> 

    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <ProtectedRoute exact path="/update/:id" component={Update} />

        <ProtectedRoute exact path="/create" component={Create} />
      
        <ProtectedRoute exact path="/home" component={Home} />

        <Redirect from="/" to="/home" />

      </Switch>
    </div>
  </Router>
  );
}

export default App;