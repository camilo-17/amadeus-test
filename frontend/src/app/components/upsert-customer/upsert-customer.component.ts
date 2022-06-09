import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'app-upsert-customer',
    templateUrl: './upsert-customer.component.html',
    styleUrls: ['./upsert-customer.component.scss'],
})
export class UpsertCustomerComponent implements OnInit {
    minDate: Date;
    maxDate: Date;

    basicInformationForm = this._formBuilder.group({
        name: [
            '',
            [
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(3),
                Validators.pattern('^[a-zA-Z ]*$'),
            ],
        ],
        lastname: [
            '',
            [
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(3),
                Validators.pattern('^[a-zA-Z ]*$'),
            ],
        ],
        age: [
            '',
            [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(1),
                Validators.maxLength(2),
            ],
        ],
        gender: ['', Validators.required],
        country: ['', [Validators.required]],
        birthday: ['', Validators.required],
    });
    moreInformationForm = this._formBuilder.group({
        whomeetus: ['', Validators.required],
        reasonForTrip: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(10)]],
    });
    isLinear = false;

    options: string[] = [];
    filteredOptions: Observable<string[]> | undefined;

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<UpsertCustomerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.options = data.countries;
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 100, 0, 1);
        this.maxDate = new Date();
    }

    ngOnInit(): void {
        this.filteredOptions = this.basicInformationForm.controls['country'].valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) => option.toLowerCase().includes(filterValue));
    }

    saveForm() {
        if (this.moreInformationForm.invalid || this.basicInformationForm.invalid) {
            return;
        }
        const data = { ...this.moreInformationForm.value, ...this.basicInformationForm.value };
        this.dialogRef.close(data);
    }
}
