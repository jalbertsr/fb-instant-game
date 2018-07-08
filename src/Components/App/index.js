import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import Main from "../Main";
import UplaodList from "../Lists";
import Summary from "../Summary";
import Template from "../Template";
import TemplateList from "../TemplateList";



const App = () => (
  <MemoryRouter>
    <Switch>
      <Route exact path="/" component={Template} />
      <Route path="/lists" component={UplaodList} />
      <Route path="/summary" component={Summary} />
      <Route path="/template" component={Template} />
      <Route path="/template-list" component={TemplateList} />
    </Switch>
  </MemoryRouter>
);

export default App;
