import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    basicInformationForm: FormGroup | any;
    moreInformationForm: FormGroup | any;

    isLinear = true;

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
        this.createForm();
    }

    ngOnInit(): void {
        this.filteredOptions = this.basicInformationForm.controls['country'].valueChanges.pipe(
            startWith(''),
            map((value: any) => this._filter(value || ''))
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

    createForm() {
        const birthday = this.data?.user?.birthday ? new Date(this.data.user.birthday) : null;
        this.basicInformationForm = this._formBuilder.group({
            name: [
                this.data?.user?.name || null,
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern('^[a-zA-Z ]*$'),
                ],
            ],
            lastname: [
                this.data?.user?.lastname || null,
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern('^[a-zA-Z ]*$'),
                ],
            ],
            age: [
                this.data?.user?.age || null,
                [
                    Validators.required,
                    Validators.pattern('^[0-9]*$'),
                    Validators.minLength(1),
                    Validators.maxLength(2),
                ],
            ],
            gender: [this.data?.user?.gender || null, Validators.required],
            country: [this.data?.user?.country || null, [Validators.required]],
            birthday: [birthday, Validators.required],
        });
        this.moreInformationForm = this._formBuilder.group({
            whomeetus: [this.data?.user?.whomeetus || null, Validators.required],
            reasonForTrip: [
                this.data?.user?.reasonForTrip || null,
                [Validators.required, Validators.maxLength(80), Validators.minLength(10)],
            ],
        });
    }
}
