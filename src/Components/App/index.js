import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import Main from "../Main";
import UploadList from "../Lists";
import Summary from "../Summary";
import Template from "../Template";
import TemplateList from "../TemplateList";

const App = () => (
  <MemoryRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/lists" component={UploadList} />
      <Route path="/summary" component={Summary} />
      <Route path="/template" component={Template} />
      <Route path="/template-list" component={TemplateList} />
    </Switch>
  </MemoryRouter>
);

export default App;
