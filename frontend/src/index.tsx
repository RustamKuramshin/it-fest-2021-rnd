import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TableSortableExample from './App';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/table/lib/css/table.css';

ReactDOM.render(<TableSortableExample id="table" />, document.getElementById('root'));
