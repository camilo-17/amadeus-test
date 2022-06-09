import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UpsertCustomerComponent } from './upsert-customer/upsert-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [NavComponent, TableComponent, UpsertCustomerComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [NavComponent, TableComponent],
})
export class ComponentsModule {}
