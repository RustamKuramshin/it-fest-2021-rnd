/* eslint-disable max-classes-per-file */
import * as React from "react"

import {HotkeysProvider, Icon, Menu, MenuItem} from "@blueprintjs/core"
import {
    Column,
    ColumnHeaderCell,
    CopyCellsMenuItem,
    EditableCell2,
    IMenuContext,
    SelectionModes,
    Table2,
    Utils,
} from "@blueprintjs/table"

// CSS
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/table/lib/css/table.css'
import './App.css'
import {createBook, getAllBooks} from "./BooksApiClient"
import {Book} from "./Book"

const getTableFieldsMap = (): Map<number, string> => {
    const tableFieldsMap = new Map()
    tableFieldsMap.set(0, "id")
    tableFieldsMap.set(1, "title")
    tableFieldsMap.set(2, "author")
    tableFieldsMap.set(3, "yearOfPublishing")
    tableFieldsMap.set(4, "genre")
    tableFieldsMap.set(5, "pages")
    tableFieldsMap.set(6, "hasEpubVersion")

    return tableFieldsMap
}

const getEmptyBook = (): Book => {
    return {
        id: undefined,
        title: "",
        author: "",
        yearOfPublishing: undefined,
        genre: "",
        pages: undefined,
        hasEpubVersion: undefined
    } as Book
}

const isEmptyField = (value: any) => {
    let res
    res = !value;
    return res
}

const compare = (a: any, b: any)  => {
    return a.toString().localeCompare(b)
}

export default class BooksTable extends React.PureComponent {

    public state = {
        columns: ["Id", "Title", "Author", "Year of publishing", "Genre", "Pages", "Has epub version"],
        data: [] as Book[],
        sortedIndexMap: [] as number[],
    }

    componentDidMount() {
        getAllBooks().then((books: Book[]) => {
            this.setState({data: books})
        }).catch(er => {
            console.error(er)
        })
    }

    public render() {

        console.log(`Render: books=${JSON.stringify(this.state.data)}`)

        const numRows = this.state.data.length
        const columns = this.state.columns.map(col => this.getColumn(col))

        return (
            <div className="App bp3-dark">

                <h1 className="bp3-heading">Programming Books</h1>

                {/*<img src={logo} className="App-logo" alt="logo"/>*/}

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
        )
    }

    private handleAddBook = () => {
        const {data} = this.state
        const newData = [...data, ...[getEmptyBook()]]
        this.setState({data: newData})
    }

    private handleDeleteBook = () => {
        console.log("DELETE ROW")
    }

    private getCellData = (rowIndex: number, columnIndex: number) => {
        const tableFieldsMap = getTableFieldsMap()
        const sortedRowIndex = this.state.sortedIndexMap[rowIndex]
        if (sortedRowIndex != null) {
            rowIndex = sortedRowIndex
        }

        let bookAsMap = new Map(Object.entries(this.state.data[rowIndex]))

        return bookAsMap.get(tableFieldsMap.get(columnIndex) as string)
    }

    private cellSetter = (rowIndex: number, columnIndex: number) => {
        return (value: any) => {
            console.log(`cellSetter: value=${JSON.stringify(value)}, columnIndex=${columnIndex}`)

            const {data} = this.state
            const newData = [...data]

            let isEmptyFlag = false

            if (isEmptyField(value)) {
                console.log("Field is EMPTY")
                isEmptyFlag = true
                value = undefined
            }

            switch (columnIndex) {
                case 0:
                    newData[rowIndex].id = value
                    break
                case 1:
                    newData[rowIndex].title = value
                    break
                case 2:
                    newData[rowIndex].author = value
                    break
                case 3:
                    newData[rowIndex].yearOfPublishing = value
                    break
                case 4:
                    newData[rowIndex].genre = value
                    break
                case 5:
                    newData[rowIndex].pages = value
                    break
                case 6:
                    newData[rowIndex].hasEpubVersion = value
                    break
            }

            if (isEmptyFlag) {
                this.setState({data: newData})
            } else {
                createBook(newData[rowIndex]).then((book: Book) => {
                    newData[rowIndex] = book
                    this.setState({data: newData})
                })
            }
        }
    }

    private renderBodyContextMenu = (context: IMenuContext) => {
        return (
            <Menu>
                <CopyCellsMenuItem context={context} getCellData={this.getCellData} text="Copy" />
                <MenuItem text={"Delete row"} onClick={this.handleDeleteBook} />
            </Menu>
        )
    }

    private sortColumn = (columnIndex: number, comparator: (a: any, b: any) => number) => {
        const {data} = this.state
        const sortedIndexMap = Utils.times(data.length, (i: number) => i)
        sortedIndexMap.sort((a: number, b: number) => {
            const tableFieldsMap = getTableFieldsMap()

            let bookAsMapA = new Map(Object.entries(data[a]))
            let bookAsMapB = new Map(Object.entries(data[b]))

            return comparator(bookAsMapA.get(tableFieldsMap.get(columnIndex) as string),
                bookAsMapB.get(tableFieldsMap.get(columnIndex) as string))
        })
        this.setState({sortedIndexMap})
    }

    private getColumn(column: string) {
        const cellRenderer = (rowIndex: number, columnIndex: number) => {
            const cellVal = this.getCellData(rowIndex, columnIndex)
            let val = cellVal
            if (typeof cellVal !== "undefined") {
                val = `${cellVal}`
            }
            return (<EditableCell2 value={val} onConfirm={this.cellSetter(rowIndex, columnIndex)} />)
        }
        const menuRenderer = this.renderMenu.bind(this, this.sortColumn)
        const columnHeaderCellRenderer = () => <ColumnHeaderCell name={column} menuRenderer={menuRenderer}/>
        return (
            <Column
                cellRenderer={cellRenderer}
                columnHeaderCellRenderer={columnHeaderCellRenderer}
                key={0}
                name={column}
            />
        )
    }

    private renderMenu() {
        const sortAsc = () => this.sortColumn(0, (a, b) => compare(a, b))
        const sortDesc = () => this.sortColumn(0, (a, b) => compare(b, a))

        return (
            <Menu>
                <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc"/>
                <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc"/>
            </Menu>
        )
    }
}