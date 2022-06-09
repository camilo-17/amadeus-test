import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/customers/view',
        pathMatch: 'full',
    },
    {
        path: 'view',
        component: CustomersComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule {
    constructor() {}
}
