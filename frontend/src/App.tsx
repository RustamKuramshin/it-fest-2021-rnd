/* eslint-disable max-classes-per-file */
import * as React from "react";

import { Menu, MenuItem } from "@blueprintjs/core";
import { IExampleProps } from "@blueprintjs/docs-theme";
import {
    Cell,
    Column,
    ColumnHeaderCell,
    CopyCellsMenuItem,
    IMenuContext,
    SelectionModes,
    Table2,
    Utils,
} from "@blueprintjs/table";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const books: any[] = require("./books.json");

type ICellLookup = (rowIndex: number, columnIndex: number) => any;
type ISortCallback = (columnIndex: number, comparator: (a: any, b: any) => number) => void;

interface ISortableColumn {
    getColumn(getCellData: ICellLookup, sortColumn: ISortCallback): JSX.Element;
}

abstract class AbstractSortableColumn implements ISortableColumn {
    constructor(protected name: string, protected index: number) { }

    public getColumn(getCellData: ICellLookup, sortColumn: ISortCallback) {
        const cellRenderer = (rowIndex: number, columnIndex: number) => (
            <Cell>{getCellData(rowIndex, columnIndex)}</Cell>
        );
        const menuRenderer = this.renderMenu.bind(this, sortColumn);
        const columnHeaderCellRenderer = () => <ColumnHeaderCell name={this.name} menuRenderer={menuRenderer} />;
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
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc" />
                <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc" />
            </Menu>
        );
    }

    private compare(a: any, b: any) {
        return a.toString().localeCompare(b);
    }
}

class TableSortableExample extends React.PureComponent<IExampleProps> {
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
        data: books,
        sortedIndexMap: [] as number[],
    };

    public render() {
        const numRows = this.state.data.length;
        const columns = this.state.columns.map(col => col.getColumn(this.getCellData, this.sortColumn));
        return (
            <div className="bp3-dark">
                <h1 className="bp3-heading">Books</h1>
                <blockquote className="bp3-blockquote">
                    The Java™ Programming Language is a general-purpose, concurrent,
                    strongly typed, class-based object-oriented language.
                    It is normally compiled to the bytecode instruction set and binary
                    format defined in the Java Virtual Machine Specification.
                    The Java™ Programming Language is a general-purpose, concurrent,
                    strongly typed, class-based object-oriented language.
                    It is normally compiled to the bytecode instruction set and binary
                    format defined in the Java Virtual Machine Specification.
                    The Java™ Programming Language is a general-purpose, concurrent,
                    strongly typed, class-based object-oriented language.
                    It is normally compiled to the bytecode instruction set and binary
                    format defined in the Java Virtual Machine Specification.
                </blockquote>
                <Table2
                    bodyContextMenuRenderer={this.renderBodyContextMenu}
                    numRows={numRows}
                    selectionModes={SelectionModes.COLUMNS_AND_CELLS}
                >
                    {columns}
                </Table2>
                <div className=".modifier">
                    More than a decade ago, we set out to create products that would transform
                    the way organizations use their data. Today, our products are deployed at
                    the most critical government, commercial, and non-profit institutions in
                    the world to solve problems we hadn’t even dreamed of back then.
                </div>
            </div>
        );
    }

    private getCellData = (rowIndex: number, columnIndex: number) => {
        const sortedRowIndex = this.state.sortedIndexMap[rowIndex];
        if (sortedRowIndex != null) {
            rowIndex = sortedRowIndex;
        }
        return this.state.data[rowIndex][columnIndex];
    };

    private renderBodyContextMenu = (context: IMenuContext) => {
        return (
            <Menu>
                <CopyCellsMenuItem context={context} getCellData={this.getCellData} text="Copy" />
            </Menu>
        );
    };

    private sortColumn = (columnIndex: number, comparator: (a: any, b: any) => number) => {
        const { data } = this.state;
        const sortedIndexMap = Utils.times(data.length, (i: number) => i);
        sortedIndexMap.sort((a: number, b: number) => {
            return comparator(data[a][columnIndex], data[b][columnIndex]);
        });
        this.setState({ sortedIndexMap });
    };
}

export default TableSortableExample;