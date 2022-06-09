import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, User } from './table-datasource';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
    @Output() eventsTable = new EventEmitter();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<User>;
    dataSource: TableDataSource;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['name', 'lastname', 'country', 'whomeetus', 'birthday', 'actions'];

    constructor() {
        this.dataSource = new TableDataSource();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    setData(data: User[]) {
        this.dataSource.data = data;
    }

    updateRow(user: User) {
        this.eventsTable.emit({ action: 'update', user });
    }

    deleteRow(user: User) {
        this.eventsTable.emit({ action: 'delete', user });
    }
}
