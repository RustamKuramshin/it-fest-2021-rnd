/* eslint-disable max-classes-per-file */
import * as React from "react";
import logo from './logo.png';

import {Menu, MenuItem} from "@blueprintjs/core";
import {HotkeysProvider} from "@blueprintjs/core";
import {
    Column,
    ColumnHeaderCell,
    CopyCellsMenuItem, EditableCell2,
    IMenuContext,
    SelectionModes,
    Table2,
    Utils,
} from "@blueprintjs/table";
import {Icon} from "@blueprintjs/core";

// CSS
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/table/lib/css/table.css';
import './App.css';
import {createBook, getAllBooks} from "./BooksApiClient";
import {Book} from "./Book";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const books: any[] = require("./books.json");

type ICellLookup = (rowIndex: number, columnIndex: number) => any;
type ISortCallback = (columnIndex: number, comparator: (a: any, b: any) => number) => void;

interface ISortableColumn {
    getColumn(getCellData: ICellLookup, sortColumn: ISortCallback, books: Book[]): JSX.Element;
}

const handleCellConfirm = (rowIndex: number, columnIndex: number, books: Book[]) => {
    return () => {
        createBook(books[rowIndex]).then(b => console.log("Book created"))
    }
}

abstract class AbstractSortableColumn implements ISortableColumn {
    constructor(protected name: string, protected index: number) {
    }

    public getColumn(getCellData: ICellLookup, sortColumn: ISortCallback, books: Book[]) {
        const cellRenderer = (rowIndex: number, columnIndex: number) => {
            const cellVal = getCellData(rowIndex, columnIndex);
            let val = cellVal;
            if (typeof cellVal !== "undefined") {
                val = `${cellVal}`
            }
            return (<EditableCell2 value={val} onConfirm={handleCellConfirm(rowIndex, columnIndex, books)}/>)
        };
        const menuRenderer = this.renderMenu.bind(this, sortColumn);
        const columnHeaderCellRenderer = () => <ColumnHeaderCell name={this.name} menuRenderer={menuRenderer}/>;
        return (
            <Column
                cellRenderer={cellRenderer}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={this.index}
                name={this.name}
            />
        );
    }

    protected abstract renderMenu(sortColumn: ISortCallback): JSX.Element;
}

class TextSortableColumn extends AbstractSortableColumn {
    protected renderMenu(sortColumn: ISortCallback) {
        const sortAsc = () => sortColumn(this.index, (a, b) => this.compare(a, b));
        const sortDesc = () => sortColumn(this.index, (a, b) => this.compare(b, a));
        return (
            <Menu>
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc"/>
                <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc"/>
            </Menu>
        );
    }

    private compare(a: any, b: any) {
        return a.toString().localeCompare(b);
    }
}

export default class BooksTable extends React.PureComponent {
    public state = {
        columns: [
            new TextSortableColumn("Id", 0),
            new TextSortableColumn("Title", 0),
            new TextSortableColumn("Author", 0),
            new TextSortableColumn("Year of publishing", 0),
            new TextSortableColumn("Genre", 0),
            new TextSortableColumn("Pages", 0),
            new TextSortableColumn("Has epub version", 0)
        ] as ISortableColumn[],
        data: [],
        sortedIndexMap: [] as number[],
    };

    componentDidMount() {
        getAllBooks().then(books => {
            this.setState({data: books})
        })
    }

    public render() {

        const numRows = this.state.data.length;
        const columns = this.state.columns.map(col => col.getColumn(this.getCellData, this.sortColumn, this.state.data));

        return (
            <div className="App bp3-dark">

                <h1 className="bp3-heading">Programming Books</h1>

                <img src={logo} className="App-logo" alt="logo"/>

                <header className="App-header-text">

                    <div className=".modifier">
                        Java is a high-level, class-based, object-oriented programming language that is designed to have
                        as few implementation dependencies as possible. It is a general-purpose programming language
                        intended to let programmers write once, run anywhere (WORA), meaning that compiled Java code
                        can run on all platforms that support Java without the need for recompilation. Java
                        applications are typically compiled to bytecode that can run on any Java virtual machine (JVM)
                        regardless of the underlying computer architecture. The syntax of Java is similar to C and C++,
                        but has fewer low-level facilities than either of them. The Java runtime provides dynamic
                        capabilities (such as reflection and runtime code modification) that are typically not available
                        in traditional compiled languages. As of 2019, Java was one of the most popular programming
                        languages in use according to GitHub, particularly for client–server web applications,
                        with a reported 9 million developers.
                    </div>

                </header>

                <header className="App-header">

                    <HotkeysProvider>

                        <Table2
                            enableColumnReordering={true}
                            enableRowReordering={true}
                            bodyContextMenuRenderer={this.renderBodyContextMenu}
                            numRows={numRows}
                            selectionModes={SelectionModes.COLUMNS_AND_CELLS}
                        >
                            {columns}
                        </Table2>

                    </HotkeysProvider>

                    <div className={"App-buttons"}>

                        <Icon icon="add-to-artifact" size={30} onClick={this.handleAddBook} htmlTitle={"Add book"}
                              intent="primary"/>
                    </div>

                </header>

            </div>
        );
    }

    private handleAddBook = () => {

        const {data} = this.state;

        const newData = [...data, ...[["", "", "", "", "", "", ""]]]

        this.setState({data: newData})
    }

    private getCellData = (rowIndex: number, columnIndex: number) => {
        const fieldsMap = new Map();
        fieldsMap.set(0, "id");
        fieldsMap.set(1, "title");
        fieldsMap.set(2, "author");
        fieldsMap.set(3, "yearOfPublishing");
        fieldsMap.set(4, "genre");
        fieldsMap.set(5, "pages");
        fieldsMap.set(6, "hasEpubVersion");

        const sortedRowIndex = this.state.sortedIndexMap[rowIndex];
        if (sortedRowIndex != null) {
            rowIndex = sortedRowIndex;
        }

        return this.state.data[rowIndex][fieldsMap.get(columnIndex)];
    };

    private renderBodyContextMenu = (context: IMenuContext) => {
        return (
            <Menu>
                <CopyCellsMenuItem context={context} getCellData={this.getCellData} text="Copy"/>
            </Menu>
        );
    };

    private sortColumn = (columnIndex: number, comparator: (a: any, b: any) => number) => {
        const {data} = this.state;
        const sortedIndexMap = Utils.times(data.length, (i: number) => i);
        sortedIndexMap.sort((a: number, b: number) => {
            return comparator(data[a][columnIndex], data[b][columnIndex]);
        });
        this.setState({sortedIndexMap});
    };
}