import React from 'react';
import './App.css';
import { Button } from "@blueprintjs/core";

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button intent="success" text="button content" />
      </header>
    </div>
  );
}

export default App;
