import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpsertCustomerComponent } from 'src/app/components/upsert-customer/upsert-customer.component';
import { CountryService } from 'src/app/services/country.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
    countries: any[] = [];

    constructor(
        private dialog: MatDialog,
        private utilsService: UtilsService,
        private countryService: CountryService
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
    }

    createCustomer() {
        const dialogRef = this.dialog.open(UpsertCustomerComponent, {
            data: { countries: this.countries },
        });

        dialogRef.afterClosed().subscribe((response) => {
            if (response) {
                console.log(response);
            }
        });
    }
}
