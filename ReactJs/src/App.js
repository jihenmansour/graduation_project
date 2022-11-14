
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Eventcalendar from "./pages/Eventcalendar";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Userprofile from "./pages/Userprofile";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Main>
          <Route exact path="/dashboard/:id&:name" component={Home} />
          <Route exact path="/tables/:id&:name" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/calendar/:id&:name" component={Eventcalendar} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/userprofile/:id" component={Userprofile} />
          <Route exact path="/">
            <Redirect to="/sign-up" />
          </Route>
        </Main>
      </Switch>
    </div>
  );
}

export default App;
