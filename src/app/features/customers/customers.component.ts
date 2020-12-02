import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CustomersDataSource } from './customers.data-source';
import { CustomerService } from '../../services/customer.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject, interval, Observable, BehaviorSubject, never } from 'rxjs';
import { CustomerDetailsModalService, ICustomerDetails } from './customer-details-modal/customer-details-modal.service';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit, OnDestroy {
  dataSource: CustomersDataSource;
  rowsToDisplay: number = 1;
  rowsToDisplayMax: number = 20;
  timer: Observable<number> = interval(10000);
  pauser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly unsubscribe$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private readonly customerService: CustomerService,
    private readonly csModalService: CustomerDetailsModalService
  ) {
    this.dataSource = new CustomersDataSource(this.customerService);
    this.dataSource.beforeLoaded$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.pauser.next(true);
      this.customerService.tableSpinner = true;
    });
    this.dataSource.afterLoaded$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.pauser.next(false);
      this.customerService.tableSpinner = false;
    });
    this.csModalService.closedModal$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.pauser.next(false));

    this.pauser.pipe(
      switchMap(value => value ? never() : this.timer),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => this.dataSource.refresh());
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  async onCustomer(c: ICustomerDetails): Promise<void> {
    this.csModalService.openDialog(c);
    this.pauser.next(true);
  }

  public onSliderChange(rowCount: number): void {
    this.dataSource.changeRows(rowCount);
  }
}
