import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/domain/models/customers';

@Component({
    selector: 'app-customer-details-modal',
    templateUrl: './customer-details-modal.component.html',
    styleUrls: ['./customer-details-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerDetailsComponent implements OnInit {
    public title: string = 'Customer Details';
    public customerDetails: Customer;
    public imgUrl: string = '';
    constructor(public dialogRef: MatDialogRef<CustomerDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Customer) {
        this.customerDetails = data;
        this.imgUrl = null;
        this.imgUrl = this.customerDetails && this.customerDetails.imgUrl ? this.customerDetails.imgUrl : 'https://semantic-ui.com/images/wireframe/image.png';
    }
    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
