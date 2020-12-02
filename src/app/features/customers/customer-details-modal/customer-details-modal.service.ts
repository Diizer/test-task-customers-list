import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { CustomerDetailsComponent } from './customer-details-modal.component';

export interface ICustomerDetails {
    data: object;
}

@Injectable()
export class CustomerDetailsModalService {
    private readonly isClose: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    get closedModal$(): Observable<boolean> {
        return this.isClose.asObservable();
    }
    set closedModal(value: boolean) {
        this.isClose.next(value);
    }

    constructor(public dialog: MatDialog) {
    }

    openDialog(data: ICustomerDetails): void {
        const dialogRef = this.dialog.open(CustomerDetailsComponent, {
            width: '400px',
            data: data
        });

        dialogRef.afterClosed().subscribe(() => {
            this.closedModal = true;
        });
    }
}
