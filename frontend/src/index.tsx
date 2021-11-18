// Namespaces
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import './index.css';

// App Class
import BooksTable from "./App";

ReactDOM.render(
    <React.StrictMode>
        <BooksTable id="books_table" />
    </React.StrictMode>,
    document.getElementById('root')
);