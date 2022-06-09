import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/components/table/table-datasource';
import { TableComponent } from 'src/app/components/table/table.component';
import { UpsertCustomerComponent } from 'src/app/components/upsert-customer/upsert-customer.component';
import { BackendService } from 'src/app/services/backend.service';
import { CountryService } from 'src/app/services/country.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
    countries: any[] = [];

    @ViewChild(TableComponent) table!: TableComponent;

    constructor(
        private dialog: MatDialog,
        private utilsService: UtilsService,
        private countryService: CountryService,
        private backendService: BackendService
    ) {}

    async ngOnInit() {
        const promise: Promise<any> = this.countryService.getCountries().toPromise();
        const [result, error] = await this.utilsService.executePromise(promise);
        if (error) {
            return;
        }
        if (result !== undefined && result.length > 0) {
            const [countries] = result;
            this.countries = countries.map((e: any) => e.name);
        }

        this.getCustomers();
    }

    async getCustomers() {
        const promise: Promise<any> = this.backendService.getCustomers().toPromise();
        const [result, error] = await this.utilsService.executePromise(promise);
        if (error) {
            return;
        }
        if (result !== undefined && result.length > 0) {
            const [customers] = result;
            this.table.setData(customers);
        }
    }

    async saveCustomer(user: User) {
        const promise: Promise<any> = this.backendService.saveCustomer(user).toPromise();
        const [result, error] = await this.utilsService.executePromise(promise);
        if (error) {
            return;
        }
        this.getCustomers();
    }

    getEvents(event: any) {
        if (event?.action === 'delete') {
            Swal.fire({
                title: 'Are you sure?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Cancel`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.deleteCustomer(event.user);
                    Swal.fire('Deleted!', '', 'success');
                }
            });
        }

        if (event?.action === 'update') {
            const dialogRef = this.dialog.open(UpsertCustomerComponent, {
                data: { countries: this.countries, user: event.user },
            });

            dialogRef.afterClosed().subscribe((response: User) => {
                if (response) {
                    response.birthday = this.utilsService.modifyDateFormat(response.birthday);
                    this.updateCustomer(response);
                }
            });
        }
    }

    async updateCustomer(user: User) {
        const promise: Promise<any> = this.backendService.updateCustomer(user).toPromise();
        const [result, error] = await this.utilsService.executePromise(promise);
        if (error) {
            return;
        }
        this.getCustomers();
    }

    async deleteCustomer(user: User) {
        const { userId } = user;
        const promise: Promise<any> = this.backendService.deleteCustomer(userId).toPromise();
        const [result, error] = await this.utilsService.executePromise(promise);
        if (error) {
            return;
        }
        this.getCustomers();
    }

    createCustomer() {
        const dialogRef = this.dialog.open(UpsertCustomerComponent, {
            data: { countries: this.countries },
        });

        dialogRef.afterClosed().subscribe((response: User) => {
            if (response) {
                response.birthday = this.utilsService.modifyDateFormat(response.birthday);
                this.saveCustomer(response);
            }
        });
    }
}
