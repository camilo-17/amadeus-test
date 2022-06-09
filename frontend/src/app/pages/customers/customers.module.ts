import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
    declarations: [CustomersComponent],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        ComponentsModule,
        NgbPaginationModule,
        NgbModule,
        MaterialModule,
    ],
})
export class CustomersModule {}
