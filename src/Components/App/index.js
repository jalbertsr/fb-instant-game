import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import Main from "../Main";
import UplaodList from "../Lists";
import Summary from "../Summary";

const App = () => (
  <MemoryRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/lists" component={UplaodList} />
      <Route path="/summary" component={Summary} />
    </Switch>
  </MemoryRouter>
);

export default App;
