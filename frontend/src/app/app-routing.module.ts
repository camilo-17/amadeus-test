import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/customers/view',
                pathMatch: 'full',
            },
            {
                path: 'customers',
                loadChildren: () =>
                    import('./pages/customers/customers.module').then((m) => m.CustomersModule),
                data: { preload: true },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
