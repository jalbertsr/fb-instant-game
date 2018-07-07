import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import Main from "../Main";
import UplaodList from "../Lists";

const App = () => (
  <MemoryRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/lists" component={UplaodList} />
    </Switch>
  </MemoryRouter>
);

export default App;
