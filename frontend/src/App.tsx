import React from 'react';
import './App.css';
import { Cell, Column, Table2 } from "@blueprintjs/table";

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/table/lib/css/table.css';

const USD_TO_EURO_CONVERSION = 0.85;
const dollarCellRenderer = (rowIndex: number) => <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
const euroCellRenderer = (rowIndex: number) => (<Cell>{`€${(rowIndex * 10 * USD_TO_EURO_CONVERSION).toFixed(2)}`}</Cell>);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Table2 numRows={20}>
          <Column name="Dollars" cellRenderer={dollarCellRenderer} />
          <Column name="Euros" cellRenderer={euroCellRenderer} />
        </Table2>
      </header>
    </div>
  );
}

export default App;
